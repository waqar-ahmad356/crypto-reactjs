import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coindata, setCoinData] = useState();
  const [historicaldata, setHistoricalData] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-AAyPA1xMtySig63zimqdNnDk' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchHistoicalData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AAyPA1xMtySig63zimqdNnDk'}
    };
    try {
      const response=await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
     const data=await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.log(error)
      
    }
    
      
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoicalData();
  }, [currency]);

  if (coindata,historicaldata) {
    return (
      <div className='coin'>
        <div className='coin-name'>
          {coindata.image && coindata.image.large && <img src={coindata.image.large} alt='' />}
          <p>
            <b>
              {coindata.name} ({coindata.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className='coin-chart'>
          <LineChart historicaldata={historicaldata}/>
        </div>
        <div className='coin-info'>
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coindata.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H High</li>
            <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H Low</li>
            <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }
};

export default Coin;
