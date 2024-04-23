# Alpha Sherpa Front End Developer Intern Test
#### Tommy Shum Ching Chit 
 [Email](mailto:ching.chit@gmail.com) [GitHub](https://github.com/TommyS725) [Linkedin](https://www.linkedin.com/in/tommy-s-3949b1277)

 ## Overview
 This project is a NextJs powered data visualisation webpage following the specification stated in [this document](./docs/Intern%20Test.docx). This project visualises three types of data, namely 'Company Information', 'Market Data' and 'News' in chart and tabular format. To simulate delayed network requests, controllable delay simulation is added as additonal feature.


 ## Installation
 #### 1. Locally
Assume using [npm](https://www.npmjs.com/) as package manager.
```sh
npm install
npm run build
npm run start
```
The server is started at <http://localhost:3000>

#### 2. Using Docker
```sh
docker-compose up
```
The server is started at <http://localhost:3000>


## Basic Features

#### Asynchronous Loading
As to simulate api calls, the three JSON files are loaded asynchronously. In terms of visualisation, the corresponding components are not delayed by unrelated data, being ready once loaded. The dependence is as follows.

Component                                    | Data Dependence
-------------------------------------------- | -------------
Company information card                     | `company_info`
Market candlestick chart                     |  `market_data`
News markers                                 | `news_data`
News filtering by BBY & compnay name display | `company_info`
News tabulation                              | `news_data`

#### Market Data Chart
To visualise the market data, the OHLC data is displayed as candlesticks, and the volumes are shown as histograms. Markers are added on the chart to display the 'side' signals carried by the news. When hovering over a specific data entry, the corrisponding OHLC data will be shown as legend and tooltip. As to provide higher controllability, news signals can be toggled by selecting news brokers to display. 

![market data chart](/docs/images/market_chart.png)

#### Company Information Card
To visualise the company information, all data are displayed in a card format.

![company info card](/docs/images/com_card.png)

#### News Tabulation
News data is visualised in a tabular format using [ag grid](https://www.ag-grid.com/). 

![news table](/docs/images/news_table.png)


## Additional Features

#### Network Delay Setting
As to simulate the delays caused by api calls. The simulated delays of the three data can be controlled in a sheet component respectively. Additionally, the loading status of the data can be chekced on the top of webpage.

   *Delay Settings*                              |  *Data Status*
:-----------------------------------------------:|:-------------------------:
![delay setting](/docs/images/delay_setting.png) |  ![data status](/docs/images/data_status.png)




#### Filtering unmatched Bloomberg Symbol (BBY)
As the 'Bloomberg' field of some news in data set does not match that stated in the company info as BBY. The unmatched news is filtered out as default and not showing on the chart. This behavior can be toggled in the news filter section.