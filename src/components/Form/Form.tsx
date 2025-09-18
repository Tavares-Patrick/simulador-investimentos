"use client";

import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import styles from "./Form.module.css";

interface FormData {
  valorInicial: number;
  aporteMensal: number;
  tempo: number;
  taxaJuros: number;
  tipo: string;
  ir: boolean;
  indexador: string;
  prefixo: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const InvestmentForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    valorInicial: 0,
    aporteMensal: 0,
    tempo: 12,
    taxaJuros: 0,
    tipo: "CDB",
    ir: true,
    indexador: "CDI",
    prefixo: "pós",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "valorInicial" ||
        name === "aporteMensal" ||
        name === "tempo" ||
        name === "taxaJuros"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.formWrapper}>
      <h2 className={styles.title}>Simulador de Investimentos</h2>

      <TextField
        label="Valor Inicial (R$)"
        name="valorInicial"
        type="number"
        value={formData.valorInicial}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        InputProps={{ className: styles.inputField }}
      />

      <TextField
        label="Aporte Mensal (R$)"
        name="aporteMensal"
        type="number"
        value={formData.aporteMensal}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        InputProps={{ className: styles.inputField }}
      />

      <TextField
        label="Tempo (meses)"
        name="tempo"
        type="number"
        value={formData.tempo}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        InputProps={{ className: styles.inputField }}
      />

      <TextField
        select
        label="Indexador"
        name="indexador"
        value={formData.indexador}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        SelectProps={{ className: styles.inputField }}
      >
        <MenuItem value="CDI">CDI</MenuItem>
        <MenuItem value="SELIC">SELIC</MenuItem>
        <MenuItem value="TAXA">Taxa Fixa</MenuItem>
      </TextField>

      {formData.indexador === "TAXA" && (
        <TextField
          label="Taxa de Juros (% ao ano)"
          name="taxaJuros"
          type="number"
          value={formData.taxaJuros}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ className: styles.inputLabel }}
          InputProps={{ className: styles.inputField }}
        />
      )}

      <TextField
        select
        label="Tipo do Investimento"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        SelectProps={{ className: styles.inputField }}
      >
        <MenuItem value="CDB">CDB</MenuItem>
        <MenuItem value="LCI">LCI</MenuItem>
        <MenuItem value="LCA">LCA</MenuItem>
        <MenuItem value="CRI">CRI</MenuItem>
        <MenuItem value="CRA">CRA</MenuItem>
      </TextField>

      <TextField
        select
        label="Rentabilidade"
        name="prefixo"
        value={formData.prefixo}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        SelectProps={{ className: styles.inputField }}
      >
        <MenuItem value="pré">Pré-fixado</MenuItem>
        <MenuItem value="pós">Pós-fixado</MenuItem>
      </TextField>

      <TextField
        select
        label="Imposto de Renda"
        name="ir"
        value={formData.ir ? "sim" : "não"}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            ir: e.target.value === "sim",
          }))
        }
        fullWidth
        InputLabelProps={{ className: styles.inputLabel }}
        SelectProps={{ className: styles.inputField }}
      >
        <MenuItem value="sim">Sim</MenuItem>
        <MenuItem value="não">Não</MenuItem>
      </TextField>

      <Button type="submit" className={styles.submitButton}>
        Simular
      </Button>
    </Box>
  );
};

export default InvestmentForm;
