import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './coin';

function App() {
  const [coins, setCoins] = useState([]); // sets coins passsed as arrays
  const [search, setSearch] = useState(''); // sets search will pass the values and data maps 

  /* the component action needs to occur before renders. 
    axios library will be used to create this API.
  */
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data); // retrieving data 
        console.log(res.data);
      })
      .catch(error => console.log(error)); // catches an error
  }, []);

  /*

  */
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  /*
  input of text is accepted to search for a "coin" using the 
  onChange event. Then the map will return with the coin elements/attributes.
  */
  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Crypto Price Tracker</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
