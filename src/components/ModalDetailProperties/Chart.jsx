import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PROPERTIES_DETAIL_CHART } from "../../config/config";
// import { Tabs } from 'antd';


export const Chart = ({ propertiesData }) => {
  const [chartData, setChartData] = useState("3.215");

  let chartDataVar = [];

  useEffect(() => {
    if (Object.keys(propertiesData).length > 0) {
      chartsDetails();
    }
  }, [propertiesData]);

  const chartsDetails = async () => {
    const response = await axios.get(
      API_PROPERTIES_DETAIL_CHART +
        `?city_id=${propertiesData.city_id}&board_id=${propertiesData.board_id}&zip=${propertiesData.zip}&is_rental=${propertiesData.is_rental}`
    );
    console.log("", response.data);

    if (response.data.length != 0) {
      setChartData(response.data);
      chartDataVar = response.data;
    }

    Highcharts.chart("container", {
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
        categories: chartDataVar.value.city.month,
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
      },
      series: [
        {
          showInLegend: false,
          name: "",
          data: chartDataVar.value.city.metadata[1].media_price,
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
      <div id="container"></div>
    </figure>
  );
};
