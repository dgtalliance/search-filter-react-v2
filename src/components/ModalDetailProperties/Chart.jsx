import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PROPERTIES_DETAIL_CHART } from "../../config/config";
import { Tabs } from 'antd';


export const Chart = ({ chartData, con, years }) => {


  let chartDataVar = [];

  useEffect(() => { 
      chartsDetails();

  }, [chartData, years]);

  const chartsDetails = () => {
   

    Highcharts.chart(con, {
      chart: {
        type: "spline",
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1,
        },
      },
      exporting: {
        enabled: false,
      },
      title: {
        text: "",
        align: "left",
      },
      // subtitle: {
      //   text: '13th & 14th of February, 2018 at two locations in Vik i Sogn, Norway',
      //   align: 'left'
      // },
      xAxis: {
        labels: {
          overflow: "justify",
        },
        categories: chartData.categories.slice(-12 * years),
      },
      yAxis: {
        title: {
          text: "",
        },
        opposite: true,
      },
      // yAxis: {
      //   title: {
      //     text: 'Wind speed (m/s)'
      //   },
      //   minorGridLineWidth: 0,
      //   gridLineWidth: 0,
      //   alternateGridColor: null,
      //   plotBands: [{ // Light air
      //     from: 0.3,
      //     to: 1.5,
      //     color: 'rgba(68, 170, 213, 0.1)',
      //     label: {
      //       text: 'Light air',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // Light breeze
      //     from: 1.5,
      //     to: 3.3,
      //     color: 'rgba(0, 0, 0, 0)',
      //     label: {
      //       text: 'Light breeze',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // Gentle breeze
      //     from: 3.3,
      //     to: 5.5,
      //     color: 'rgba(68, 170, 213, 0.1)',
      //     label: {
      //       text: 'Gentle breeze',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // Moderate breeze
      //     from: 5.5,
      //     to: 8,
      //     color: 'rgba(0, 0, 0, 0)',
      //     label: {
      //       text: 'Moderate breeze',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // Fresh breeze
      //     from: 8,
      //     to: 11,
      //     color: 'rgba(68, 170, 213, 0.1)',
      //     label: {
      //       text: 'Fresh breeze',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // Strong breeze
      //     from: 11,
      //     to: 14,
      //     color: 'rgba(0, 0, 0, 0)',
      //     label: {
      //       text: 'Strong breeze',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }, { // High wind
      //     from: 14,
      //     to: 15,
      //     color: 'rgba(68, 170, 213, 0.1)',
      //     label: {
      //       text: 'High wind',
      //       style: {
      //         color: '#606060'
      //       }
      //     }
      //   }]
      // },
      tooltip: {
        valuePrefix: "$",
      },
      plotOptions: {
        // spline: {
        //   lineWidth: 4,
        //   states: {
        //     hover: {
        //       lineWidth: 5
        //     }
        //   },
        //   marker: {
        //     enabled: false
        //   },
        //   pointInterval: 3600000, // one hour
        //   pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
        // }
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [
        {
          showInLegend: false,
          name: "",
          data: chartData.series.slice(-12 * years),
        },
      ],

      navigation: {
        menuItemStyle: {
          fontSize: "10px",
        },
      },
    });
  };

  return (
    <figure className="highcharts-figure">
      <div id={con}></div>
    </figure>
  );
};
