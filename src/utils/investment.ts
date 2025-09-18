export interface InvestmentResult {
  month: number;
  totalInvested: number;
  totalAccumulated: number;
}

export function calculateInvestment(data: {
  valorInicial: number;
  aporteMensal: number;
  taxaJuros: number;
  ir: boolean;
  tempo: number;
}): InvestmentResult[] {
  const results: InvestmentResult[] = [];
  const rate = data.taxaJuros / 100; // assume ao mês

  let total = data.valorInicial;
  let invested = data.valorInicial;

  for (let i = 1; i <= data.tempo; i++) {
    total = total * (1 + rate) + data.aporteMensal;
    invested += data.aporteMensal;

    let finalTotal = total;
    if (data.ir) {
      const lucro = total - invested;
      finalTotal = invested + lucro * 0.85; // supondo 15% IR
    }

    results.push({
      month: i,
      totalInvested: invested,
      totalAccumulated: finalTotal,
    });
  }

  return results;
}
