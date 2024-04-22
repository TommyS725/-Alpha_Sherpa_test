import { MarketData } from "@/model/marketData";
import { CandleStickData } from "@/model/candleData";



export function market2CandleStickData(marketData: MarketData): CandleStickData[] {
  const { data } = marketData;
  const stickData =  Object.entries(data).map(([time, daily]) => ({
    open: daily.open,
    close: daily.last_price,
    high: daily.high,
    low: daily.low,
    volume: daily.volume,
    time: time,
    ts: new Date(time).getTime(),
  }));
  stickData.sort((a, b) => a.ts - b.ts);
  return stickData;
}
