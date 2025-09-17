"use client";
import { InvestmentResult } from "@/utils/investment";
import { Button } from "@mui/material";
import htmlToImage from "html-to-image";
import styles from "./ResultCard.module.css";

interface ResultCardProps {
  data: InvestmentResult[];
}

export default function ResultCard({ data }: ResultCardProps) {
  const last = data[data.length - 1];

  const handleShare = () => {
    const node = document.getElementById("result-card");
    if (node) {
      htmlToImage.toPng(node).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "simulacao.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <div id="result-card" className={styles.card}>
      <h2>Resultado da Simulação</h2>
      <p>Total Investido: R$ {last.totalInvested.toFixed(2)}</p>
      <p>Total Acumulado: R$ {last.totalAccumulated.toFixed(2)}</p>
      <p>Ganho com Juros: R$ {(last.totalAccumulated - last.totalInvested).toFixed(2)}</p>
      <Button variant="contained" color="primary" onClick={handleShare}>
        Compartilhar simulação
      </Button>
    </div>
  );
}
