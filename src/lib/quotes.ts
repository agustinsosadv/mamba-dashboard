import quotes from '../../public/kobe-quotes.json'

export function getDailyQuote(date: Date = new Date()): string {
  // Deterministic: same date always gives same quote
  const seed =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const index = seed % quotes.length
  return quotes[index]
}

export function getAllQuotes(): string[] {
  return quotes
}
