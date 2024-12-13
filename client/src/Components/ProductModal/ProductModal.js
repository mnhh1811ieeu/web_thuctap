import { Rating } from '@mui/material';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import React, { useContext , useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import QuantityBox from '../QuantityBox/QuantityBox';
import { FaRegHeart } from "react-icons/fa";
import { MyContext } from '../../App';
import ProductZoom from '../ProductZoom/ProductZoom';

const ProductModal = (props) => {

    const context = useContext(MyContext);
    let [productQuantity, setProductQuantity] = useState();

    const quantity = (val) => {
        setProductQuantity(val)
    }
    const selectedItem=()=>{

    }

  return (
    <>
        <Dialog className='productModal' open={context.isOpenProductModal} onClose={ () => context.setIsOpenProductModal(false)}>
           
            <Button className='close_' onClick={() =>
                context.setIsOpenProductModal(false)}><IoCloseCircleOutline/>
            </Button>
            <h4 className='mb-1 font-weight-bold'>{props?.data?.name}</h4>
            <div className='d-flex align-items-center mr-4'>
                <div className='d-flex align-items-center mr-4'>
                    <span>Brand:</span>
                    <span className='ml-2'><b>{props?.data?.brand}</b></span>
                </div>
                <Rating name='read-only' value={parseInt(props.data?.rating)} size="small" precision={0.5} readOnly />
                
            </div>
            <hr/>
            <div className='row mt-2 productDetailModal'>
                <div className='col-md-5'>
                    <ProductZoom images={props?.data?.images} discount={props?.data?.discount}/>
                </div>

                <div className='col-md-7'>
                    <div className='d-flex info align-items-center'>
                        <span className='oldPrice lg mr-2'>{props?.data?.oldPrice}</span>
                        <span className='netPrice text-danger lg'>{props?.data?.price}</span>
                    </div>

                    <span className='badge bg-success mt-2'>In stock</span>

                    <p className='mt-2'>{props?.data?.description}</p>

                    <div className='d-flex align-items-center'>
                        <QuantityBox quantity={quantity} selectedItem={selectedItem}/>

                        <Button className='btn-blue btn-lg btn-big btn-round'>Add to cart</Button>
                    </div>


                    <div className='d-flex align-items-center mt-3 actions'>
                        <Button className='btn-round btn-sml' variant="outlined"><FaRegHeart/> &nbsp; ADD TO WISHLIST</Button>
                    </div>
                    


                </div>
            </div>
            
        </Dialog>
    </>
  )
}

export default ProductModal