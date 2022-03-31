import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import Products from './Pages/Products';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import Product from './Pages/Product';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import SignUp from './Pages/SignUp';
import User from './Pages/User';
import Orders from './Pages/Orders';
import Cart from './Pages/Cart';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="products" element={<Products />}>
            <Route
              path=":categorySlug"
              element={<Products />}
            >
              <Route path=":page" element={<Products />} />
            </Route>
          </Route>
          <Route
            path="product/:productSlug/:sku"
            element={<Product />}
          />
          <Route path="login" element={<Login />} />
          <Route
            path="forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="reset-password/:token"
            element={<ResetPassword />}
          />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user" element={<User />}>
            <Route path="orders" element={<Orders />}>
              <Route path="page" element={<Orders />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
