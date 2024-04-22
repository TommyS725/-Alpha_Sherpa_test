import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { dateLike2ChartTime } from "@/lib/dateLike2ChartTime"
import { round2decimalPts } from "@/lib/round2decimalPts"
import { CompanyInfo } from "@/model/companyInfo"
import { LoaderCircle } from "lucide-react"
import { Badge } from "./ui/badge"


type Props = {
    isFetching?: boolean
    data?: CompanyInfo
}


const Pair = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-wrap space-x-8">
            <p className="text-gray-600 dark:text-gray-400">{label}</p>
            <p>{value}</p>
        </div>
    )
}

const GICS = ({ level, value }: { level: number, value: string }) => {
    return (
        <Badge variant='secondary'>
            <div className="flex flex-wrap space-x-3 text-sm p-1">
                <p className="text-gray-400">Level {level}</p>
                <p className=" font-bold">{value}</p>
            </div>
        </Badge>
    )
}

const CompanyCard: React.FC<Props> = ({ data, isFetching }) => {
    if (isFetching) {
        return <div className=" w-full flex justify-center items-center">
            <LoaderCircle className="animate-spin size-[10vh]" />
        </div>
    }

    if (!data) return null

    const { company_name, BBY, RIC, currency, datetime,
        figi, gics1, gics2, gics3,
        gics4, isin, market_cap_usd, sedol1 } = data.data

    return (
        <Card>
            <CardHeader>
                <CardTitle>{company_name}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className=" grid grid-cols-2 gap-x-2 gap-y-6 w-full text-lg font-medium ">

                <Pair label="ISIN" value={isin} />
                <Pair label="FIGI" value={figi} />
                <Pair label="Reuters Instrument Code (RIC) " value={RIC} />
                <Pair label="Bloomberg Symbol (BBY) " value={BBY} />
                <Pair label="Market Cap (USD)" value={round2decimalPts(market_cap_usd / 1e6, 3) + 'M'} />

                <div className=" col-span-2" >
                    <Pair label="Global Industry Classification Standard (GICS):" value="" />
                    <div className=" flex flex-wrap space-x-4 mt-4">
                        <GICS level={1} value={gics1} />
                        <GICS level={2} value={gics2} />
                        <GICS level={3} value={gics3} />
                        <GICS level={4} value={gics4} />

                    </div>

                </div>
            </CardContent>
            <CardFooter className=" grid grid-cols-2 gap-2 w-full text-lg font-medium ">
                <Pair label="Currency" value={currency} />
                <Pair label="Founded" value={dateLike2ChartTime(datetime).toString()} />
                <Pair label="Stock Exchange Daily Official List Number (SEDOL)" value={sedol1} />

            </CardFooter>
        </Card>

    )
}

export default CompanyCard