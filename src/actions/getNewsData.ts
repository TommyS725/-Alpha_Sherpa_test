// 'use server'

import { newsDataSchema } from '@/model/news'
import news_data from '@/static_data/news_data.json'
import { delay } from '@/utils/delay'

export async function getNewsData(wait: number = 0) {
  // console.log('start fetching news data')
  await delay(wait)
  const data = news_data
  return newsDataSchema.parse(data)
}