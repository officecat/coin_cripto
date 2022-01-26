import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

interface IHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Close Price",
              data: data?.map((price) => price.close),
            },
            {
              name: "Open Price",
              data: data?.map((price) => price.open),
            },
            // {
            //   name: "Price Fluctuation per Day",
            //   data: data?.map((price) =>
            //     (((price.open - price.close) / price.open) * 100).toFixed(2)
            //   ),
            // },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            colors: ["#e988d9", "#ddff48"],
            chart: {
              height: 500,
              width: 500,
              foreColor: "#b4aeb9",
              background: "transparent",
              toolbar: {
                show: true,
              },
            },
            grid: {
              show: true,
              borderColor: "#5f6d81",
              strokeDashArray: 1,
            },
            stroke: {
              curve: "smooth",
              // colors: ["#9c88ff", "#b4aeb9"],
              width: 2,
            },
            yaxis: {
              title: {
                // text: "Price",
              },
              showAlways: false,
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_open),

              title: {
                // text: "Date",
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
                color: "#5f6d81",
              },
              labels: { show: false },
            },
            fill: {
              type: "gradient",

              gradient: {
                gradientToColors: ["#9c88ff", "#74ca78"],
                stops: [0, 100],
              },
            },
            tooltip: {
              x: {
                format: "yyyy/MM/dd",
              },
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
