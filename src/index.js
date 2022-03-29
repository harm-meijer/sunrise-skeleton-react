import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Products from "./Pages/Products";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo";
import Product from "./Pages/Product";

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
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
