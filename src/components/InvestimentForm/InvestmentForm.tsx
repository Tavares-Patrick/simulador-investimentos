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
    interestRateType: "month",
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
      <h2 className={styles.title}>Simulador de Investimentos</h2>

      <TextField
        label="Valor Inicial (R$)"
        type="number"
        value={form.initialValue}
        onChange={(e) => handleChange("initialValue", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Aporte Mensal (R$)"
        type="number"
        value={form.monthlyContribution}
        onChange={(e) => handleChange("monthlyContribution", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

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
        onChange={(e) => handleChange("interestSource", e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="manual">Manual</MenuItem>
        <MenuItem value="CDI">CDI</MenuItem>
        <MenuItem value="SELIC">SELIC</MenuItem>
      </TextField>

      {/* Sempre pedir o valor da taxa */}
      <TextField
        label={`Informe a taxa (${form.interestSource}) % ao ano`}
        type="number"
        value={form.interestRate}
        onChange={(e) => handleChange("interestRate", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />

      {/* Switch de juros mensal/anual */}
      <FormControlLabel
        control={
          <Switch
            checked={form.interestRateType === "year"}
            onChange={(e) =>
              handleChange("interestRateType", e.target.checked ? "year" : "month")
            }
          />
        }
        label="Juros ao ano"
      />

      {/* Switch de IR */}
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
