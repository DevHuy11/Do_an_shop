import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Home from "./components/body/home/Home";
import Shop from "./components/body/shop/Shop";
import Footer from "./components/footer/Footer";
import Login from "./components/body/helper/login/Login";
import Dish from "./components/body/shop/Dish";
import Header from "./components/header/Header";
import Isloading from "./components/body/isLoading/IsLoading";
import CheckoutForm from "./components/body/checkout/CheckoutForm";
import Signup from "./components/body/helper/signup/Signup";
import Cart from "./components/body/cart/Cart";

//Action---Product

import {
  getDataPizza,
  getDataSushi,
  getDataHamburger,
  getDataPancake,
  getDataDumplings,
  getDataCupcake,
  getDataChicken,
  getDataNoodle,
  getDataSalad,
} from "./features/dataCreateAsyncThunk";

import {
  getDataUser,
  getDataUserPayload,
} from "./features/dataUserCreateSlice";
import { Authorization } from "./store/AxiosLibrary";
///Action ----for User

const App = () => {
  const dispatch = useDispatch();
  const [checkAcessToken, setCheckAcessToken] = useState(false);

  const cookies = new Cookies();
  const dataaa = useSelector((state) => state);
  const pizza = useSelector((state) => state.pizza.pizza);
  const chicken = useSelector((state) => state.chicken.chicken);
  const sushi = useSelector((state) => state.sushi.sushi);
  const pancake = useSelector((state) => state.pancake.pancake);
  const hamburger = useSelector((state) => state.hamburger.hamburger);
  const salad = useSelector((state) => state.salad.salad);
  const noodle = useSelector((state) => state.noodle.noodle);
  const cupcake = useSelector((state) => state.cupcake.cupcake);
  const dumplings = useSelector((state) => state.dumplings.dumplings);

  const isReady =
    pizza !== undefined &&
    sushi !== undefined &&
    chicken !== undefined &&
    pancake !== undefined &&
    hamburger !== undefined &&
    salad !== undefined &&
    noodle !== undefined &&
    cupcake !== undefined &&
    dumplings !== undefined;

  useEffect(async () => {
    await dispatch(getDataPizza());
    await dispatch(getDataSushi());
    await dispatch(getDataHamburger());
    await dispatch(getDataPancake());
    await dispatch(getDataDumplings());
    await dispatch(getDataCupcake());
    await dispatch(getDataChicken());
    await dispatch(getDataNoodle());
    await dispatch(getDataSalad());
  }, [dispatch]);

  //Authorize
  useEffect(async () => {
    if (cookies.get("accessToken") != undefined) {
      const headers = { Authorization: "Bearer " + cookies.get("accessToken") };
      await Authorization({}, { headers: headers }).then((res) => {
        dispatch(getDataUser(res.data));
        setCheckAcessToken(true);
      });
    } else {
      setCheckAcessToken(false);
    }
  }, [dispatch]);
  console.log(checkAcessToken);

  if (!isReady) {
    return <Isloading />;
  }

  //Array
  const allData = pizza.concat(
    chicken.concat(
      sushi.concat(
        pancake.concat(
          hamburger.concat(
            salad.concat(noodle.concat(cupcake.concat(dumplings)))
          )
        )
      )
    )
  );

  return (
    <div className="App">
      <Router>
        <Header checkAcessToken={checkAcessToken} />
        <Routes>
          <Route
            exact
            path="shop"
            element={<Shop allData={allData} isReady={isReady} />}
          />
          <Route
            exact
            path="/shop/:slug"
            element={<Dish isReady={isReady} />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/checkout" element={<CheckoutForm />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
