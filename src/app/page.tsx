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


import { useEffect } from "react";
import CompanyCard from "@/components/companyCard";
import NewsGrid from "@/components/newsGrid";
import SectionAccordion from "@/components/sectionAccordion";

export default function Home() {
  const { newsDelay, companyInfoDelay, marketDataDelay } = useDelayContext()
  const companyInfoQuery = useQuery({
    queryKey: ['companyInfo'],
    queryFn: async () => await getCompanyInfo(companyInfoDelay),
    refetchOnWindowFocus: false
  })
  const marketDataQuery = useQuery({
    queryKey: ['marketData'],
    queryFn: async () => await getMarketData(marketDataDelay),
    refetchOnWindowFocus: false

  })
  const newsDataQuery = useQuery({
    queryKey: ['newsData'],
    queryFn: async () => await getNewsData(newsDelay),
    refetchOnWindowFocus: false
  })
  const queryClient = useQueryClient()

  const refetchAll = () => {
    queryClient.resetQueries()

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
      <main className="mt-4 flex  flex-col items-center  px-12 gap-8 min-h-[80vh] ">

        <SectionAccordion title={'Company Information'}>
          <CompanyCard isFetching={companyInfoQuery.isFetching} data={companyInfoQuery.data} />
        </SectionAccordion>
        <SectionAccordion title={'Market Data Chart'}>
          < MarketChart
            isFetching={marketDataQuery.isFetching && companyInfoQuery.isFetching}
            companyName={companyInfoQuery.data?.data.company_name}
            BBY={companyInfoQuery.data?.data.BBY}
            newsData={newsDataQuery.data}
            marketData={marketDataQuery.data} />
        </SectionAccordion>
        <SectionAccordion title={'News'}>
          <NewsGrid data={newsDataQuery.data} isFetching={newsDataQuery.isFetching} />
        </SectionAccordion>

      </main>
    </>
  );
}
