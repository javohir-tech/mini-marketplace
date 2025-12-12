import CartItem from "./CartItem"

function CartList({ data, onRemove, increment, decrement }) {
    return (
        <>
            {data.length === 0
                ?
                <div className="empty-box">
                    <h1>
                        Savatga Mahsulot qoshing
                    </h1>
                </div>

                :

                data.map((item) => (
                    <CartItem key={item.id} tovar={item} onRemove={onRemove} increment={increment} decrement={decrement} />
                ))}
        </>
    )
}

export default CartList