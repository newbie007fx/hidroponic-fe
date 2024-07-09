import Chart from "react-apexcharts";
import useWebSocket from "react-use-websocket";
import React, { useState, useEffect } from "react";
import nutritionWaterLevelService from "../../services/nutrition-water-level.service";

const NutrionAreaChart = () => {
  const dataType = "nutrition_water_level";
  const [baseData, updateBaseData] = useState([[Date.now(), 0]]);

  useEffect(() => {
    nutritionWaterLevelService.getNutritionWaterLevel().then((response) => {
      console.log(response.data);
      if (response.data.data) {
        const tempData = response.data.data?.map((val) => {
          return [val.created_at, val.value];
        });
        updateBaseData(tempData);
      }
    }).catch(function (error) {
      console.log("error");
    });;
  }, []);

  const [series, updateSeries] = useState([
    {
      data: baseData,
    },
  ]);

  const { lastJsonMessage } = useWebSocket("ws://localhost:8183/ws", {
    queryParams: { type: dataType },
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 5,
    reconnectInterval: (attemptNumber) => {
      return Math.min(Math.pow(2, attemptNumber + 1) * 1000, 60000);
    },
    filter: (message) => {
      const obj = JSON.parse(message.data);
      if (obj.action_type === "new_value") {
        updateBaseData([...baseData, [obj.created_at, obj.value]]);
        return false;
      }

      return obj.data_type === dataType;
    },
  });

  useEffect(() => {
    updateSeries([
      {
        data: [
          ...baseData,
          [
            lastJsonMessage?.created_at ?? Date.now(),
            lastJsonMessage?.value ?? 0,
          ],
        ],
      },
    ]);
  }, [baseData, lastJsonMessage]);

  var chartOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val | 0;
        },
      },
      min: 0,
      title: {
        text: "PPM",
      },
    },
  };

  return (
    <div>
      <h5 className="card-header m-0 me-2 pb-2">Nutrition History Chart</h5>
      <Chart series={series} options={chartOptions} type="area" />
    </div>
  );
};

export default NutrionAreaChart;
