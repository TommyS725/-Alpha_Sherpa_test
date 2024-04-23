import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { NewsData, NewsEntry } from '@/model/news';
import { LoaderCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ColDef } from 'ag-grid-community'; // Import the 'ColDef' type from 'ag-grid-community' package
import { useTheme } from 'next-themes';
import { capitalizeFirstLetter } from '@/lib/utils';
import { string } from 'zod';



type Props = {
    data?: NewsData
    isFetching?: boolean
}

const NewsTypeCol: React.FC<{ news: NewsEntry, isDark: boolean }> = ({ news, isDark }) => {


    return (<div className='flex overflow-auto items-center mt-1 space-x-3 '>
        {Object.entries(news['News Type'])
            .filter(([newsType, value]) => value !== undefined)
            .map(([newsType, value]) => {
                const key = `${news.UID}-${newsType}-${value}`
                return (
                    <div key={key}
                        className="flex space-x-3 text-sm p-1 px-2   rounded-lg bg-gray-200 dark:bg-neutral-900"
                    >
                        <p className="text-gray-400">{newsType}</p>
                        <p className=" font-bold">{value!.toString()}</p>
                    </div>
                )

            })}
    </div>)
}


const NewsGrid: React.FC<Props> = ({ data, isFetching }) => {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'


    // Row Data: The data to be displayed.
    const rowData = useMemo(() => {
        if (!data) return []
        return data

    }, [data])

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = useMemo(() => {
        return [
            {
                headerName: "Prediction", field: "Prediction",
                valueFormatter: (params:{value:string})=> new Date(params.value).toLocaleString()
                // cellRenderer: (props: { data: NewsEntry }) => new Date(props.data.Prediction).toLocaleString()
            },
            { headerName: "Bloomberg", field: "Bloomberg" },
            {
                headerName: "Side", field: "Side",
                valueFormatter: (params:{value:string})=> params.value.split(' ').map(capitalizeFirstLetter).join(' ')

            },
            {
                headerName: "News Type", field: "News Type",
                valueFormatter: (params:{value:NewsEntry['News Type']})=> Object.keys(params.value).length,
                cellRenderer: (props: { data: NewsEntry }) => <NewsTypeCol news={props.data} isDark={isDark} />
            },
            {
                headerName: "Headline", field: "Headline",
            },
            { headerName: "Primary Reporter", field: "Primary Reporter" },
            { headerName: "Exchange Region", field: "Exchange Region" },
            { headerName: "UID", field: "UID" },
        ]
    }, [isDark])


    if (isFetching) {
        return <div className=" w-full flex justify-center items-center">
            <LoaderCircle className="animate-spin size-[10vh]" />
        </div>
    }


    if (!data) return null

    const height = rowData.length > 10 ? '80vh' :
        rowData.length > 5 ? '50vh' : '30vh'

    return (
        <div
            className={`${isDark ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'} `}
            style={{ height }} // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs as ColDef[]}
            />
        </div>
    )
}


export default NewsGrid
