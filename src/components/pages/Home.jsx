import Card from '../Card';

function Home({
    items,
    cartItems,
    favorites,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart
}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src={process.env.PUBLIC_URL + "/img/search.svg"} alt="Search" />
                    {searchValue && <img
                        onClick={() => setSearchValue('')}
                        className="clear cu-p"
                        src={process.env.PUBLIC_URL + "/img/btn-remove.svg"}
                        alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {
                    items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
                        <Card
                            key={index}
                            onFavourite={(obj) => { onAddToFavorite(obj) }}
                            onPlus={(obj) => { onAddToCart(obj) }}
                            added={cartItems.some(obj => obj.title === item.title)}
                            favorited={favorites.some(obj => obj.title === item.title)}
                            {...item}
                        />)
                }
            </div>
        </div>
    );
}

export default Home;
