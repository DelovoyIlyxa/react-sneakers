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
    // fetch(Config.API_URL1 + '/items')
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    axios.get(`${Config.API_URL1}/items`).then((res) => {
      setItems(res.data);
    });

    axios.get(`${Config.API_URL1}/cart`).then((res) => {
      setCartItems(res.data);
    });

    axios.get(`${Config.API_URL2}/favorites`).then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post(`${Config.API_URL1}/cart`, obj).then((res) => {
      setCartItems((prev) => [...prev, res.data]);
    });
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
            <Favorites items={favorites}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          } />
      </Routes>

    </div>
  );
}

export default App;
