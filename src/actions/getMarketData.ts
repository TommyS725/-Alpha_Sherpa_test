import market_data from '@/static_data/market_data.json'
import { delay } from '@/utils/delay'

export async function getMarketData(wait: number = 0) {
  await delay(wait)
  return market_data
}