import {  forwardRef } from "react";

import { CandleStickData } from "@/model/candleData";
import { round2decimalPts } from "@/lib/round2decimalPts";


export type Props = {
    data: CandleStickData | null;
    coordinates: {
        top: number;
        left: number;
    };
}


type Ref = HTMLDivElement;

function Pair(props: { title: string, value: number | string, className?: string }) {
    const { title, value, className } = props;
    return (
        <div className={"flex justify-between " + className}>
            <span>{title}:</span>
            <span> {value}</span>
        </div>
    )
}

const Tooltip = forwardRef<Ref, Props>((props, ref) => {
    const { data, coordinates } = props;
    const { top, left } = coordinates;
    if (!data) {
        return null
    }
    const { open, high, low, close, time, volume } = data;
    const isRed = close < open;
    const diff = close - open
    const diffPercent = (diff / open) * 100
    const sign = diff > 0 ? '+' : ''
    return (
        <div
            ref={ref}
            style={{
                top: `${top}px`,
                left: `${left}px`,
            }}
            className=" absolute  z-50 p-2 px-3 border-2 bg-slate-200 dark:bg-slate-700 font-medium text-sm
             bg-opacity-70 dark:bg-opacity-70   ">
            <div className=" items-center justify-center space-x-2  mb-1 flex text-base">
                <span className={`rounded-full  border-2 w-4 h-4 ${isRed ? 'bg-red-600' : 'bg-green-500'} `}></span>
                <span>{time.toString()}</span>
            </div>
            <div className=" grid grid-cols-2 gap-y-1 gap-x-3">
                <Pair title="O" value={open} />
                <Pair title="H" value={high} />
                <Pair title="L" value={low} />
                <Pair title="C" value={close} />
            </div>
            <div className={"flex  space-x-3 mt-1"}>
                <span>Delta:</span>
                <span>{`${sign}${round2decimalPts(diff, 2)} (${sign}${round2decimalPts(diffPercent, 2)}%)`}</span>
            </div>
            <div className={"flex  space-x-3 mt-1"}>
                <span>Volume:</span>
                <span>{ round2decimalPts(volume/1e6,3)+'M'}</span>
            </div>

        </div>
    );
});

Tooltip.displayName = 'Tooltip';


export default Tooltip;