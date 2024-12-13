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
import Checkout from "./Pages/Checkout";
import { fetchDataFromApi} from "./utils/api";
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import PaymentSuccess from "./Pages/Payment Success/paymentsuccess";
const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id: '',
    open: false
  });
  const [productData, setProductData] = useState();

  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
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
      console.log(res.data.data);
    });
  };
  
  // Inside useEffect:
  useEffect(()=> {
    isOpenProductModal.open === true &&
    fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
      setProductData(res);
    })
  }, [isOpenProductModal]);

  useEffect(() => {
    getCountry("https://esgoo.net/api-tinhthanh/1/0.htm");
  }, []);
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

  // const addtoCart=(data)=> {
  //   // console.log(data)
  //   postData(`/api/cart/add`, data).then((res) => {
  //     if(res!==null && res!==undefined && res!==""){
  //       setAlertBox({
  //         open: true,
  //         error: false,
  //         msg: "San pham da duoc them vao gio hang"
  //       })
  //     }
  //   })
  // }

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
    alertBox,
    setAlertBox,
    // addtoCart,
    cartFields,
    setCarFields
  }
  return (
    <BrowserRouter >
      <MyContext.Provider value={values}>
        {
          isHeaderFooterShow === true && <Header/>
        }
        
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cat/:id" exact={true} element={<Listing />} />
          <Route path="/product/:id" exact={true} element={<ProductDetails/>} />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/signIn" exact={true} element={<SignIn />} />
          <Route path="/signUp" exact={true} element={<SignUp />} />
          <Route path="/checkout" exact={true} element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer/>
        }
        {
            isOpenProductModal.open === true && <ProductModal data = {productData}/> 
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
      </MyContext.Provider> 
    </BrowserRouter>
  );
}

export default App;
export {MyContext}