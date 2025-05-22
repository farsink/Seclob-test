import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignupPanel from "./Pages/SignUppanel";
import SignIn from "./Pages/SignIn";
import ProductDetails from "./Pages/productDetails/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupPanel />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='*' element={<SignupPanel />} />
          <Route path='/productdetails' element={<ProductDetails />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
