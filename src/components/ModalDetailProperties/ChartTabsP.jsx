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

  const median = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    let m = arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
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
                median(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_to_list"
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
                median(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_upper_list"
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
                median(
                  chartDataApi.value[defaultCity].metadata[defaultHome][
                    "sale_lower_list"
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
