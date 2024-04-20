import { delay } from '@/utils/delay'
import commpany_info from '@/static_data/company_info.json'

export async  function getCompanyInfo(wait:number = 0) {
    await delay(wait)
    return commpany_info
}