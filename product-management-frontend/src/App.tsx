import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignupPanel from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProductDetails from "./Pages/productDetails/ProductDetails";
import ProtectedRoute from "./Context/ProtectedRoute";
import { CategoriesProvider } from "./Context/CategoriesContext";
import { ProductProvider } from "./Context/productContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <CategoriesProvider>
            <Routes>
              <Route path='/' element={<SignupPanel />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='*' element={<SignupPanel />} />
              <Route
                path='/productdetails/:id'
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CategoriesProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
