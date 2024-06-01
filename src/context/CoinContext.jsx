import { createContext, useEffect, useState } from "react";

export const CoinContext=createContext();

const CoinContextProvider=(props)=>{
    const [allcoin,setAllCoin]=useState([]);
    const[currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"

    })
    const fecthAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AAyPA1xMtySig63zimqdNnDk'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }
useEffect(()=>{
    fecthAllCoin();
},[currency])
   const contextValue={allcoin,currency,setCurrency}
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

}
export default CoinContextProvider