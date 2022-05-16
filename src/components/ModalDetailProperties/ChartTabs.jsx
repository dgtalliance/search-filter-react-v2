import React, { useEffect } from "react";

import { Tabs } from "antd";
import { Chart } from "./Chart";
export const ChartTabs = ({
  defaultCity,
  callback,
  chartDataApi,
  defaultHome,
  chartDataShow,
  defaultYears,
}) => {
  const { TabPane } = Tabs;

  useEffect(() => {}, []);

  const median = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    let m = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
     return(
       <>
       {
         m === 0 ? <span style={{color: 'red'}}>N/A</span> : <>${m}</>
       }
       </>
     );
  };

  const sold = (arr) => {
    let sum = 0;
    arr.forEach((element) => {
      sum = sum + element;
    });

    return sum;
  };

  return (
    <Tabs onChange={callback} type="card">
      <TabPane
        tab={
          <div>
            <h3>Median Sale Price</h3>
            <h3>
              {median(
                chartDataApi.value[defaultCity].metadata[defaultHome][
                  "media_price"
                ].slice(-12 * defaultYears)
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].media_price_percent >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                  .media_price_percent > 0
                  ? "+"
                  : ""}
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                    .media_price_percent
                }
                %
              </span>{" "}
              {defaultYears == 1 ? 'year-over-year' : `${defaultYears} years back`}
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
            <h3>
              {sold(
                chartDataApi.value[defaultCity].metadata[defaultHome][
                  "sold_cant"
                ].slice(-12 * defaultYears)
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].sold_cant_percent >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                  .sold_cant_percent > 0
                  ? "+"
                  : ""}
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                    .sold_cant_percent
                }
                %
              </span>{" "}
              {defaultYears == 1 ? 'year-over-year' : `${defaultYears} years back`}
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
            <h3>
              
               {median(
                chartDataApi.value[defaultCity].metadata[defaultHome][
                  "media_adom"
                ].slice(-12 * defaultYears)
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].media_price_percent >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                  .media_price_percent > 0
                  ? "+"
                  : ""}
                {
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[defaultYears]
                    .media_price_percent
                }
                %
              </span>{" "}
              {defaultYears == 1 ? 'year-over-year' : `${defaultYears} years back`}
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
