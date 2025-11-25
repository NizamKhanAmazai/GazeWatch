import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContext from "../userContext/UserContext.jsx";
import DataContext from "../userContext/DataContext.jsx";
import ProductContext from "../userContext/ProductContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <DataContext>
          <ProductContext> 
            <App /> 
          </ProductContext>
        </DataContext>
      </UserContext>
    </BrowserRouter>
  </StrictMode>
);
