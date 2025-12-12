//Hooks
import { useState, useEffect } from "react"
//Components
import CartList from "./Components/CartList"
//style
import './index.css'


function App() {

  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || [])

    const kuzat = () => setCart(JSON.parse(localStorage.getItem('cart')) || [])
    window.addEventListener('cartUpdated', kuzat)
    return () => window.removeEventListener('cartUpdated', kuzat)

  }, [])

  function removeItem(id) {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const edit = (editType, id) => {
    let data = JSON.parse(localStorage.getItem('cart'))
    let signal = false
    data = data.map(item => {
      if (item.id === id) {
        if (editType === 'increment') {
          return { ...item, added: (item.added || 0) + 1 };
        } else if (editType === 'decrement') {
          if (item.added < 2) {
            signal = true
          }
          return { ...item, added: (item.added || 0) - 1 };
        }

      }

      return item
    })
    localStorage.setItem('cart', JSON.stringify(data))
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
    if (signal) {
      removeItem(id)
    }
  }


  function increment(id) {
    edit("increment", id)
  }

  function decrement(id) {
    edit("decrement", id)
  }

  function handleClear() {
    setCart([])
    localStorage.clear('cart')
  }

  function canculate() {
    let sum = cart.reduce((sum, item) => sum += item.added * item.price, 0)
    return sum.toFixed(2)
  }

  return (
    <div style={{height: "100%"}}>
      <h1>Shopping Cart</h1>
      <div className="box">
        <div className="info">
          <p>Total : ${canculate()}</p>
          <p>Mahsulot soni : {cart.reduce((count, item) => count += item.added, 0)}</p>
          <button className="clear-btn" onClick={handleClear}>Tozalash</button>
        </div>
      </div>
      <CartList data={cart} onRemove={removeItem} increment={increment} decrement={decrement} />
    </div>
  )
}

export default App
