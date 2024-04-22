import { Time } from "lightweight-charts";

export type CandleStickData = {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  time: Time;
};
