import { delay } from '@/utils/delay'
import company_info from '@/static_data/company_info.json'
import { companyInfoSchema } from '@/model/companyInfo'

export async  function getCompanyInfo(wait:number = 0) {
    // const start = new Date().getTime()
    // console.log('start fetching company info',wait)
    await delay(wait)
    const data = company_info
    // console.log('company info fetched')
    // console.log('company info fetched in',new Date().getTime()-start)
    return companyInfoSchema.parse(data)
}