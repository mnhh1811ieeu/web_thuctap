import React, { useContext, useRef, useState } from 'react'
import Rating from '@mui/material/Rating';
import { AiOutlineFullscreen } from "react-icons/ai";
import { Button } from '@mui/material'
import { FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { MyContext } from '../../App';


const ProductItem = (props) => {

    const [isHovered, setIsHovered] = useState(false);
    const context = useContext(MyContext);

    const sliderRef = useRef();
    

    var settings = {
        dots: true,
        infinite: true,
        loop: true,
        speed: 300,
        slidesToShow: 1,
        slideToScroll: 1,
        autoplay: true
    }
    const viewProDuctDetails = (id) => {
        context.setIsOpenProductModal(true);
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPlay();
            }
        }, 20);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }
        }, 20);
    }

    return (
        <div className={`item productItem ${props.itemView}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <div className='imgWrapper'>
                <Link to={`/product/${props.item.id}`}>
                    {
                        isHovered === true ?
                            <Slider {...settings} ref={sliderRef}>
                                {

                                    props.item?.images?.map( ( image, index) => {
                                        return (
                                            <div className='slick-slide' key={index}>
                                                <img src={image} className='w-100' />
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            // <Slider {...settings} ref={sliderRef}>
                            //     {props.item?.images?.map((image, index) => (
                            //         <div className="slick-slide" key={index}>
                            //             <img
                            //                 src={`http://localhost:${process.env.PORT || 4000}/uploads/${image}`}
                            //                 className="w-100"
                            //                 alt={`Slide ${index}`}
                            //             />
                            //         </div>
                            //     ))}
                            // </Slider>

                            :
                            <img src={props.item?.images[0]} alt="product" className='w-100' />

                    }

                </Link>
                <span className='badge badge-primary'>
                    {props.item.discount}%
                </span>
                <div className='actions' >
                    <Button onClick={() => viewProDuctDetails(1)}><AiOutlineFullscreen /></Button>
                    <Button><FaRegHeart style={{ fontSize: '20px' }} /></Button>
                </div>
            </div>

            <div className='info'>
                <Link to={'/product/1'}> <h4>{props?.item.name?.substr(0, 35) + '...'}</h4></Link>
                <span className='text-success d-block'>Có sẵn</span>
                <Rating className='mb-2 mt-2' name="read-only" value={props?.item?.rating} readOnly size='small' precision={0.5} />
                <p className='d-flex'>
                    <span className='oldPrice'>{props?.item?.oldPrice}đ</span>
                    <span className='netPrice text-danger'> &nbsp; {props?.item?.price}đ</span>
                </p>

            </div>



        </div>
    )
}

export default ProductItem