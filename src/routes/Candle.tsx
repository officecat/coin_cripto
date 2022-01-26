import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
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

function Candle({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexCharts
            type="candlestick"
            series={[
              {
                name: "Close Price",
                data: data?.map((price) => ({
                  x: new Date(price.time_open),
                  y: [
                    price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2),
                  ],
                })),
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
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
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                categories: data?.map((price) => price.time_open),
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                  color: "#5f6d81",
                },
                labels: { show: false },
              },
              tooltip: {
                x: {
                  format: "yyyy/MM/dd",
                },
                // y: {
                //   formatter: (value) => `$${value.toFixed(2)}`,
                // },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Candle;
