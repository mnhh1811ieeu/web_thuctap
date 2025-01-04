import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
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
import Orders from "./Pages/Orders";
import SearchPage from "./Pages/Search";
import MyAccount from "./Pages/MyAccount"
import Checkout from "./Pages/Checkout";
import { fetchDataFromApi} from "./utils/api";
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import PaymentSuccess from "./Pages/Payment Success/paymentsuccess";
import TawkWidget from "./Components/chat/chat";  // Import chat widget

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id: '',
    open: false
  });
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const handleClose = (
    event,
    reason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false,

    });
  };
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



  let [cartFields, setCarFields] = useState([]);
  
  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
    });
  };

  useEffect(() => {
    getCountry("https://esgoo.net/api-tinhthanh/1/0.htm");

    fetchDataFromApi("/api/category/").then( (res) => {
      setCategoryData(res.categoryList);
      setActiveCat(res.categoryList[0]?.name)
    })
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, []);  // Chạy chỉ 1 lần khi component mount

  useEffect(() => {
    if (isOpenProductModal?.id) {
      const controller = new AbortController();
      const signal = controller.signal;

      fetchDataFromApi(`/api/products/${isOpenProductModal.id}`, signal)
        .then((res) => {
          setProductData(res);
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Fetch error:', error);
          }
        });

      return () => controller.abort(); // Cleanup khi modal đóng
    }
  }, [isOpenProductModal]);
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
 
  useEffect(() => {
    if (isOpenProductModal?.id) {
        const controller = new AbortController();
        const signal = controller.signal;

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
    setAlertBox,
   
    cartFields,
    setCarFields,
    setSearchData,
    searchData
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
          <Route path="/orders" exact={true} element={<Orders />} />
          <Route path="/search" exact={true} element={<SearchPage />} />
          <Route path="/my-account" exact={true} element={<MyAccount />} />


          <Route path="/checkout" exact={true} element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer/>
        }
        {
            isOpenProductModal.open === true && <ProductModal  data={productData}/> 
        }

<Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {isLogin && <TawkWidget />}  {/* Render TawkWidget chỉ khi người dùng đã đăng nhập */}

      </MyContext.Provider> 
    </BrowserRouter>
  );
}

export default App;
export {MyContext}