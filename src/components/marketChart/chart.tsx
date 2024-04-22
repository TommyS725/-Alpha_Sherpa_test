import { market2CandleStickData } from "@/lib/market2CandleStickData"
import { MarketData } from "@/model/marketData"
import { IChartApi, createChart } from "lightweight-charts"
import { useTheme } from "next-themes"
import {  useEffect, useMemo, useRef, useState } from "react"
import Tooltip ,{Props as TooltipProps} from "./tooltip"
import Lengend from "./lengend"
import { CandleStickData } from "@/model/candleData"
import { NewsData } from "@/model/news"
import { dateLike2ChartTime } from "@/lib/dateLike2ChartTime"
import { LoaderCircle } from "lucide-react"




type Props = {
    companyName?: string
    marketData?: MarketData
    newsData?:NewsData
    isFetching?: boolean
}




type TooltipCoordinates = TooltipProps["coordinates"]



const MarketChart: React.FC<Props> = ({ marketData,companyName,newsData,isFetching }) => {
    const stickData = useMemo(() => marketData&&market2CandleStickData(marketData), [marketData])
    const metadata = useMemo(() => marketData?{
        ric:marketData.RIC_used,
        fx_rate:marketData.fx_rate
    }:null, [marketData])
    const [hoveredData, setHoveredData] = useState<CandleStickData | null>(null)
    //tooltip
    const [tooltipPosition, setTooltipPosition] = useState<TooltipCoordinates>({ top: 0, left: 0 })
    const tooltipRef = useRef<HTMLDivElement>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const { resolvedTheme } = useTheme()
    const textColor = resolvedTheme === "dark" ? "#fff" : "#000"




    useEffect(() => {
        if (!containerRef.current ) {
            return
        }

        const container = containerRef.current

        const chart = createChart(container, {
            layout: {
                background: {
                    color: "transparent",
                },
                textColor: textColor
            }
        })

        const handleResize = () => {
            chart.applyOptions({ width: container.clientWidth });
        };

        window.addEventListener('resize', handleResize);


        chart.timeScale().fitContent();

        //candlestick series
        const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
        
        //volume series
        const volumeSeries = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        });
        //set data
        if(stickData){
            candlestickSeries.setData(stickData)
            volumeSeries.setData(stickData.map((item) => ({
                time: item.time,
                value: item.volume,
                color: item.close > item.open ? 'rgba(38, 166, 154, 0.6)' : 'rgba(239, 83, 80, 0.6)',
            })));
        }

        //candle stick markers
        if(newsData){
            candlestickSeries.setMarkers(newsData.map(item=>{
                const time = dateLike2ChartTime(item.Prediction)
                const shape = item.Side === 'long' ? 'arrowUp' :item.Side === 'short' ? 'arrowDown' : 'circle'
                const color = item.Side === 'long' ? '#26a69a' :item.Side === 'short' ? '#ef5350' : '#e91e63'
                const position = item.Side === 'long' ? 'belowBar' : 'aboveBar'
                return {
                    time,
                    position,
                    color,
                    shape: shape,
                    text: item.Side,
                }
            }))

        }


        //margin settings
        candlestickSeries.priceScale().applyOptions({
            // set the positioning of the candlestick series
            scaleMargins: {
                top: 0.1,
                bottom: 0.3, 
            },
        });
        volumeSeries.priceScale().applyOptions({
            // set the positioning of the volume series
            scaleMargins: {
                top: 0.7, 
                bottom: 0,
            },
        });
        
        chart.applyOptions({
            rightPriceScale:{
               scaleMargins:{
                     top:0.3,
                     bottom:0.3
               }
            },
            grid:{
                vertLines:{
                    color: "rgba(197, 203, 206, 0.4)"
                },
                horzLines:{
                    color: "rgba(197, 203, 206, 0.4)"
                }
            }
        });
        

        chart.subscribeCrosshairMove(param => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > container.clientWidth ||
                param.point.y < 0 ||
                param.point.y > container.clientHeight
            ) {
                setHoveredData(null)
                return
            }
            // console.log(param.seriesData)
            const candleData = param.seriesData.get(candlestickSeries) as CandleStickData
            const volumeData = param.seriesData.get(volumeSeries) as {value:number}
            const toolTipWidth = tooltipRef.current?.clientWidth || 0;
            const toolTipHeight = tooltipRef.current?.clientHeight || 0;
            //distance from the cursor to the tooltip
            const toolTipMargin = 10;

            const y = param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > container.clientWidth - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
            }

            let top = y + toolTipMargin;
            if (top > container.clientHeight - toolTipHeight) {
                top = y - toolTipHeight - toolTipMargin;
            }
            setHoveredData({
                ...candleData, 
                volume: volumeData.value
            })
            setTooltipPosition({ top, left })

        })
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove()
        }

    }, [ stickData,textColor,newsData])



   if(isFetching){
         return <div className=" w-full flex justify-center items-center">
            <LoaderCircle className="animate-spin size-[10vh]"/> 
         </div>
    }


    return (
        <div className=" w-full">
            {/* <p>{hoveredData ? "Show tooltip" : "no show"}</p> */}

            <div
                className="w-full h-[60vh] relative  "
                ref={containerRef}
            >
                <Lengend 
                companyName={companyName} data={hoveredData} 
                metadata={metadata}
                />
                <Tooltip
                    ref={tooltipRef}
                    data={hoveredData}
                    coordinates={tooltipPosition}
                />
            </div>
        </div>
    );
}

export default MarketChart;