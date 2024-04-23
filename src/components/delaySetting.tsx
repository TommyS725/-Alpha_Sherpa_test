import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "./ui/button"
import { useDelayContext } from "@/contexts/delayContext"
import { useState } from "react"
import { Delay, Delays, randomDelay } from "@/model/delay"
import { Label } from "./ui/label"


type Props = {
    refetchAll: () => void
}

type DelayState = {
    newsDelay: Delay
    marketDataDelay: Delay
    companyInfoDelay: Delay
}

const selects = [
    {
        label: "News Data",
        value: "newsDelay",
    },
    {
        label: "Market Data",
        value: "marketDataDelay",
    },
    {
        label: "Company Info",
        value: "companyInfoDelay",
    },

]



const DelaySetting: React.FC<Props> = ({ refetchAll }) => {
    const { newsDelay, marketDataDelay, companyInfoDelay, save, defaultValues } = useDelayContext()
    const [open, setOpen] = useState(false)
    const [unconfirmedDelay, setUnconfirmedDelay] = useState<DelayState>({ newsDelay, marketDataDelay, companyInfoDelay })


    const allRandom = () => {
        const value = {
            newsDelay: randomDelay(),
            marketDataDelay: randomDelay(),
            companyInfoDelay: randomDelay(),
        }
        setUnconfirmedDelay(value)
    }

    const canDefault = 
    unconfirmedDelay.newsDelay !== defaultValues.newsDelay
    || unconfirmedDelay.marketDataDelay !== defaultValues.marketDataDelay
    || unconfirmedDelay.companyInfoDelay !== defaultValues.companyInfoDelay

    const setDefault = () => {
        setUnconfirmedDelay(defaultValues)
    }

    const isChanged = {
        newsDelay: newsDelay !== unconfirmedDelay.newsDelay,
        marketDataDelay: marketDataDelay !== unconfirmedDelay.marketDataDelay,
        companyInfoDelay: companyInfoDelay !== unconfirmedDelay.companyInfoDelay,
    }


    const canSave = Object.values(isChanged).some((val) => val)

    const handleSaveAndRefetch = () => {
        if (canSave) {
            save(unconfirmedDelay)
            //reftech is done in the parent component
        } else {
            refetchAll()
        }
        setOpen(false)
    }




    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button variant="outline">Network Delay Settings</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Delay Settings{canSave && ' (unsaved changes)'}</SheetTitle>
                <SheetDescription>
                    Set the network delay for simulated async requests
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                {
                    selects.map(({ label, value }) => {
                        const key = value as keyof DelayState
                        const modified = isChanged[key]
                        return <div className="items-center gap-4 grid  grid-cols-3 " key={label}>
                            <Label htmlFor={label} className="text-right">
                                {label}
                            </Label>
                            <Select value={String(unconfirmedDelay[key])}
                                onValueChange={val => setUnconfirmedDelay((prev) => ({ ...prev, [key]: +(val) }))}
                            >
                                <SelectTrigger className={` col-span-2 ${modified && 'bg-slate-400 bg-opacity-20'} `}>
                                    <SelectValue placeholder={label} />
                                </SelectTrigger>
                                <SelectContent >
                                    {
                                        Delays.map((delay) =>
                                            <SelectItem key={label + '-' + delay} value={String(delay)}>
                                                {delay === 0 ? 'No Delay' : delay + 's'}
                                            </SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    })
                }
            </div>
            <div className=" grid gap-y-4">
                <div className=" flex justify-end gap-8">

                    <Button onClick={allRandom} variant='link'> All Random </Button>
                    <Button onClick={setDefault} disabled={!canDefault}
                     variant='link' > Default </Button>
                </div>
                <div className=" flex justify-end">
                    <Button onClick={handleSaveAndRefetch} variant='default'
                        className=" col-span-2  place-self-end  " >
                        {canSave ? 'Save & Refetch' : 'Refetch'}
                    </Button>
                </div>
            </div>


        </SheetContent>
    </Sheet>
}

export default DelaySetting