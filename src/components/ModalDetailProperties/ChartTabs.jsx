import React, {useEffect, useLayoutEffect} from "react";

import { Tabs } from "antd";
import { Chart } from "./Chart";
export const ChartTabs = ({defaultTab,defaultCity, callback, chartDataApi, defaultHome, chartDataShow, defaultYears}) => {
  const { TabPane } = Tabs;

 
  useEffect(()=>{
   console.log('dddddddddddd', chartDataShow)
  }, [])
  

  return (
    <Tabs onChange={callback} type="card">
      <TabPane
        tab={
          <div>
            <h3>Median Sale Price</h3>
            <h3>${chartDataApi.value[defaultCity].metadata[defaultHome]['media_price'][chartDataApi.value[defaultCity].metadata[defaultHome]['media_price'].length - 1]}</h3>
            <h5>
              <span>
                +
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent
                    .media_price_percent
                }
                %
              </span>{" "}
              year-over-year
            </h5>
          </div>
        }
        key="media_price"
      >
        <Chart
          chartData={chartDataShow}
          con={"media_price"}
          years={defaultYears}
        />
      </TabPane>
      <TabPane
        tab={
          <div>
            <h3># of Homes Sold</h3>
            <h3>{chartDataApi.value[defaultCity].metadata[defaultHome]['sold_cant'][chartDataApi.value[defaultCity].metadata[defaultHome]['sold_cant'].length - 1]}</h3>
            <h5>
              <span>
                +
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent
                    .sold_cant_percent
                }
                %
              </span>{" "}
              year-over-year
            </h5>
          </div>
        }
        key="sold_cant"
      >
        <Chart
          chartData={chartDataShow}
          con={"sold_cant"}
          years={defaultYears}
        />
      </TabPane>
      <TabPane
        tab={
          <div>
            <h3>Median Days on Market</h3>
            <h3>{chartDataApi.value[defaultCity].metadata[defaultHome]['media_adom'][chartDataApi.value[defaultCity].metadata[defaultHome]['media_adom'].length - 1]}</h3>
            <h5>
              <span>
                +
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent
                    .media_price_percent
                }
                %
              </span>{" "}
              year-over-year
            </h5>
          </div>
        }
        key="media_adom"
      >
        <Chart
          chartData={chartDataShow}
          con={"media_adom"}
          years={defaultYears}
        />
      </TabPane>
    </Tabs>
  );
};
