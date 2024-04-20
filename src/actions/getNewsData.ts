import news_data from '@/static_data/news_data.json'
import { delay } from '@/utils/delay'

export async function getNewsData(wait: number = 0) {
  await delay(wait)
  return news_data
}