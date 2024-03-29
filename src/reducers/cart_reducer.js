import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)
    console.log(tempItem)
    if (tempItem) {
      const tempCart = state.cart.map((cartitem) => {
        if (cartitem.id === id + color) {
          let newAmount = cartitem.amount + amount
          if (newAmount > cartitem.max) {
            newAmount = cartitem.max
          }
          return { ...cartitem, amount: newAmount }
        } else {
          return cartitem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempcart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempcart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempcart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount <= 0) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } else {
        return item
      }
    })
    return { ...state, cart: tempcart }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item
        total.total_items += amount
        total.total_amount += price * amount

        return total
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    )
    return { ...state, total_items, total_amount }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
