export interface InvestmentResult {
  month: number;
  totalInvested: number;
  totalAccumulated: number;
}

interface InvestmentData {
  valorInicial: number;
  aporteMensal: number;
  tempo: number;
  indexador: "CDI" | "SELIC" | "TAXA";
  percentual?: number;   // ex: 115 (% sobre CDI ou SELIC)
  taxaFixa?: number;     // se indexador = TAXA
  ir: boolean;
}

// valores atuais (poderia vir de API depois)
const CDI_ANUAL = 13.65;   // exemplo %
const SELIC_ANUAL = 13.75; // exemplo %

export function calculateInvestment(data: InvestmentData): InvestmentResult[] {
  const results: InvestmentResult[] = [];

  // define taxa anual base
  let annualRate = 0;
  if (data.indexador === "CDI") {
    annualRate = CDI_ANUAL * ((data.percentual ?? 100) / 100);
  } else if (data.indexador === "SELIC") {
    annualRate = SELIC_ANUAL * ((data.percentual ?? 100) / 100);
  } else {
    annualRate = data.taxaFixa ?? 0;
  }

  // converte taxa anual -> mensal
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

  let total = data.valorInicial;
  let invested = data.valorInicial;

  for (let i = 1; i <= data.tempo; i++) {
    total = total * (1 + monthlyRate) + data.aporteMensal;
    invested += data.aporteMensal;

    let finalTotal = total;
    if (data.ir) {
      const lucro = total - invested;
      finalTotal = invested + lucro * 0.85; // IR fixo 15% (pode mudar depois)
    }

    results.push({
      month: i,
      totalInvested: invested,
      totalAccumulated: finalTotal,
    });
  }

  return results;
}
