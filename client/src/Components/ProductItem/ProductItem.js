import React, { useContext, useState } from 'react'
import Rating from '@mui/material/Rating';
import { AiOutlineFullscreen } from "react-icons/ai";
import { Button } from '@mui/material'
import { FaRegHeart } from "react-icons/fa6";

import { MyContext } from '../../App';

const ProductItem = (props) => {

    const context = useContext(MyContext);
    
    const viewProDuctDetails = (id) => {
        context.setIsOpenProductModal(true)  ;
    }
  
  return (
    <div className={`item productItem ${props.itemView}`}>

        <div className='imgWrapper'>
            <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/11/01/e9b367bd716189438ba8ca65572ebf5f.webp" alt="" className='w-100'/>
            <span className='badge badge-primary'>
                28%
            </span>
            <div className='actions' >
                <Button onClick={() => viewProDuctDetails(1) }><AiOutlineFullscreen/></Button>
                <Button><FaRegHeart style={{ fontSize: '20px'}} /></Button>
            </div>
        </div>

        <div className='info'>
            <h4>Áo vest Tuysi You Beige</h4>
            <span className='text-success d-block'>Có sẵn</span>
            <Rating className='mb-2 mt-2' name="read-only" value={5} readOnly size='small' precision={0.5}/>
            <p className='d-flex'>
                <span className='oldPrice'>3.000.000đ</span>
                <span className='netPrice text-danger'> &nbsp; 1.999.000đ</span>
            </p>

        </div>


       

    </div>
  )
}

export default ProductItem