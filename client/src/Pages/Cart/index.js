import React from 'react'

import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { CiShoppingCart } from "react-icons/ci";
import QuantityBox from '../../Components/QuantityBox/QuantityBox';

const Cart = () => {
    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Cart</h2>
                    <p>Có <b className='text-red'>3</b> sản phẩm trong giỏ hàng của bạn</p>
                    <div className='row'>
                        <div className="col-md-9 pr-5">

                            <div className="table-responsive" >
                                <table className='table' >
                                    <thead>
                                        <tr>
                                            <th width="40% ">Sản phẩm </th>
                                            <th width="17% ">Giá sản phẩm</th>
                                            <th width="15% ">Số lượng</th>
                                            <th width="18% ">Tổng đơn</th>
                                            <th width="10% ">Xóa</th>
                                        </tr>
                                    </thead>
                                </table>
                                <tbody>
                                    <tr>
                                        <td width="40%">
                                            
                                            <Link to="/product/1" >
                                                <div className="d-flex align-items-center CartItemimgWrapper">
                                                    <div className='imgWrapper'>
                                                        <img src="https://th.bing.com/th/id/R.d7dd7480c02ac7474659d71f450ac5ce?rik=9%2fEtSanFHjtVMQ&pid=ImgRaw&r=0"
                                                            className='w-100'></img>
                                                    </div>
                                                    <div className='info px-3'>
                                                        <h6> absdhasb dbahdbhash</h6>

                                                        <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="17%">
                                            700000 VND
                                        </td >
                                        <td width="15% ">
                                            <QuantityBox/>
                                        </td>
                                        <td width="20% ">
                                            700000 VND
                                        </td>
                                        <td width="8% ">
                                            <span className='remove'>
                                                <IoMdClose />
                                            </span>
                                        </td>
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td width="40%">
                                            
                                            <Link to="/product/1" >
                                                <div className="d-flex align-items-center CartItemimgWrapper">
                                                    <div className='imgWrapper'>
                                                        <img src="https://th.bing.com/th/id/R.d7dd7480c02ac7474659d71f450ac5ce?rik=9%2fEtSanFHjtVMQ&pid=ImgRaw&r=0"
                                                            className='w-100'></img>
                                                    </div>
                                                    <div className='info px-3'>
                                                        <h6>  absdhasb dbahdbhash</h6>

                                                        <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td width="17%">
                                            700000 VND
                                        </td >
                                        <td width="15% ">
                                            <QuantityBox/>
                                        </td>
                                        <td width="20% ">
                                            700000 VND
                                        </td>
                                        <td width="8% ">
                                            <span className='remove'>
                                                <IoMdClose />
                                            </span>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='card border p-3 cartDetails'>
                                <h4>Tổng giỏ hàng</h4>
                                <div className='d-flex align-items-center mb-3 '>

                                    <span>
                                        Tổng đơn hàng
                                    </span>
                                    <span className='ml-auto text-red font-weight-bold'>700000 VND</span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Phí vận chuyển
                                    </span>
                                    <span className='ml-auto  '> <b>0 VND </b></span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Áp dụng cho
                                    </span>
                                    <span className='ml-auto '><b>Bắc Giang </b></span>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <span>
                                        Tổng hóa đơn
                                    </span>
                                    <span className='ml-auto text-red font-weight-bold'>700000 VND</span>
                                </div>
                                <br />
                                <Button className="btn-blue bg-red btn-lg btn-big  ml-3"><CiShoppingCart />Thêm vào giỏ hàng</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart