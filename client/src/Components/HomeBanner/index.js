import React from "react"
import Slider from "react-slick";

const HomeBanner = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        
      };
  return (
    <div className='homeBannerSection'>
        <div className="homeBanner">
            <Slider {...settings}>
                <div className='item'>
                    <img src="https://cotton4u.vn/files/news/2024/11/01/b0bbefc32189310f4def5fe56d26d7ba.webp" alt='1' className='w-100'/>
                </div>
                <div className='item'>
                    <img src="https://cotton4u.vn/files/news/2024/10/29/0b318663e0d9258d09c666643c1b133f.webp" alt='b2' className='w-100'/>
                </div>
                <div className='item'>
                    <img src="https://cotton4u.vn/files/news/2024/10/22/804e2a9952aafadd412814817f01da87.webp" alt='b3' className='w-100'/>
                </div>
                <div className='item'>
                    <img src="https://cotton4u.vn/files/news/2024/10/30/aea806dab6ac05647f4514fe408ec924.webp" alt='b4' className='w-100'/>
                </div>
            </Slider>
        </div>
    </div>
  )
}

export default HomeBanner