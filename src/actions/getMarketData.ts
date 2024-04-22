// 'use server'
import { marketDataSchema } from '@/model/marketData'
import market_data from '@/static_data/market_data.json'
import { delay } from '@/utils/delay'

export async function getMarketData(wait: number = 0) {
  // console.log('start fetching market data')
  await delay(wait)
  const data = market_data
  // console.log('Market data fetched')
  return marketDataSchema.parse(data)
}