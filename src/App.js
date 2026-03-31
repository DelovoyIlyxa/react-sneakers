import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Config from './components/config.json';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites'


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    /* fetch(Config.API_URL1 + '/items')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json);
       }); */

    async function fetchData() {
      const cartResponse = await axios.get(`${Config.API_URL1}/cart`);
      const favoriteResponse = await axios.get(`${Config.API_URL2}/favorites`);
      const itemsResponse = await axios.get(`${Config.API_URL1}/items`);

      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));

    if (findItem) {
      await axios.delete(`${Config.API_URL1}/cart/${findItem.id}`);
      setCartItems(prev => prev.filter(item => item.id !== findItem.id));
    } else {
      const { data } = await axios.post(`${Config.API_URL1}/cart`, {
        ...obj,
        parentId: obj.id
      });

      setCartItems(prev => [...prev, data]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`${Config.API_URL1}/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`${Config.API_URL2}/favorites/${obj.id}`);
      }
      else {
        const { data } = await axios.post(`${Config.API_URL2}/favorites`, obj);
        setFavorites((prev) => [...prev, data]);
      }
    }
    catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              cartItems={cartItems}
              favorites={favorites}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          } />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites
              items={favorites}
              cartItems={cartItems}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          } />
      </Routes>

    </div>
  );
}

export default App;
