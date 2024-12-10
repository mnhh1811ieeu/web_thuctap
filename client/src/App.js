import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Listing from "./Pages/Listing";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import Footer from "./Components/Footer/Footer";
import ProductModal from "./Components/ProductModal/ProductModal";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import { fetchDataFromApi } from "./utils/api";

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id: '',
    open: false,
  });
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [productData, setProductData] = useState();
  const [activeCat, setActiveCat] = useState('');
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId:""
  })
  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  })
  // useEffect( () => {
  //  //getCountry("https://esgoo.net/api-tinhthanh/1/0.htm");
  //   getCountry("https://countriesnow.space/api/v0.1/countries/");
  // }, []);

  // const getCountry =async(url) => {
  //   const responsive = await axios.get(url).then( (res) =>{
  //       setCountryList(res.data.data)
  //       console.log(res.data.data)
  //   })
  // }

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
    });
  };
  
  // Inside useEffect:
  useEffect(() => {
    getCountry("https://esgoo.net/api-tinhthanh/1/0.htm");

    fetchDataFromApi("/api/category/").then( (res) => {
      setCategoryData(res.categoryList);
      setActiveCat(res.categoryList[0]?.name)
    })
  }, []);
  
  // useEffect( () => {
  //   fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then( (res) =>{
  //     setProductData(res);
  //   })
  // }, [isOpenProductModal])
  useEffect(() => {
    if (isOpenProductModal?.id) {
        const controller = new AbortController();
        const signal = controller.signal;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "" && token !== null) {
      setIsLogin(true);
      const userData= JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin])

        fetchDataFromApi(`/api/products/${isOpenProductModal.id}`, signal)
            .then((res) => {
                setProductData(res);
                console.log(isOpenProductModal.id)
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error:', error);
                }
            });
        // Cleanup function để hủy request khi modal đóng
       return () => controller.abort();
    }
}, [isOpenProductModal]);

  const values = {
    countryList,
    setSelectedCountry,
    selectedCountry,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow,
    setIsHeaderFooterShow,
    setIsLogin,
    isLogin,
    categoryData,
    setCategoryData,
    activeCat,
    setActiveCat,
    alertBox,
    setAlertBox
  }
  return (
    <BrowserRouter >
      <MyContext.Provider value={values}>
        {
          isHeaderFooterShow === true && <Header/>
        }
        
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/subCat/:name" exact={true} element={<Listing />} />
          <Route path="/product/:id" exact={true} element={<ProductDetails/>} />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/signIn" exact={true} element={<SignIn />} />
          <Route path="/signUp" exact={true} element={<SignUp />} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer/>
        }
        {
            isOpenProductModal.open === true && <ProductModal  data={productData}/> 
        }
      </MyContext.Provider> 
    </BrowserRouter>
  );
}

export default App;
export {MyContext}