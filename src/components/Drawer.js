function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src={process.env.PUBLIC_URL + "/img/btn-remove.svg"} alt="Remove" />
                </h2>
                {items.length > 0 ? (
                    <div>
                        <div className="items">
                            {items.map((obj) => (
                                <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                                    {console.log()}
                                    <div
                                        style={{ backgroundImage:  `url(${process.env.PUBLIC_URL + obj.imageUrl})` }}
                                        className="cartItemImg"
                                    />
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src={process.env.PUBLIC_URL + "/img/btn-remove.svg"}
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого</span>
                                    <div></div>
                                    <b>21 498 руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button className="greenButton">
                                Оформить заказ
                                <img src={process.env.PUBLIC_URL + "/img/arrow.svg"} alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="emptyCart">Корзина пустая</div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
