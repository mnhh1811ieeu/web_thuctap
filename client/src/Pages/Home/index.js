import React, { useEffect, useState } from 'react'
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
import discountSec from '../../assets/images/discountSec.png'
import { fetchDataFromApi } from '../../utils/api'




const Home = () => {

  const [catData, setCatData ] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]); 
  useEffect( () => {
    fetchDataFromApi("/api/category/").then( (res) => {
      setCatData(res);
    })

    fetchDataFromApi(`/api/products/featured`).then( (res ) => {
      setFeaturedProducts(res)
      console.log('res: ',res)
    })

    fetchDataFromApi("/api/products/").then( (res) => {
      setProductsData(res);

    })
  }, [])

  
  return (
    <>
      <HomeBanner/>

      {
        catData?.length!==0 && <HomeCat catData={catData}/>
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
                  <img src={anvat1} className="cursor w-100"/>
                </div>
              </div>
            </div> 
            
            <div className='col-md-9 productRow'>
              <div className='d-flex align-items-center'>
                <div className='info w-75'>
                  <h3 className='mb-0 hd'>sản phẩm bán chạy nhất</h3>
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


              <div className='d-flex align-items-center mt-5'>
                <div className='info w-75'>
                  <h3 className='mb-0 hd'>Sản phẩm mới</h3>
                  <p className='text-light text-sml mb-0'>Sản phẩm mới đã được cập nhật trong kho của BHM.</p>
                </div>

                <Button className='viewAllBtn ml-auto'> View all <TfiAngleDoubleRight/></Button>
              </div>
              <div className='product_row productRow2 w-100 mt-4 d-flex'>
                {
                  productsData?.products?.length!==0 && productsData?.products?.map(( item, index) => {
                    return(
                      <ProductItem key={index} item={item}/>
                    )
                  })
                }

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