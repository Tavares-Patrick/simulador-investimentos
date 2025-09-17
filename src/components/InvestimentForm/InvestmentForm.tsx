"use client";
import { useState } from "react";
import { TextField, Button, Switch, FormControlLabel } from "@mui/material";
import styles from "./InvestmentForm.module.css";

interface InvestmentFormProps {
  onCalculate: (data: InvestmentInput) => void;
}

export interface InvestmentInput {
  initialValue: number;
  monthlyContribution: number;
  interestRate: number; // em %
  interestRateType: "month" | "year";
  irRate?: number;
  duration: number; // meses ou anos
}

export default function InvestmentForm({ onCalculate }: InvestmentFormProps) {
  const [form, setForm] = useState<InvestmentInput>({
    initialValue: 1000,
    monthlyContribution: 100,
    interestRate: 1,
    interestRateType: "month",
    irRate: 0,
    duration: 12,
  });

  const handleChange = (field: keyof InvestmentInput, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label="Valor inicial"
        type="number"
        value={form.initialValue}
        onChange={(e) => handleChange("initialValue", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Aporte mensal"
        type="number"
        value={form.monthlyContribution}
        onChange={(e) => handleChange("monthlyContribution", parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Taxa de juros (%)"
        type="number"
        value={form.interestRate}
        onChange={(e) => handleChange("interestRate", parseFloat(e.target.value))}
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
      <TextField
        label="IR (%)"
        type="number"
        value={form.irRate}
        onChange={(e) => handleChange("irRate", parseFloat(e.target.value))}
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
        label="Juros ao ano"
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Calcular
      </Button>
    </form>
  );
}
