import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import React, { useEffect, useState, useRef } from 'react';
import { createContext } from 'react';
import SignUp from './pages/SignUp';
import ProductUpload from './pages/ProductUpload';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CategoryAdd from './pages/CategoryAdd';
import Category from './pages/Category';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from 'react-top-loading-bar'
import Editproduct from './pages/Products/proEdit';
import { fetchDataFromApi } from './utils/api';
import AddProductSIZE from './pages/Products/addProductSIZE';

const MyContext = createContext();


function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId:""
  })
  const [isHideSiderbarAndHeader, setisHideSiderbarAndHeader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [catData, setCatData] = useState([]);
  const [baseUrl, setBaseUrl] = useState("http://localhost:4000");
  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  })
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
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSiderbarAndHeader,
    setisHideSiderbarAndHeader,
    alertBox,
    setAlertBox,
    setProgress,
    baseUrl,
    catData,
    setUser,
    user
    //   fetchCategory,
  }
  // const fetchCategory=() => {
  //   fetchDataFromApi('/api/category/').then((res) => {
  //     setCatData(res);
  //     setProgress(100);
  //   })
  // }

  useEffect(() => {
    setProgress(20);
    fetchDataFromApi('/api/category/').then((res) => {
      setCatData(res);
      setProgress(100);
    })
  }, [])
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

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className='topLoadingBar'
        />
        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {
          isHideSiderbarAndHeader !== true && <Header />
        }

        <div className="main d-flex">
          {
            isHideSiderbarAndHeader !== true &&
            <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          }


          <div className={`content ${isHideSiderbarAndHeader === true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />

              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signup" exact={true} element={<SignUp />} />
              <Route path="/product/upload" exact={true} element={<ProductUpload />} />
              <Route path="/product/list" exact={true} element={<Products />} />
              <Route path="/product/details" exact={true} element={<ProductDetails />} />
              <Route path="/category/add" exact={true} element={<CategoryAdd />} />
              <Route path="/category" exact={true} element={<Category />} />
              <Route path="/product/edit/:id" exact={true} element={<Editproduct />} />
              <Route path="/productSIZE/add" exact={true} element={<AddProductSIZE />} />
              {/* <Route path="/productSIZE/list" exact={true} element={<AddProductSIZE/>}/> */}
            </Routes>
          </div>

        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };