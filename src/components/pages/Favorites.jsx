import Card from '../Card';

function Favorites({
    items,
    onAddToFavorite,
    onAddToCart
}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Избранное</h1>
            </div>
            <div className="d-flex flex-wrap">
                {
                    items.map((item, index) =>
                        <Card
                            key={index}
                            onFavourite={(obj) => { onAddToFavorite(obj) }}
                            onPlus={(obj) => { onAddToCart(obj) }}
                            favorited={true}
                            {...item}
                        />)
                }
            </div>
        </div>
    );
}

export default Favorites;
