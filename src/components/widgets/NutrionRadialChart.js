import Chart from "react-apexcharts";
import useWebSocket from "react-use-websocket";
import React, { useState, useEffect } from "react";

const NutrionRadialChart = ({ activePlant }) => {
  const [todayTargetPpm, setTodayTargetPpm] = useState(0);
  const [yesterdayTargetPpm, setYesterdayTargetPpm] = useState(0);
  const [data, updateData] = useState([0]);

  const { lastJsonMessage } = useWebSocket("ws://localhost:8183/ws", {
    queryParams: { type: "nutrition_water_level" },
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

      return obj.data_type === "nutrition_water_level";
    },
  });

  useEffect(() => {
    if (activePlant === null) {
      return;
    }

    const todayTarget = activePlant?.nutrition_targets.filter((val) => {
      return val.plant_age === activePlant.current_age;
    });
    const yesterdayTarget = activePlant?.nutrition_targets.filter((val) => {
      return val.plant_age === activePlant.current_age - 1;
    });
    
    setTodayTargetPpm(todayTarget[0].target_ppm);
    setYesterdayTargetPpm(yesterdayTarget[0]?.target_ppm ?? 0);
  }, [activePlant]);

  useEffect(() => {
    let value = lastJsonMessage?.value ?? 0;
    value = value > 0 ? (value / todayTargetPpm) * 100 : 0;
    if (value > 100) {
      value = 100;
    }
    updateData([value]);
  }, [lastJsonMessage, todayTargetPpm]);

  let growthOptions = {
    series: data,
    labels: ["PPM"],
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -30,
    },
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "55%",
        },
        track: {
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              if (activePlant == null) {
                return 0;
              }

              return lastJsonMessage?.value;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [30, 70, 100],
      },
    },
    stroke: {
      dashArray: 5,
    },

    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
  };

  return (
    <div>
      <h5 className="card-header m-0 me-2 pb-4">Nutrition Target</h5>
      <Chart
        series={growthOptions.series}
        options={growthOptions}
        type="radialBar"
      />
      <div className="text-center fw-medium pt-2 mb-2">Target</div>

      <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-primary p-2">
              <i className="bx bx-bullseye text-primary"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>Yesterday</small>
            <h6 className="mb-0">
              {activePlant !== null ? yesterdayTargetPpm : "0"} ppm
            </h6>
          </div>
        </div>
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-info p-2">
              <i className="bx bx-target-lock text-info"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>Today</small>
            <h6 className="mb-0">
              {activePlant !== null ? todayTargetPpm : "0"} ppm
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrionRadialChart;
