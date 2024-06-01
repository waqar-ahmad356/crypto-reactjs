import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const{allcoin,currency}=useContext(CoinContext)
  const[displaycoin,setDisplayCoin]=useState([])
  const[input,setInput]=useState("")

  const inputHandler=(event)=>{
    setInput(event.target.value)
    if(event.target.value===''){
      setDisplayCoin(allcoin)

    }

  }
const searchHanlder=async(event)=>{
  event.preventDefault();
  const filteredCoins = await allcoin.filter((coin) => {
    return coin.name.toLowerCase().includes(input.toLocaleLowerCase())

  
  });
  setDisplayCoin(filteredCoins)
}
  useEffect(()=>{
    setDisplayCoin(allcoin)

  },[allcoin])
  return (
    <div className='home'>
    <div className='hero'>
      <h1>Largest<br/>Crypto Marketplace</h1>
      <p>Welcom to the world largest cryptocurrency 
      marketplace. sign up to explore more about Cryptos..</p>
      <form onSubmit={searchHanlder}>
        <input type='text' placeholder='Search crypto..' list='coinlist' value={input} onChange={inputHandler} required/>

      <datalist id='coinlist'>
        {
          allcoin.map((item,index)=>{
            return <option key={index} value={item.name}>{item.name}</option>

          })
        }
      </datalist>


        <button type='submit'>Search</button>
      </form>
    </div>
    <div className='crypto-table'>
      <div className='table-layout'>
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p style={{textAlign:"center"}}>24H Change</p>
        <p className='market-cap'>Market Cap</p>
      </div>
      {
        displaycoin.slice(0,10).map((item,index)=>{
          return(
            <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
             <p> {item.market_cap_rank}</p>
             <div>
             <img src={item.image} alt=''/>
             <p>{item.name + '-'+ item.symbol}</p></div>
             <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
             <p style={{textAlign:"center"}} className={item.price_change_24h>0?"green":"red"}>
             {Math.floor(item.price_change_24h*100)/100}</p>
             <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          )

        })

      }
    </div>
      
    </div>
  )
}

export default Home
