import React, { useContext, useEffect, useState } from 'react'
import HomeBanner from '../../Components/HomeBanner'
import img1 from '../../assets/images/img1.png'
import anvat1 from '../../assets/images/anvat1.png'
import { Button } from '@mui/material'
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMailOutline } from "react-icons/io5";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from '../../Components/ProductItem/ProductItem';
import HomeCat from '../../Components/HomeCat/HomeCat'
import banner2 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png'
import banner4 from '../../assets/images/banner4.png'
import discountSec from '../../assets/images/discountSec.png'
import { fetchDataFromApi } from '../../utils/api'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MyContext } from '../../App';





const Home = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedCat, setSelectedCat] = useState('váy');
  const [filterData, setFilterData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const context = useContext(MyContext);
  
  const selectCat= (cat) => {
    setSelectedCat(cat);
  }


  useEffect( () => {
    window.scrollTo(0, 0);

    //setSelectedCat( context.categoryData[0]?.name);

    fetchDataFromApi("/api/products/").then( (res) => {
      setProductsData(res);

    })
    fetchDataFromApi("/api/products/featured").then((res) => {
        setFeaturedProducts(res);
    });

    fetchDataFromApi("/api/products?perPage=8").then( (res) => {
      setProductsData(res);
    })

    

  }, [])

  useEffect( () => {
    fetchDataFromApi(`/api/products?catName=${selectedCat}`).then( (res) => {
      setFilterData(res.products);
    })
  }, [selectedCat])

  return (
    <>
      <HomeBanner/>

      {
        context.categoryData?.length!==0 && <HomeCat catData={context.categoryData}/>
      }
    

      <section className='homeProducts'>
        <div className='container'>
          <div className="row">

            <div className='col-md-3'>
              <div className='sticky'>
                <div className='banner'>
                  <img src={img1} className="cursor w-100"/>
                </div>

                <div className='banner mt-4'>
                  <img src={banner4} className="cursor w-100"/>
                </div>
              </div>
            </div> 
            
            <div className='col-md-9 productRow'>
              <div className='d-flex align-items-center'>
                <div className='info w-75'>
                  <h3 className='mb-0 hd'>sản phẩm bán chạy nhất</h3>
                  <p className='text-light text-sml mb-0'>Đừng bỏ lỡ các ưu đãi hiện tại cho đến hết tháng 12.</p>
                </div>

                <div className='ml-auto'>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className='filterTabs'
                  >
                    {
                      context.categoryData?.map( (item, index) => {
                        return(
                          <Tab className='item' label={item.name} 
                            onClick={ () => selectCat(item.name)}/>
                        )
                      })
                    }
                  </Tabs>
                </div>

              </div>
              <div className='product_row w-100 mt-4'>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={1}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                {
                  filterData?.length!==0 && filterData?.slice(0)?.reverse()?.map(( item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <ProductItem item={item}/>
                      </SwiperSlide>
                    )
                  })
                }
                </Swiper>
              </div>


              <div className='d-flex align-items-center mt-5'>
                <div className='info w-75'>
                  <h3 className='mb-0 hd'>Sản phẩm mới</h3>
                  <p className='text-light text-sml mb-0'>Sản phẩm mới đã được cập nhật trong kho của BHM.</p>
                </div>

                
              </div>

              <div className='product_row productRow2 w-100 mt-4 d-flex'>
                {
                  productsData?.products?.length!==0 && productsData?.products?.slice(0).reverse().map(( item, index) => {
                    return(
                      <ProductItem key={index} item={item}/>
                    )
                  })
                }

              </div>

              <div className='d-flex align-items-center mt-3'>
                <div className='info w-75'>
                  <h3 className='mb-0 hd'>Váy</h3>
                  <p className='text-light text-sml mb-0'>Đừng bỏ lỡ các ưu đãi hiện tại cho đến hết tháng 12.</p>
                </div>

                <Button className='viewAllBtn ml-auto'>View all <TfiAngleDoubleRight/></Button>
              </div>
              <div className='product_row w-100 mt-4'>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={1}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                {
                  featuredProducts?.length!==0 && featuredProducts?.map(( item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <ProductItem item={item}/>
                      </SwiperSlide>
                    )
                  })
                }
                </Swiper>
              </div>

              <div className='d-flex mt-4 mb-5 bannerSec'>
                <div className='banner'>
                  <img src={banner2} className="cursor w-100" alt='banner2'/>
                </div>
                <div className='banner'>
                  <img src={banner3} className="cursor w-100" alt='banner3'/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='newsLetterSection mt-3 mb-4 d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
                <p className='text-white mb-1'>Giảm 299k cho đơn đặt hàng đầu tiên của bạn</p>
                <h4 className='text-white'>Hãy tham gia với chúng tôi ...</h4>
                <p className='text-light'>Hãy tham gia đăng ký email của chúng tôi ngay bây giờ để nhận thông tin cập nhật về các chương trình khuyến mãi và phiếu giảm giá.</p>

                <form>
                  <IoMailOutline />
                  <input type='text' placeholder='Email của bạn'/>
                  <Button>Đăng kí</Button>
                </form>


            </div>


            <div className='col-md-6'>
              <img src={discountSec} alt="anh discount" />
            </div>
          </div>
        </div>

      </section>

      
    </>
  )
}

export default Home