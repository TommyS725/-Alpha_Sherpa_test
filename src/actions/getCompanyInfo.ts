// 'use server'

import { delay } from '@/utils/delay'
import company_info from '@/static_data/company_info.json'
import { companyInfoSchema } from '@/model/companyInfo'

export async  function getCompanyInfo(wait:number = 0) {
    // console.log('start fetching company info')
    await delay(wait)
    const data = company_info
    // console.log('company info fetched')
    return companyInfoSchema.parse(data)
}