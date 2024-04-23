import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "../ui/button"
import { NewsData } from "@/model/news"
import { useEffect, useMemo, useState } from "react"




type Props = {
    BBY?: string
    newsData?: NewsData
    setNewsDataToDisplay: React.Dispatch<React.SetStateAction<NewsData>>
}

const NewsFilter: React.FC<Props> = (props) => {
    const { BBY, newsData, setNewsDataToDisplay } = props
    //to handle news data changing
    const [prevNewsData, setPrevNewsData] = useState<NewsData>()
    const [showUnmatchedNews, setShowUnmatchedNews] = useState(false)
    const [selectedNewsBrokers, setSelectedNewsBrokers] = useState<string[]>([])

    const newsDataMatched = useMemo(() => {
        if (!newsData) return []
        return newsData.filter(news => {
            //if BBY is not ready, show all news
            if (!BBY || showUnmatchedNews) return true
            return news.Bloomberg === BBY
        })
    }, [newsData, BBY, showUnmatchedNews])

    //use primary reporters as the news brokers
    //brokers open to select
    const newsBrokersAvailabe = useMemo(() => newsDataMatched.map(n => n["Primary Reporter"]), [newsDataMatched])

    //fselected news brokers that are available
    const ressolvedSelectedNewsBrokers = useMemo(() =>
        selectedNewsBrokers.filter(broker => newsBrokersAvailabe.includes(broker))
        , [selectedNewsBrokers, newsBrokersAvailabe])

    //filter news data based on selected news brokers and BBY matching
    const filteredNewsData = useMemo(() => newsDataMatched.filter(news => ressolvedSelectedNewsBrokers.includes(news['Primary Reporter']))
        , [newsDataMatched, ressolvedSelectedNewsBrokers])




    //handle changing of news data
    if (newsData !== prevNewsData) {
        //do not replace with empty data during re-fetching
        if (newsData) {
            // console.log('news data changed',newsData)
            setPrevNewsData(newsData)
            const allBrokers = Array.from(new Set(newsData?.map(news => news['Primary Reporter'])))
            if (!prevNewsData) {
                //case when newsData is first loaded
                setSelectedNewsBrokers(allBrokers)
            } else {
                //case when newsData is updated or refetched
                const exitingAelectedBrokers = selectedNewsBrokers.filter(broker => allBrokers.includes(broker))
                setSelectedNewsBrokers(exitingAelectedBrokers)
            }

            //NewsDataToDisplay is set in the effect
        }
    }

    //set news data to display
    useEffect(() => {
        setNewsDataToDisplay(filteredNewsData)
    }, [filteredNewsData, setNewsDataToDisplay])

    const canSelectAll = ressolvedSelectedNewsBrokers.length !== newsBrokersAvailabe.length
    const canClear = selectedNewsBrokers.length !== 0
    const selectAll = () => setSelectedNewsBrokers(newsBrokersAvailabe)
    const clear = () => setSelectedNewsBrokers([])



    if (!newsData) return null

    return (
        <Accordion type="single" collapsible defaultValue="item-1"
            className="w-full mb-8  ml-4"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className=" font-semibold text-lg ">News Filtering</AccordionTrigger>
                <AccordionContent className='space-y-4'>
                    {BBY &&
                        <div className="flex items-center space-x-2">
                            <Switch id="show_unmatched" checked={showUnmatchedNews} onCheckedChange={e => setShowUnmatchedNews(e.valueOf())} />
                            <Label htmlFor="show_unmatched">Show Unmatched Bloomberg</Label>
                        </div>}
                    <div>
                        <p className="mb-4 font-medium" >News Brokers ({ressolvedSelectedNewsBrokers.length}/{newsBrokersAvailabe.length})</p>
                        <ToggleGroup type="multiple"
                            className=" gap-4 flex-wrap justify-start items-center "
                            variant='outline'
                            value={ressolvedSelectedNewsBrokers}
                            onValueChange={(value) => setSelectedNewsBrokers(value)}>
                            {
                                newsBrokersAvailabe
                                    .map(broker => {
                                        return (
                                            <ToggleGroupItem key={broker} value={broker}  >
                                                {broker}
                                            </ToggleGroupItem>
                                        )
                                    })
                            }
                        </ToggleGroup>
                        <div className=" mt-2 space-x-4">
                            <Button variant={'ghost'} onClick={selectAll} disabled={!canSelectAll}>Select All</Button>
                            <Button variant={'ghost'} onClick={clear} disabled={!canClear}>Clear</Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>


    )
}


export default NewsFilter