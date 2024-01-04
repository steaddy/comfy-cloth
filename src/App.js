import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Navbar, Sidebar, Footer} from './components'
import {
  Home,
  About,
  Products,
  SingleProduct,
  Checkout,
  Cart,
  Error,
  Auth,
} from "./pages"
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <Auth>
      <Router>
        <Navbar/>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:id' element={<SingleProduct/>}/>
          <Route path='/checkout' element={
            <PrivateRoute>
              <Checkout/>
            </PrivateRoute>
          }/>
          <Route path='*' element={<Error/>}/>


          {/*
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/about'>
          <About/>
        </Route>
        <Route exact path='/cart'>
          <Cart/>
        </Route>
        <Route exact path='/products'>
          <Products/>
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct/>}/>
        <PrivateRoute exact path='/checkout'>
          <Checkout/>
        </PrivateRoute>
        <Route path='*'>
          <Error/>
        </Route>*/}
        </Routes>
        <Footer/>
      </Router>
    </Auth>
  );
}

export default App
