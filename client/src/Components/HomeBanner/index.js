import React from "react"
import Slider from "react-slick";
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'

const HomeBanner = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        // responsive: [
        //     {

        //     }
        // ]
      };
  return (
    <div className='homeBannerSection'>
        <div className="homeBanner">
            <Slider {...settings}>
                <div className='item'>
                    <img src={slider1} alt='1' className='w-100'/>
                </div>
                <div className='item'>
                    <img src={slider2} alt='b2' className='w-100'/>
                </div>
                <div className='item'>
                    <img src={slider3} alt='b3' className='w-100'/>
                </div>
                <div className='item'>
                    <img src={slider4} alt='b4' className='w-100'/>
                </div>
            </Slider>
        </div>
    </div>
  )
}

export default HomeBanner