import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, useMatch, useNavigate } from "react-router-dom";

import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Candle from "./Candle";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:nth-child(1) {
    flex: 1 0 10%;
  }
  &:nth-child(2) {
    flex: 1 0;
  }
  &:nth-child(3) {
    flex: 1 0 10%;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
  margin: 0 auto;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: center;
  margin: 20px auto;
  background-color: #121212;
  border-radius: 10px;
  border-style: none;
  td {
    border: 1px solid ${(props) => props.theme.bgColor};
    padding: 10px;
    span {
      font-size: 0.8rem;
      display: block;
      color: ${(props) => props.theme.tagColor};
      text-decoration: underline 1px ${(props) => props.theme.tagColor};
      text-underline-position: under;
      padding-bottom: 13px;
    }
  }
  col {
    column-width: 1;
  }
`;

const Description = styled.p`
  font-weight: 100;
  line-height: 1.5;
  color: ${(props) => props.theme.tagColor};
  margin: 5px 10px;
  font-size: 0.9rem;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 1px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-transform: uppercase;
  text-align: center;
  background-color: #121212;
  padding: 7px 0;
  border-radius: 5px;
  font-size: 0.95rem;
  a {
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    display: block;
  }
  &:hover {
    background-color: ${(props) => (props.isActive ? null : "#232330")};
  }
`;

const Button = styled.div`
  padding: 7px;
  margin: 0;
  width: 15%;
  cursor: pointer;
`;

interface RouteState {
  state: {
    name: string;
    rank: number;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // tags: object;
  // team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  // links: object;
  // links_extended: object;
  // whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation() as RouteState;
  //Link에서 state를 받아올 때 useLocation을 사용.

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const candleMatch = useMatch("/:coinId/candle");

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setIsLoading(false);
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!)
    // { refetchInterval: 5000 }
  );
  const loading = infoLoading || tickersLoading;
  const navigate = useNavigate();

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* <button onClick={() => navigate(-1)}>go back</button> */}
        <Button as={Tab} onClick={() => navigate("/")}>
          &larr; List
        </Button>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Button></Button>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Table>
            <tbody>
              <tr>
                <td>
                  <span>Rank</span>
                  {tickersData?.rank}
                </td>
                <td>
                  <span>Symbol</span>
                  {tickersData?.symbol}
                </td>
                <td>
                  <span>Open Source</span>
                  {infoData?.open_source ? "Yes" : "No"}
                </td>
                <td>
                  <span>Price</span>${tickersData?.quotes.USD.price.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Description>{infoData?.description}</Description>
          <Table>
            <tbody>
              <tr>
                <td>
                  <span>Total Supply</span>
                  {tickersData?.total_supply.toLocaleString()}
                  {tickersData?.max_supply ? (
                    <>
                      &nbsp;(
                      {(
                        (Number(tickersData?.total_supply) /
                          Number(tickersData?.max_supply)) *
                        100
                      ).toFixed(2)}
                      %)
                    </>
                  ) : null}
                </td>
                <td>
                  <span>Max Supply</span>
                  {tickersData?.max_supply.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </Table>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Line Chart</Link>
            </Tab>
            <Tab isActive={candleMatch !== null}>
              <Link to={`/${coinId}/candle`}>Candle Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price Info</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId as string} />} />
            <Route
              path="candle"
              element={<Candle coinId={coinId as string} />}
            />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
