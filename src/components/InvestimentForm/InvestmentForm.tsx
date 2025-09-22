"use client";

import { useState } from "react";
import { TextField, Button, Switch, FormControlLabel, MenuItem } from "@mui/material";
import styles from "./InvestmentForm.module.css";

interface InvestmentFormProps {
  onCalculate: (data: InvestmentInput) => void;
}

export interface InvestmentInput {
  initialValue: number;
  monthlyContribution: number;
  duration: number;
  interestSource: "manual" | "CDI" | "SELIC";
  interestRate: number;       // valor informado manualmente
  interestRateType: "month" | "year";
  indexerPercent?: number;    // percentual sobre CDI ou SELIC
  investmentType: "CDB" | "LCI" | "LCA" | "Tesouro" | "Outro";
  investmentRate?: number;    // rendimento anual do produto
  applyIR: boolean;
  irRate?: number;            // alíquota de IR
}

export default function InvestmentForm({ onCalculate }: InvestmentFormProps) {
  const [form, setForm] = useState<InvestmentInput>({
    initialValue: 1000,
    monthlyContribution: 100,
    duration: 12,
    interestSource: "manual",
    interestRate: 0,
    interestRateType: "year",
    indexerPercent: 100,
    investmentType: "CDB",
    investmentRate: 0,
    applyIR: false,
    irRate: 0,
  });

  const handleChange = (field: keyof InvestmentInput, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Valor inicial */}
      <TextField
        label="Valor Inicial (R$)"
        type="number"
        value={form.initialValue}
        onChange={(e) => handleChange("initialValue", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Aporte mensal */}
      <TextField
        label="Aporte Mensal (R$)"
        type="number"
        value={form.monthlyContribution}
        onChange={(e) => handleChange("monthlyContribution", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Tempo */}
      <TextField
        label="Tempo (meses ou anos)"
        type="number"
        value={form.duration}
        onChange={(e) => handleChange("duration", parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Fonte de juros */}
      <TextField
        select
        label="Fonte da taxa de juros"
        value={form.interestSource}
        onChange={(e) => handleChange("interestSource", e.target.value as "manual" | "CDI" | "SELIC")}
        fullWidth
        margin="normal"
      >
        <MenuItem value="manual">Manual</MenuItem>
        <MenuItem value="CDI">CDI</MenuItem>
        <MenuItem value="SELIC">SELIC</MenuItem>
      </TextField>

      {/* Taxa manual */}
{form.interestSource === "manual" && (
  <>
    <TextField
      label="Informe a taxa (%)"
      type="number"
      value={form.interestRate}
      onChange={(e) => handleChange("interestRate", parseFloat(e.target.value))}
      fullWidth
      margin="normal"
    />

    <FormControlLabel
      control={
        <Switch
          checked={form.interestRateType === "year"}
          onChange={(e) =>
            handleChange("interestRateType", e.target.checked ? "year" : "month")
          }
        />
      }
      label="Taxa ao ano"
    />
  </>
)}

{/* Percentual sobre CDI/SELIC */}
{(form.interestSource === "CDI" || form.interestSource === "SELIC") && (
  <>
    <TextField
      label={`Percentual sobre ${form.interestSource} (%)`}
      type="number"
      value={form.indexerPercent}
      onChange={(e) => handleChange("indexerPercent", parseFloat(e.target.value))}
      fullWidth
      margin="normal"
    />

    {/* Sempre forçar ano */}
    <p style={{ color: "#ccc", fontSize: "0.9rem" }}>
      Obs: {form.interestSource} é sempre considerado ao ano.
    </p>
  </>
)}


      {/* Percentual sobre CDI/SELIC */}
      {(form.interestSource === "CDI" || form.interestSource === "SELIC") && (
        <TextField
          label={`Percentual sobre ${form.interestSource} (%)`}
          type="number"
          value={form.indexerPercent}
          onChange={(e) => handleChange("indexerPercent", parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
      )}

      {/* Tipo de investimento */}
      <TextField
        select
        label="Tipo de investimento"
        value={form.investmentType}
        onChange={(e) => handleChange("investmentType", e.target.value as InvestmentInput["investmentType"])}
        fullWidth
        margin="normal"
      >
        <MenuItem value="CDB">CDB</MenuItem>
        <MenuItem value="LCI">LCI</MenuItem>
        <MenuItem value="LCA">LCA</MenuItem>
        <MenuItem value="Tesouro">Tesouro</MenuItem>
        <MenuItem value="Outro">Outro</MenuItem>
      </TextField>

      {/* Rendimento anual do produto */}
      <TextField
        label="Rendimento anual do produto (%)"
        type="number"
        value={form.investmentRate}
        onChange={(e) => handleChange("investmentRate", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Imposto de Renda */}
      <FormControlLabel
        control={
          <Switch
            checked={form.applyIR}
            onChange={(e) => handleChange("applyIR", e.target.checked)}
          />
        }
        label="Aplicar Imposto de Renda sobre lucro"
      />

      {/* Campo de alíquota de IR */}
      {form.applyIR && (
        <TextField
          label="Alíquota de IR (%)"
          type="number"
          value={form.irRate}
          onChange={(e) => handleChange("irRate", parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
      )}

      <Button variant="contained" color="primary" type="submit" fullWidth>
        Calcular
      </Button>
    </form>
  );
}
