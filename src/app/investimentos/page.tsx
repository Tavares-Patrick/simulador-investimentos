"use client";
import { useState } from "react";
import InvestmentForm from "@/components/Form/Form";
import ResultCard from "@/components/ResultCard/ResultCard";
import InvestmentChart from "@/components/Chart/InvestmentChart";
import { calculateInvestment, InvestmentResult } from "@/utils/investment";
import styles from "./Investimentos.module.css";
import Button from "@/components/Button/Button";

export default function InvestimentosPage() {
  const [results, setResults] = useState<InvestmentResult[]>([]);

  const handleCalculate = (data: any) => {
    const res = calculateInvestment(data);
    setResults(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.button}>
        <Button label="Voltar" variant="submit" href="/" />
        <Button label="Sobre" variant="submit" href="/about" />
        </div>
        <InvestmentForm onSubmit={handleCalculate} />
        {results.length > 0 && (
          <>
            <ResultCard data={results} />
            <InvestmentChart data={results} />
          </>
        )}
      </div>
    </div>
  );
}
