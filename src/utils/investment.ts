// utils/investment.ts

export interface InvestmentResult {
  month: number;
  totalInvested: number;      // soma dos aportes + valor inicial
  grossTotal: number;         // valor bruto sem IR
  taxPaid: number;            // IR pago no mês
  accumulatedTax: number;     // IR acumulado até o mês
  totalAccumulated: number;   // valor líquido após IR
}

export interface InvestmentData {
  valorInicial: number;
  aporteMensal: number;
  tempo: number;                      // em meses
  indexador: "CDI" | "SELIC" | "TAXA";
  percentual?: number;   // ex: 115 (% sobre CDI ou SELIC)
  taxaFixa?: number;     // se indexador = TAXA (em % ao ano)
  ir: boolean;           // aplicar IR?
  irRate?: number;       // alíquota manual em % (ex: 15 para 15%)
}

// valores base (fixos por enquanto — podem vir de API no futuro)
const CDI_ANUAL = 13.65;   // %
const SELIC_ANUAL = 13.75; // %

export function calculateInvestment(data: InvestmentData): InvestmentResult[] {
  const results: InvestmentResult[] = [];

  // 1) Taxa anual base
  let annualRate = 0;
  if (data.indexador === "CDI") {
    annualRate = CDI_ANUAL * ((data.percentual ?? 100) / 100);
  } else if (data.indexador === "SELIC") {
    annualRate = SELIC_ANUAL * ((data.percentual ?? 100) / 100);
  } else {
    annualRate = data.taxaFixa ?? 0;
  }

  // 2) Converte taxa anual (%) → mensal (decimal)
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

  // 3) IR (decimal) — se não informado, assume 0
  const irRateDecimal = data.ir ? (data.irRate ?? 0) / 100 : 0;

  let total = data.valorInicial;
  let invested = data.valorInicial;
  let accumulatedTax = 0; // controle do IR total pago até o mês

  for (let i = 1; i <= data.tempo; i++) {
    // aplica rendimento mensal e depois aporte
    total = total * (1 + monthlyRate) + data.aporteMensal;
    invested += data.aporteMensal;

    // lucro bruto até o mês atual
    const lucroBruto = total - invested;

    if (data.ir && lucroBruto > 0) {
      const valorIR = lucroBruto * irRateDecimal; // imposto referente ao lucro
      accumulatedTax += valorIR; // acumula imposto pago
      const lucroLiquido = lucroBruto - valorIR;
      const finalTotal = invested + lucroLiquido;

      results.push({
        month: i,
        totalInvested: invested,
        grossTotal: total,
        taxPaid: valorIR,
        accumulatedTax: accumulatedTax,
        totalAccumulated: finalTotal,
      });
    } else {
      results.push({
        month: i,
        totalInvested: invested,
        grossTotal: total,
        taxPaid: 0,
        accumulatedTax: accumulatedTax,
        totalAccumulated: total,
      });
    }
  }

  return results;
}
