import { CandleStickData } from "@/model/candleData";
import { Badge } from "../ui/badge";
import { round2decimalPts } from "@/lib/round2decimalPts";


type Props = {
    companyName?: string
    data:CandleStickData | null
    metadata:{
        ric:string
        fx_rate:number
    }|null
}


const PriceIndicator: React.FC<{
    title: string
    price: number|string
    isRed: boolean
}> = ({ title, price, isRed }) => {
    return (
        <Badge variant='outline'
            className=" backdrop-blur-sm bg-opacity-10 bg-neutral-200 border-2 space-x-2 font-medium items-center"
        >
            {title.length>0 && <span > {title} :</span>}
            <span className={`${isRed ? "text-red-600" : "text-green-500"}`}>
                {price}
            </span>
        </Badge>

    )
}

const PriceGroup: React.FC<Exclude<Props['data'], null> > = ({ open, close, high, low, time ,volume}) => {
    const isRed = close < open
    const diff = close - open
    const diffPercent = (diff / open) * 100
    const sign = diff > 0 ? '+' : ''
    return (
        <div className=" space-x-2">
            <PriceIndicator title="Vol" price={round2decimalPts(volume/1e6,3)+'M'} isRed={isRed} />
            <PriceIndicator title="O" price={open} isRed={isRed} />
            <PriceIndicator title="H" price={high} isRed={isRed} />
            <PriceIndicator title="L" price={low} isRed={isRed} />
            <PriceIndicator title="C" price={close} isRed={isRed} />
            <PriceIndicator title="" price={
                `${sign}${round2decimalPts(diff, 2)} (${sign}${round2decimalPts(diffPercent, 2)}%)`
            } isRed={isRed} />
        </div>
    )
}


const Lengend: React.FC<Props> = ({ companyName, data,metadata }) => {
    const {ric,fx_rate} = metadata??{}



    return (
        <div
            className=" absolute left-2 top-2 z-50  space-y-1 "
        >
            <div className=" flex space-x-3  font-semibold py-1  px-3 text-lg bg-transparent w-fit text-center items-center">
                <span>{companyName}</span>
               {ric && <span >({ric})</span>}
                {fx_rate && <span className=" text-base font-medium  text-neutral-400 " >FX Rate: {fx_rate}</span>}
            </div>
            {data && <PriceGroup {...data} />}
        </div>
    )
}

export default Lengend