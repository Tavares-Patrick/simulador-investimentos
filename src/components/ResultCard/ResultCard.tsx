"use client";
import { InvestmentResult } from "@/utils/investment";
import { Button } from "@mui/material";
import * as htmlToImage from "html-to-image";
import styles from "./ResultCard.module.css";

interface Props {
  data: InvestmentResult[];
}

export default function ResultCard({ data }: Props) {
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
      <h3>Resultado</h3>
      <p>Total Investido: R$ {last.totalInvested.toFixed(2)}</p>
      <p>Total Acumulado: R$ {last.totalAccumulated.toFixed(2)}</p>
      <p>Ganho com Juros: R$ {(last.totalAccumulated - last.totalInvested).toFixed(2)}</p>
      <Button variant="contained" color="secondary" onClick={handleShare}>
        Compartilhar simulação
      </Button>
    </div>
  );
}
