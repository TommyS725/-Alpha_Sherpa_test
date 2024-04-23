import { marketDataSchema } from '@/model/marketData'
import market_data from '@/static_data/market_data.json'
import { delay } from '@/utils/delay'

export async function getMarketData(wait: number = 0) {
  // const start   = new Date().getTime()
  // console.log('start fetching market data',wait)
  await delay(wait)
  const data = market_data
  // console.log('Market data fetched')
  // console.log('Market data fetched in',new Date().getTime()-start)
  return marketDataSchema.parse(data)
}