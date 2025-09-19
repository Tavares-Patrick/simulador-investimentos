"use client";

import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import styles from "./Form.module.css";

interface FormData {
  valorInicial: number;
  aporteMensal: number;
  tempo: number;
  taxaJuros: number;     // taxa fixa ou valor de percentual do indexador
  tipo: string;
  ir: boolean;
  aliquotaIR?: number;   // só aparece se ir === true
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
    aliquotaIR: 15,
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
        name === "taxaJuros" ||
        name === "aliquotaIR"
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

      {/* Valor Inicial */}
      <TextField
        label="Valor Inicial (R$)"
        name="valorInicial"
        type="number"
        value={formData.valorInicial}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Aporte Mensal */}
      <TextField
        label="Aporte Mensal (R$)"
        name="aporteMensal"
        type="number"
        value={formData.aporteMensal}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Tempo */}
      <TextField
        label="Tempo (meses)"
        name="tempo"
        type="number"
        value={formData.tempo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Indexador */}
      <TextField
        select
        label="Indexador"
        name="indexador"
        value={formData.indexador}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="CDI">CDI</MenuItem>
        <MenuItem value="SELIC">SELIC</MenuItem>
        <MenuItem value="TAXA">Taxa Fixa</MenuItem>
      </TextField>

      {/* Campo da taxa depende do indexador escolhido */}
      {formData.indexador === "TAXA" && (
        <TextField
          label="Taxa de Juros (% ao ano)"
          name="taxaJuros"
          type="number"
          value={formData.taxaJuros}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}

      {(formData.indexador === "CDI" || formData.indexador === "SELIC") && (
        <TextField
          label={`Percentual sobre ${formData.indexador} (%)`}
          name="taxaJuros"
          type="number"
          value={formData.taxaJuros}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}

      {/* Tipo do Investimento */}
      <TextField
        select
        label="Tipo do Investimento"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="CDB">CDB</MenuItem>
        <MenuItem value="LCI">LCI</MenuItem>
        <MenuItem value="LCA">LCA</MenuItem>
        <MenuItem value="CRI">CRI</MenuItem>
        <MenuItem value="CRA">CRA</MenuItem>
      </TextField>

      {/* Rentabilidade (pré ou pós) */}
      <TextField
        select
        label="Rentabilidade"
        name="prefixo"
        value={formData.prefixo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="pré">Pré-fixado</MenuItem>
        <MenuItem value="pós">Pós-fixado</MenuItem>
      </TextField>

      {/* Imposto de Renda */}
      <TextField
        select
        label="Imposto de Renda"
        name="ir"
        value={formData.ir ? "sim" : "não"}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            ir: e.target.value === "não",
          }))
        }
        fullWidth
        margin="normal"
      >
        <MenuItem value="sim">Sim</MenuItem>
        <MenuItem value="não">Não</MenuItem>
      </TextField>

      {/* Campo da alíquota do IR aparece só se IR = true */}
      {formData.ir && (
        <TextField
          label="Alíquota de IR (%)"
          name="aliquotaIR"
          type="number"
          value={formData.aliquotaIR}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}

      <Button type="submit" className={styles.submitButton}>
        Simular
      </Button>
    </Box>
  );
};

export default InvestmentForm;
