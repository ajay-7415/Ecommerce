import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import products_reducer from './products_reducer'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    console.log(maxPrice)

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state

    let tempProduct = [...filtered_products]

    if (sort === 'price-lowest') {
      tempProduct = tempProduct.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProduct = tempProduct.sort((a, b) => b.price - a.price)
    }

    if (sort === 'name-a') {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProduct }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state

    const { text, category, company, colors, price, shipping } = state.filters

    let tempProducts = [...all_products]

    if (text) {
      tempProducts = tempProducts.filter((temp) => {
        return temp.name.toLowerCase().startsWith(text)
      })
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((temp) => {
        return temp.category === category
      })
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter((temp) => {
        return temp.company === company
      })
    }
    if (colors !== 'all') {
      tempProducts = tempProducts.filter((temp) => {
        return temp.colors.find((c) => c === colors)
      })
    }

    if (shipping) {
      tempProducts = tempProducts.filter((temp) => {
        return temp.shipping === true
      })
    }

    tempProducts = tempProducts.filter((temp) => {
      return temp.price <= price
    })

    if (category !== 'all') {
      tempProducts = tempProducts.filter((temp) => {
        return temp.category === category
      })
    }

    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        colors: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  return { ...state }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
