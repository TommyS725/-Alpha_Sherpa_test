'use client'

import { getCompanyInfo } from "@/actions/getCompanyInfo";
import { getMarketData } from "@/actions/getMarketData";
import { getNewsData } from "@/actions/getNewsData";
import DataStatus from "@/components/dataStatus";
import MarketChart from "@/components/marketChart/chart";
import DelaySetting from "@/components/delaySetting";
import { ModeToggle } from "@/components/themeToggle";
import { useDelayContext } from "@/contexts/delayContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect } from "react";
import CompanyCard from "@/components/companyCard";
import NewsGrid from "@/components/newsGrid";

export default function Home() {
  const { newsDelay, companyInfoDelay, marketDataDelay } = useDelayContext()
  const companyInfoQuery = useQuery({
    queryKey: ['companyInfo'],
    queryFn: () => getCompanyInfo(companyInfoDelay),
    refetchOnWindowFocus: false
  })
  const marketDataQuery = useQuery({
    queryKey: ['marketData'],
    queryFn: () => getMarketData(marketDataDelay),
    refetchOnWindowFocus: false

  })
  const newsDataQuery = useQuery({
    queryKey: ['newsData'],
    queryFn: () => getNewsData(newsDelay),
    refetchOnWindowFocus: false
  })
  const queryClient = useQueryClient()

  const refetchAll = () => {
    // queryClient.resetQueries()
    queryClient.resetQueries({
      queryKey: ['companyInfo']
    })
    queryClient.resetQueries({
      queryKey: ['marketData']
    })
    queryClient.resetQueries({
      queryKey: ['newsData']
    })

  }

  useEffect(() => {
    refetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsDelay, companyInfoDelay, marketDataDelay])

  return (
    <>
      <header className=" w-full  flex justify-between items-center my-2 py-2  px-24  ">
        <div className=" space-x-20 items-center flex">
          <DataStatus title="Company Info" query={companyInfoQuery} />
          <DataStatus title="Market Data" query={marketDataQuery} />
          <DataStatus title="News Data" query={newsDataQuery} />
        </div>

        <div className=" space-x-14 items-center flex">
          <ModeToggle />
          <DelaySetting refetchAll={refetchAll} />
        </div>
      </header>
      <main className="mt-4 flex  flex-col items-center justify-between px-12 gap-8">
      <Accordion type="single" collapsible className=" w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" pl-4 text-2xl font-bold mb-2">Company Info</AccordionTrigger>
            <AccordionContent>
            <CompanyCard isFetching={companyInfoQuery.isFetching} data={companyInfoQuery.data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className=" w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" pl-4 text-2xl font-bold mb-2">Market Chart</AccordionTrigger>
            <AccordionContent>
              < MarketChart
              isFetching={marketDataQuery.isFetching && companyInfoQuery.isFetching }
                companyName={companyInfoQuery.data?.data.company_name}
                newsData={newsDataQuery.data}
                marketData={marketDataQuery.data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className=" w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" pl-4 text-2xl font-bold mb-2">News Data</AccordionTrigger>
            <AccordionContent>
              <NewsGrid isFetching={newsDataQuery.isFetching} data={newsDataQuery.data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </main>
    </>
  );
}
