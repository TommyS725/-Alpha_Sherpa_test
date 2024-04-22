'use client'

import { Delay, randomDelay } from "@/model/delay";
import { createContext, useContext, useState } from "react";




type DelayContextType = {
    companyInfoDelay: Delay;
    marketDataDelay: Delay;
    newsDelay: Delay;
    reset: () => {
        companyInfoDelay: Delay;
        marketDataDelay: Delay;
        newsDelay: Delay;
    }
    defaultValues :{
        companyInfoDelay: Delay;
        marketDataDelay: Delay;
        newsDelay: Delay;
    }
    save: (toSave:{companyInfoDelay: Delay, marketDataDelay: Delay, newsDelay: Delay}) => void
}


const delayContext = createContext<null | DelayContextType>(null)

const defaultDelay: Delay = 0

const defaultValues  ={
    companyInfoDelay: defaultDelay,
    marketDataDelay: defaultDelay,
    newsDelay: defaultDelay

}



export function DelayContextProvider({ children }: { children: React.ReactNode }) {
    const [companyInfoDelay, setCompanyInfoDelay] = useState<Delay>(defaultDelay)
    const [marketDataDelay, setMarketDataDelay] = useState<Delay>(defaultDelay)
    const [newsDelay, setNewsDelay] = useState<Delay>(defaultDelay)
    function reset() {
        setCompanyInfoDelay(defaultDelay)
        setMarketDataDelay(defaultDelay)
        setNewsDelay(defaultDelay)
        return {
            companyInfoDelay: defaultDelay,
            marketDataDelay: defaultDelay,
            newsDelay: defaultDelay
        }
    }



    function save(toSave:{companyInfoDelay: Delay, marketDataDelay: Delay, newsDelay: Delay}) {
        const {companyInfoDelay, marketDataDelay, newsDelay} = toSave
        setCompanyInfoDelay(companyInfoDelay)
        setMarketDataDelay(marketDataDelay)
        setNewsDelay(newsDelay)
    }

    return (
        <delayContext.Provider value={{
            companyInfoDelay,
            marketDataDelay,
            newsDelay,
            reset,
            save,
            defaultValues,
        }}>
            {children}
        </delayContext.Provider>
    )
}

export function useDelayContext() {
    const context = useContext(delayContext)
    if (!context) {
        throw new Error("useDelayContext must be used within a DelayContextProvider")
    }
    return context
}