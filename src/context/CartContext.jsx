import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([])
  // console.log(cartItem)

  ////////////////////////////////////////////

  // const unicProducts = cartItem.reduce((acc, cartProd, i, self) => {
  //   // console.log(i)
  //   console.log(acc[i].title)
  //   // if (self.indexOf(cartProd) !== i && acc.indexOf(cartProd) === -1) acc.push(cartProd)
  //   // return acc
  //   // return acc
  // }, [])
  // console.log(unicProducts)

  ///////////////////////////////////////////////

  const addToCart = (product, quantity = 1) => {
    let productsArr = []
    console.log(product)
    if (!product.length) {
      // const quantity = product.quantity
      console.log(quantity)
      const itemInCart = cartItem.find((item) => item.id === product.id)
      // console.log(itemInCart)
      if (itemInCart) {
        // console.log('ok')
        // Increase quantity if already in cart
        const updatedCart = cartItem.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
        setCartItem(updatedCart)
        toast.success('Product quantity increased!')
      } else {
        //Add new item with quantity
        // console.log(product)
        // setCartItem([...cartItem, product])
        toast.success('Product is added to cart!')
        setCartItem([...cartItem, { ...product, quantity: quantity }])
      }
    } else {
      // случай когда приходит массив продуктов
      productsArr = product
      // console.log(productsArr)
      setCartItem([...cartItem, ...productsArr])
    }

    //----------------------------------------------------------

    // const quantity = product.quantity
    // const itemInCart = cartItem.find((item) => item.id === product.id)
    // // console.log(itemInCart)
    // if (itemInCart) {
    //   // console.log('ok')
    //   // Increase quantity if already in cart
    //   const updatedCart = cartItem.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
    //   setCartItem(updatedCart)
    //   // toast.success("Product quantity increased!")
    // } else {
    //   //Add new item with quantity
    //   // console.log(product)
    //   setCartItem([...cartItem, product])
    //   // setCartItem([...cartItem, { ...product, quantity: quantity }])
    // }

    // productsArr = product
    // // console.log(productsArr)
    // setCartItem([...cartItem, ...productsArr])
  }

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity
            if (action === 'increase') {
              newUnit = newUnit + 1
              toast.success('Quantity is increased!')
            } else if (action === 'decrease') {
              newUnit = newUnit - 1
              toast.success('Quantity is decreased!')
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null
          }
          return item
        })
        .filter((item) => item != null), // remove item qunatity 0
    )
  }

  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId))
    toast.success('Product is deleted from cart!')
  }

  return <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}>{children}</CartContext.Provider>
}

export default CartContext
