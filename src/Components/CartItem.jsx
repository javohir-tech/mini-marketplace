

function CartItem({ tovar, onRemove, increment, decrement }) {
    return (
        <div className="product-card added-card">
            <img src={tovar.image} alt="image alt" />
            <h3>{tovar.title}</h3>
            <p className="category">{tovar.category}</p>
            <div className="info-section">
                <p className="price">{tovar.price}</p>
                <div className="rating">
                    <span>{tovar.rating.rate}</span>
                    <span className="count">({tovar.rating.count})</span>
                </div>
            </div>
            <div className="footer-btns">
                <div className="count">
                    <button onClick={()=>decrement(tovar.id)}>-</button>
                    <span>{tovar.added}</span>
                    <button onClick={()=>increment(tovar.id)}>+</button>
                </div>
                <div className="remove-btn">
                    <button onClick={()=>onRemove(tovar.id)}>Olib Tashlash</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem