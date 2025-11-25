import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext/UserContext.jsx";
import DataContext from "./userContext/dataContext.jsx";
import ShopContext from "./userContext/ShopContext.jsx";
import OrderContext from "./userContext/OrderContext.jsx";

createRoot(document.getElementById("root")).render( 
    <BrowserRouter>
      <UserContext>
        <DataContext>
          <ShopContext>
            <OrderContext>
            <App />
            </OrderContext>
          </ShopContext>
        </DataContext>
      </UserContext>
    </BrowserRouter> 
);
