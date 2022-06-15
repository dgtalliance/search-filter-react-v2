import React, { useEffect } from "react";

import { Tabs } from "antd";
import { ChartP } from "./ChartP";
export const ChartTabsP = ({
  defaultCity,
  callback,
  chartDataApi,
  defaultHome,
  chartDataShow,
  defaultYears,
}) => {
  const { TabPane } = Tabs;

  useEffect(() => {}, []);


  const round = (num)=> {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  const percent = (arr, total) => {
    let arrSum = 0;
    arr.forEach (function(numero){
      arrSum += numero;
    });

    let totalSum = 0;
    total.forEach (function(numero){
      totalSum += numero;
    });

   


    


    let m = totalSum !== 0 ? round(arrSum * 100 / totalSum)  : 0;
    return (
      <>{m === 0 ? <span style={{ color: "red" }}>N/A</span> : <>{m}%</>}</>
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
            <h3>Sale-to-list-Price</h3>
            <h3>
              {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                percent(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_to_list_value"
                  ].slice(-12 * defaultYears),
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "total"
                  ].slice(-12 * defaultYears)
                )
              ) : (
                <span style={{ color: "red" }}>N/A</span>
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome] &&
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].percent_sale_to_list >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome] &&
                chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                  defaultYears
                ].percent_sale_to_list > 0
                  ? "+"
                  : ""}
                {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                    defaultYears
                  ].percent_sale_to_list
                ) : (
                  <span style={{ color: "red" }}>N/A</span>
                )}
                %
              </span>{" "}
              {defaultYears == 1
                ? "year-over-year"
                : `${defaultYears} years back`}
            </h5>
          </div>
        }
        key="sale_to_list"
      >
        <ChartP
          chartData={chartDataShow}
          con={"sale_to_list"}
          years={defaultYears}
        />
      </TabPane>
      <TabPane
        tab={
          <div>
            <h3>Homes Sold Above Price</h3>
            <h3>
              {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                percent(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_upper_list_value"
                  ].slice(-12 * defaultYears),
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "total"
                  ].slice(-12 * defaultYears)
                )
              ) : (
                <span style={{ color: "red" }}>N/A</span>
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome] &&
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].percent_sale_upper_list >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome] &&
                chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                  defaultYears
                ].percent_sale_upper_list > 0
                  ? "+"
                  : ""}
                {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                    defaultYears
                  ].percent_sale_upper_list
                ) : (
                  <span style={{ color: "red" }}>N/A</span>
                )}
                %
              </span>{" "}
              {defaultYears == 1
                ? "year-over-year"
                : `${defaultYears} years back`}
            </h5>
          </div>
        }
        key="sale_upper_list"
      >
        <ChartP
          chartData={chartDataShow}
          con={"sale_upper_list"}
          years={defaultYears}
        />
      </TabPane>
      <TabPane
        tab={
          <div>
            <h3>Homes with Price Drops</h3>
            <h3>
              {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                percent(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_lower_list_value"
                  ].slice(-12 * defaultYears),
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "total"
                  ].slice(-12 * defaultYears)
                )
              ) : (
                <span style={{ color: "red" }}>N/A</span>
              )}
            </h3>
            <h5>
              <span
                style={{
                  color:
                    chartDataApi.value[defaultCity].metadata[defaultHome] &&
                    chartDataApi.value[defaultCity].metadata[defaultHome]
                      .percent[defaultYears].percent_sale_lower_list >= 0
                      ? "#75b945"
                      : "red",
                }}
              >
                {chartDataApi.value[defaultCity].metadata[defaultHome] &&
                chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                  defaultYears
                ].percent_sale_lower_list > 0
                  ? "+"
                  : ""}
                {chartDataApi.value[defaultCity].metadata[defaultHome] ? (
                  chartDataApi.value[defaultCity].metadata[defaultHome].percent[
                    defaultYears
                  ].percent_sale_lower_list
                ) : (
                  <span style={{ color: "red" }}>N/A</span>
                )}
                %
              </span>{" "}
              {defaultYears == 1
                ? "year-over-year"
                : `${defaultYears} years back`}
            </h5>
          </div>
        }
        key="sale_lower_list"
      >
        <ChartP
          chartData={chartDataShow}
          con={"sale_lower_list"}
          years={defaultYears}
        />
      </TabPane>
    </Tabs>
  );
};
