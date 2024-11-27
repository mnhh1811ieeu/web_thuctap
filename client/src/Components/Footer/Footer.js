import React from 'react'
import { IoShirtOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <footer>
        <div className='container'>
            <div className='topInfo row'>
                <div className='col d-flex align-items-center'>
                    <span><IoShirtOutline /></span>
                    <span className='ml-2 '>Everyday fresh product</span>
                </div>
                <div className='col d-flex align-items-center'>
                    <span><TbTruckDelivery /></span>
                    <span className='ml-2 '>Free delivery for oder over $70</span>
                </div>
                <div className='col d-flex align-items-center'>
                    <span><BiSolidDiscount /></span>
                    <span className='ml-2 '>Daily mega discounts</span>
                </div>
                <div className='col d-flex align-items-center'>
                    <span><FaSackDollar /></span>
                    <span className='ml-2 '>Best price or on the market</span>
                </div>
            </div>

            <hr/>

            <div className='row mt-5 linksWrap'>
                <div className='col'>
                    <h5>Hỗ trợ khách hàng</h5>
                    <ul>
                        <li><Link to='#'>Câu hỏi thường gặp</Link></li>
                        <li><Link to='#'>Gửi yêu cầu hỗ trợ</Link></li>
                        <li><Link to='#'>Hướng dẫn đặt hàng</Link></li>
                        <li><Link to='#'>Phương thức vận chuyển</Link></li>
                        <li><Link to='#'>Chính sách đổi trả</Link></li>
                        <li>Hỗ trợ khách hàng:<Link to='#'> hotro@hbm.vn</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>Về HBM</h5>
                    <ul>
                        <li><Link to='#'>Giới thiệu </Link></li>
                        <li><Link to='#'>HBM blog</Link></li>
                        <li><Link to='#'>Chính sách bảo mật</Link></li>
                        <li><Link to='#'>Tiếp thị liên kết</Link></li>
                        <li><Link to='#'>Bán hàng doanh nghiệp</Link></li>
                        <li><Link to='#'>Điều kiện vận chuyển</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>Hợp tác và liên kết</h5>
                    <ul>
                        <li><Link to='#'>Quy chế sàn TMĐT</Link></li>
                        <li><Link to='#'>Hợp tác cùng HBM</Link></li>
                    </ul>

                    <h5> Chứng nhận bởi</h5>
                </div>
                <div className='col'>
                    <h5>Phương thức thanh toán</h5>
                    <ul>
                        
                    </ul>
                </div>
                <div className='col'>
                    <h5>Kết nối với chúng tôi</h5>
                    <ul style={{ display: 'flex', marginLeft:'15px'}}>
                        <li className='facebook'><Link to='#'><FaFacebook/></Link></li>
                        <li className='youtube'><Link to='#'><FaYoutube/></Link></li>
                        <li className='zalo'><Link to='#'><SiZalo/></Link></li>
                    </ul>
                </div>
    
            </div>

            <hr/>

            <div style={{ }}>
                    <h5 style={{fontWeight: 'bold'}}>Danh mục sản phẩm</h5>
            </div>
            <div className='row mt-4 linksWrap'>
                
                <div className='col'>
                    <h6>Trái cây & Rau củ</h6>
                    <ul>
                        <li><Link to='#'>Rau tươi</Link></li>
                        <li><Link to='#'>Gia vị và thảo mộc</Link></li>
                        <li><Link to='#'>Trái cây tươi</Link></li>
                        <li><Link to='#'>Sản phẩm đóng gói</Link></li>
                        <li><Link to='#'>Trái cây và rau củ độc lạ</Link></li>
                        <li><Link to='#'>Khay tiệc</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h6>Bữa sáng & Dairy</h6>
                    <ul>
                        <li><Link to='#'>Sữa </Link></li>
                        <li><Link to='#'>Bơ động-thực vật</Link></li>
                        <li><Link to='#'>Phô mai</Link></li>
                        <li><Link to='#'>Mật ong</Link></li>
                        
                        <li><Link to='#'>Kem chua, nước chấm</Link></li>
                        <li><Link to='#'>Sữa chua</Link></li>
                        <li><Link to='#'>Mứt</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h6>Thịt & Thủy sản</h6>
                    <ul>
                        <li><Link to='#'>Xúc xích</Link></li>
                        <li><Link to='#'>Thịt bò </Link></li>
                        <li><Link to='#'>Thịt gà</Link></li>
                        <li><Link to='#'>Thịt nguội thái lát</Link></li>
                        <li><Link to='#'>Tôm </Link></li>
                        <li><Link to='#'>Cua và hải sản</Link></li>
                        <li><Link to='#'>Cá Fillet tự nhiên</Link></li>
                    </ul>
              
                </div>
                <div className='col'>
                    <h6>Đồ uống</h6>
                    <ul>
                        <li><Link to='#'>Nước</Link></li>
                        <li><Link to='#'>Nước khoáng</Link></li>
                        <li><Link to='#'>Nước ngọt & Soda</Link></li>
                        <li><Link to='#'>Cà phê</Link></li>
                        <li><Link to='#'>Trà & Kombucha</Link></li>
                        <li><Link to='#'>Hộp & Túi đồ uống</Link></li>
                        <li><Link to='#'>Bia thủ công</Link></li>
                        <li><Link to='#'>Rượu vang</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h6>Bánh mì & Tiệm bánh</h6>
                    <ul>
                        <li><Link to='#'>Bánh mì tươi</Link></li>
                        <li><Link to='#'>Bánh mì gói</Link></li>
                        <li><Link to='#'>Phô mai</Link></li>
                        <li><Link to='#'>Trứng gà, vịt</Link></li>
                        <li><Link to='#'>Mật ong</Link></li>
                        <li><Link to='#'>Sữa & sản phẩm hương vị sữa</Link></li>
                        <li><Link to='#'>Bông lan</Link></li>
                        <li><Link to='#'>Bánh Sandwich</Link></li>
                    </ul>
                </div>
               
            </div>    

        </div>    

    <br/>
    <br/>
    </footer>
    
  )
}

export default Footer