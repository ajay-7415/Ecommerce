import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  About,
  Products,
  Error,
  PrivateRoute,
} from './pages'

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/Cart'>
          <Cart />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <PrivateRoute exact path='/Checkout'>
          <Checkout />
        </PrivateRoute>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />}></Route>
        <Route exact path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
