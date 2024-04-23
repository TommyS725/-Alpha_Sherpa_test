import { newsDataSchema } from '@/model/news'
import news_data from '@/static_data/news_data.json'
import { delay } from '@/utils/delay'

export async function getNewsData(wait: number = 0) {
  // const start = new Date().getTime()
  // console.log('start fetching news data',wait)
  await delay(wait)
  const data = news_data
  // const end = new Date().getTime()
  // console.log(`News data fetched in ${end - start} ms`)
  return newsDataSchema.parse(data)
}