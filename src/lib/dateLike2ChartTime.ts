import { Time } from "lightweight-charts";


export function dateLike2ChartTime(dateLike: Date | string | number):Time{
    const date = new Date(dateLike)
    const formattedTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return formattedTime
}