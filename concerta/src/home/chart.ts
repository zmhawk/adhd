/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readData } from "../utils/db";
import dayjs from "dayjs";

const arr = [
  [0, 0],
  [0.25, 0.01],
  [0.5, 0.5],
  [1, 1.89],
  [1.5, 2.08],
  [2, 2.06],
  [3, 2.13],
  [4, 2.3],
  [6, 3.52],
  [6.8, 3.7],
  [8, 3.33],
  [10, 2.78],
  [12, 2.08],
  [14, 1.36],
  [17, 0.75],
  [20, 0.42],
  // [24, 0.2],
  // [30, 0.04],
];

export function getHour(value: number): number | null {
  if (value === null) {
    return null;
  }
  const date = new Date(value);
  const d0 = new Date().setHours(0, 0, 0, 0);
  const hour = (date.getTime() - d0) / 3600000;
  return hour;
}

export function renderMainChart() {
  const list = readData() || [];
  const last = list?.[0]?.time;

  if (!last || last < dayjs().subtract(16, "hour").valueOf()) {
    return;
  }
  const start: number = getHour(last) || 0;

  // 基于准备好的dom，初始化echarts实例
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const myChart = echarts.init(document.getElementById("mainChart"));
  // 指定图表的配置项和数据
  const option = {
    tooltip: {},
    yAxis: {
      type: "value",
      splitNumber: 8,
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      max: 4,
      min: 0,
    },
    xAxis: {
      type: "time",
      splitNumber: 15,
      axisLabel: {
        formatter: "{HH}",
      },
      splitLine: {
        show: true,
      },
      min: dayjs().startOf("days").valueOf() + Math.floor(start) * 3600000,
    },

    grid: {
      top: 40,
      left: 40,
      right: 40,
      bottom: 0,
      containLabel: true,
    },

    series: [
      {
        name: "zzd",
        type: "line",
        data: arr.map((i) => [
          dayjs().startOf("days").valueOf() + (i[0] + start) * 3600000,
          i[1],
        ]),
        smooth: true,
        symbol: "none",
        stack: "Total",
        areaStyle: {
          // color: "#6699ff",
          opacity: 0.2,
        },
        markLine: {
          symbol: "none",

          lineStyle: {
            width: 2,
            type: "solid",
          },
          data: [
            {
              name: "药效区间",
              yAxis: 2,
              label: {
                formatter: "",
              },
            },
            {
              name: "当前时间",
              xAxis: new Date().getTime(),
              label: {
                formatter: "",
              },
            },
          ],
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
