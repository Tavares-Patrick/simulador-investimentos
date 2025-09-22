"use client";
import { InvestmentResult } from "@/utils/investment";
import { Button } from "@mui/material";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";
import styles from "./ResultCard.module.css";

interface Props {
  data: InvestmentResult[];
}

export default function ResultCard({ data }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const last = data[data.length - 1];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleShare = async () => {
    if (cardRef.current) {
      const dataUrl = await htmlToImage.toPng(cardRef.current);
      const link = document.createElement("a");
      link.download = "simulacao.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div ref={cardRef} className={styles.card}>
      <h3 className={styles.title}>Resultado da Simulação</h3>

      <div className={styles.resultRow}>
        <span>Total Investido:</span>
        <strong>{formatCurrency(last.totalInvested)}</strong>
      </div>

      <div className={styles.resultRow}>
        <span>Valor Bruto (sem IR):</span>
        <strong>{formatCurrency(last.grossTotal)}</strong>
      </div>

      <div className={styles.resultRow}>
        <span>Valor Líquido (após IR):</span>
        <strong>{formatCurrency(last.totalAccumulated)}</strong>
      </div>

      <div className={styles.resultRow}>
        <span>Ganho com Juros:</span>
        <strong>{formatCurrency(last.totalAccumulated - last.totalInvested)}</strong>
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleShare}
        className={styles.shareButton}
      >
        Compartilhar simulação
      </Button>
    </div>
  );
}
