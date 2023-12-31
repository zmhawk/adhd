/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readData } from "../utils/db";
import dayjs from "dayjs";

export function renderCalenderChart() {
  const list = readData() || [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const calenderChart = echarts.init(document.getElementById("calenderChart"));

  const data = list.map((i) => [dayjs(i.time).format("YYYY-MM-DD"), i.dose]);

  const dataMap = data.reduce((acc: Record<string, number>, cur) => {
    const [date, dose] = cur as [string, number];
    if (acc[date]) {
      acc[date] += dose;
    } else {
      acc[date] = dose;
    }
    return acc;
  }, {});

  const range = [
    dayjs(list[0]?.time)
      .subtract(1, "months")
      .startOf("months")
      .startOf("weeks")
      .format("YYYY-MM-DD"),
    dayjs(list[0]?.time).endOf("months").endOf("weeks").format("YYYY-MM-DD"),
  ];

  const data2 = [];
  for (
    let i = range[0];
    i <= range[1];
    i = dayjs(i).add(1, "days").format("YYYY-MM-DD")
  ) {
    data2.push([
      dayjs(i).format("YYYY-MM-DD"),
      dataMap[dayjs(i).format("YYYY-MM-DD")] || 0,
    ]);
  }

  const option = {
    tooltip: {},
    calendar: {
      top: "middle",
      left: "center",
      orient: "vertical",
      cellSize: 35,
      yearLabel: {
        margin: 50,
        fontSize: 30,
      },
      dayLabel: {
        firstDay: 0,
        nameMap: "ZH",
        show: true,
      },
      monthLabel: {
        nameMap: "ZH",
        margin: 15,
        fontSize: 20,
        color: "#999",
        show: true,
      },
      range: range,
    },

    series: [
      {
        type: "custom",
        // edgeSymbol: ["none", "arrow"],
        coordinateSystem: "calendar",
        symbolSize: 25,
        calendarIndex: 0,
        // symbol: "rect",
        // itemStyle: {
        //   color: function (params) {
        //     const date = dayjs(params.value[0]);
        //     const today = dayjs();
        //     if (params.value[1]) {
        //       return "#9999ff";
        //     }
        //     if (date.isSame(today, "day")) {
        //       return "#ccccff";
        //     }
        //     return "#ffff";
        //   },
        //   // shadowBlur: 4,
        //   // shadowOffsetX: 0,
        //   // shadowOffsetY: 0,
        //   // shadowColor: "#555",
        // },
        renderItem: function (_params: any, api: any) {
          const cellPoint = api.coord(api.value(0));
          const value = api.value(1);

          const date = dayjs(api.value(0));

          const isToday = date.isSame(dayjs(), "day");

          const [x, y] = cellPoint;

          let textColor = "#666";
          if (value) {
            textColor = "#fff";
          }
          // if (isToday) {
          //   textColor = "#000";
          // }

          const groups: any[] = [
            {
              type: "text",
              style: {
                x: cellPoint[0],
                y: cellPoint[1] - 7,
                text: isToday ? "今" : date.format("D"),
                fill: textColor,
                textFont: api.font({ fontSize: 14 }),
                textAlign: "center",
                // textVerticalAlign: "middle",
              },
            },
          ];

          if (value) {
            groups.unshift({
              type: "circle",
              shape: {
                cx: x,
                cy: y,
                r: 12,
              },
              style: {
                fill: "#9999ff",
                shadowBlur: 4,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: "#555",
              },
            });
          }

          return {
            type: "group",
            // 如果 diffChildrenByName 设为 true，则会使用 child.name 进行 diff，
            // 从而能有更好的过度动画，但是降低性能。缺省为 false。
            // diffChildrenByName: true,
            children: groups,
          };
        },
        // lineStyle: {
        //   color: "#D10E00",
        //   width: 1,
        //   opacity: 1,
        // },
        // label: {
        //   show: true,
        //   formatter: function (params) {
        //     const date = dayjs(params.value[0]);
        //     return date.format("D");
        //   },
        //   fontSize: 14,
        //   color: "#666",
        // },
        data: data2,

        z: 20,
      },
    ],
  };
  calenderChart.setOption(option);
}
