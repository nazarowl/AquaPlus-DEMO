export function fmt(n: number): string {
  const str = n.toLocaleString('fr-CA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return str.replace(/\u00a0/g, ' ') + ' $';
}

export function fmtDec(n: number): string {
  const str = n.toLocaleString('fr-CA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return str.replace(/\u00a0/g, ' ') + ' $';
}

export function calcTPS(subtotal: number): number {
  return Math.round(subtotal * 0.05 * 100) / 100;
}

export function calcTVQ(subtotal: number): number {
  return Math.round(subtotal * 0.09975 * 100) / 100;
}

export function generateOrderNumber(): string {
  return '#AQ-2026-' + String(Math.floor(1000 + Math.random() * 9000));
}

export function generateResNumber(): string {
  return '#AQ-RES-2026-' + String(Math.floor(1000 + Math.random() * 9000));
}
