import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center; ;
`;

const CoinsList = styled.ul`
  margin: 20px auto;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  margin-bottom: 10px;

  a {
    transition: color 0.2s ease-in;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }

  &:hover {
    background-color: #eee;
    img {
      filter: none;
    }
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  filter: grayscale(100%);
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data
            ?.map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name, rank: coin.rank }}
                >
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.name}
                  />
                  <span>{coin.name} </span>
                  <span>&rarr;</span>
                </Link>
              </Coin>
            ))
            .slice(0, 20)}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
