import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from'@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";


import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { BsTagsFill } from "react-icons/bs";
import { IoColorPaletteSharp } from "react-icons/io5";
import { GiResize } from "react-icons/gi";
import { MdPriceCheck } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";


import LinearProgress from '@mui/material/LinearProgress';
import UserAvatarImgComponent from '../../components/userAvatarimg';



const ProductDetails = () => {


  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false
  };




  const StyledBreadcrumb = styled( Chip) ( ({ theme }) => {
    const backgroundColor = 
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return{
        backgroundColor,
        height: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
    };
});

  return (
    <div className='right-content w-50'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
                <h5 className='mb-0 '> ProductView</h5>
                <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                    <StyledBreadcrumb 
                        components="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />} />
                    <StyledBreadcrumb 
                        components="a"
                        label="Products"
                        href="#"
                        
                        />
                    <StyledBreadcrumb 
                        label="Product Upload"
                        
                        
                        />
                </Breadcrumbs>
            </div>

            <div className='card productDetailsSEction'>
              <div className='row'>
                <div className='col-md-5'>
                  <div className='sliderWrapper pt-3 pb-3 pl-4 pr-4'>
                      <h5 className='mb-3'>Product Gallery</h5>
                    <Slider {...productSliderOptions} className='sliderBig'>
                    <div className='item'>
                        <img src="https://img.lovepik.com/free-png/20210923/lovepik-t-shirt-png-image_401190202_wh1200.png" className='w-50'/>
                      </div>
                    </Slider>
                    <Slider {...productSliderSmlOptions} className='sliderSml'>
                      <div className='item'>
                        <img src="https://img.lovepik.com/free-png/20210923/lovepik-t-shirt-png-image_401190202_wh1200.png" className='w-50'/>
                      </div>
                      <div className='item'>
                        <img src="https://img.lovepik.com/free-png/20210923/lovepik-t-shirt-png-image_401190202_wh1200.png" className='w-50'/>
                      </div>
                      <div className='item'>
                        <img src="https://img.lovepik.com/free-png/20210923/lovepik-t-shirt-png-image_401190202_wh1200.png" className='w-50'/>
                      </div>
                      <div className='item'>
                        <img src="https://img.lovepik.com/free-png/20210923/lovepik-t-shirt-png-image_401190202_wh1200.png" className='w-50'/>
                      </div>
                    </Slider>
                  </div>

                </div>
                <div className='col-md-7'>
                  <div className='pt-3 pb-3 p1-4 pr-4'>
                    <h5 className='mb-3'>Product Details</h5>

                    <h3>Formal suits for men wedding slim fit 3 piece dress business party jacket</h3>

                    <div className='productInfo mt-3'>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdBrandingWatermark/></span>
                          <span className='name'>Brand</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>Bao</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><TbCategoryFilled/></span>
                          <span className='name'>Category</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>Man's</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><BsTagsFill/></span>
                          <span className='name'>Tags</span>
                        </div>
                        <div className='col-sm-7'>
                             <span>
                                <ul className='list list-inline'>
                                :  <li className='list-inline-item'>
                                      <span>SUITE</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>PARTY</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>DRESS</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>SMART</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>MAN</span>
                                  </li>
                                </ul>
                            </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoColorPaletteSharp/></span>
                          <span className='name'>Color</span>
                        </div>
                        <div className='col-sm-7'>
                          <span>
                           <ul className='list list-inline'>
                           :  <li className='list-inline-item'>
                                      <span>RED</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>BLUE</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>GREEN</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>YELLOW</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>PURPLE</span>
                                  </li>
                                </ul>
                           </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><GiResize/></span>
                          <span className='name'>Size</span>
                        </div>
                        <div className='col-sm-7'>
                          <span>
                           <ul className='list list-inline'>
                           :  <li className='list-inline-item'>
                                      <span>SM</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>MD</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>LG</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>XL</span>
                                  </li>
                                  <li className='list-inline-item'>
                                      <span>XXL</span>
                                  </li>
                                </ul>
                           </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPriceCheck/></span>
                          <span className='name'>Price</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>Bao</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><AiOutlineStock/></span>
                          <span className='name'>Stock</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>(68) Piece</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPreview/></span>
                          <span className='name'>Review</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>(03) Review</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPublishedWithChanges/></span>
                          <span className='name'>Published</span>
                        </div>
                        <div className='col-sm-7'>
                           :  <span>02 Feb 2024</span>
                        </div>
                      </div>

                      
                    </div>
                  </div>
                  

                </div>
              </div>

              <div className='p-4'>
                <h4 className='mt-4 mb-3'>Product Description</h4>
                <p>His is a classic color tone and very easy to coordinate. With that outfit, I can combine it with a pair of sneakers. 
                  I look very uplifting in that outfit. In winter I like to wear a hoodie and a long skirt. on days when the
                  temperature is too low I will put on a white jacket. Overall very nice look. </p>


                <br/>

                <h4 className='mt-4 mb-3'>Rating Analytics</h4>
                <div className='ratingSection'>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='coll' >
                      5 Start  
                    </span>

                    <div className='col2'>
                      <div className='progress'>
                        <div className='progress-bar' style = {{width: '20%'}}></div>
                      </div>
                    
                    </div>

                    <span className='col3'>
                      (22)
                    </span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='coll' >
                      4 Start  
                    </span>

                    <div className='col2'>
                      <div className='progress'>
                        <div className='progress-bar' style = {{width: '40%'}}></div>
                      </div>
                    
                    </div>

                    <span className='col3'>
                      (22)
                    </span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='coll' >
                      3 Start  
                    </span>

                    <div className='col2'>
                      <div className='progress'>
                        <div className='progress-bar' style = {{width: '70%'}}></div>
                      </div>
                    
                    </div>

                    <span className='col3'>
                      (22)
                    </span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='coll' >
                      2 Start  
                    </span>

                    <div className='col2'>
                      <div className='progress'>
                        <div className='progress-bar' style = {{width: '80%'}}></div>
                      </div>
                    
                    </div>

                    <span className='col3'>
                      (22)
                    </span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='coll' >
                      1 Start  
                    </span>

                    <div className='col2'>
                      <div className='progress'>
                        <div className='progress-bar' style = {{width: '40%'}}></div>
                      </div>
                    
                    </div>

                    <span className='col3'>
                      (22)
                    </span>
                  </div>
                </div>

                <br/>

                <h4 className='mt-4 mb-4'>Customer_reviews</h4>
                <div className='reviewSection'>
                  <div className='reviewsRow reply'>
                    <div className='row'>
                      <div className='col-sm-7'>
                        <div className='userInfo d-flex'>
                          <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                           lg = {true}/>

                           <div className='info pl-2'>
                            <h6>Nguyen Minh Hieu</h6>
                            <span>25 minutes ago!</span>
                            <div className=''>
                            <Rating name="size-medium" defaultValue={2} />
                            </div>
                           </div>
                        </div>

                        <div className='col-md-5 d-flex align-items-center'>
                          <div className='ml-auto'>
                            <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                          </div>
                        </div>

                        <p className='mt-3'>Ta đã có những hẹn ước
                            Ɛm có nhớ ngàу đó không
                            Ta vẫn cứ cố gắng chung bước
                            Ɗù phía trước là bão giông
                            Ɲên xin em đừng phản bội anh
                            Ϲho bao nhiêu nỗi đau kia thêm dài
                            Anh đau trong lòng vì nhạt phai
                            Ɛm có nghĩ mình sẽ quaу lại
                            Đường dài đường dài em đi
                            Ɲó đã có hình bóng ai rồi
                            Đêm naу em chờ đợi ai
                            Ѕao mà em lại nhắn tin nhầm</p>

                      </div>
                    </div>
                  </div>
                  <div className='reviewsRow reply'>
                    <div className='row'>
                      <div className='col-sm-7'>
                        <div className='userInfo d-flex'>
                          <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                           lg = {true}/>

                           <div className='info pl-2'>
                            <h6>Nguyen Minh Hieu</h6>
                            <span>25 minutes ago!</span>
                            <div className=''>
                            <Rating name="size-medium" defaultValue={2} />
                            </div>
                           </div>
                        </div>

                        <div className='col-md-5 d-flex align-items-center'>
                          <div className='ml-auto'>
                            <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                          </div>
                        </div>

                        <p className='mt-3'>Ta đã có những hẹn ước
                            Ɛm có nhớ ngàу đó không
                            Ta vẫn cứ cố gắng chung bước
                            Ɗù phía trước là bão giông
                            Ɲên xin em đừng phản bội anh
                            Ϲho bao nhiêu nỗi đau kia thêm dài
                            Anh đau trong lòng vì nhạt phai
                            Ɛm có nghĩ mình sẽ quaу lại
                            Đường dài đường dài em đi
                            Ɲó đã có hình bóng ai rồi
                            Đêm naу em chờ đợi ai
                            Ѕao mà em lại nhắn tin nhầm</p>

                      </div>
                    </div>
                  </div>
                  <div className='reviewsRow reply'>
                    <div className='row'>
                      <div className='col-sm-7'>
                        <div className='userInfo d-flex'>
                          <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                           lg = {true}/>

                           <div className='info pl-2'>
                            <h6>Nguyen Minh Hieu</h6>
                            <span>25 minutes ago!</span>
                            <div className=''>
                            <Rating name="size-medium" defaultValue={2} />
                            </div>
                           </div>
                        </div>

                        <div className='col-md-5 d-flex align-items-center'>
                          <div className='ml-auto'>
                            <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                          </div>
                        </div>

                        <p className='mt-3'>Ta đã có những hẹn ước
                            Ɛm có nhớ ngàу đó không
                            Ta vẫn cứ cố gắng chung bước
                            Ɗù phía trước là bão giông
                            Ɲên xin em đừng phản bội anh
                            Ϲho bao nhiêu nỗi đau kia thêm dài
                            Anh đau trong lòng vì nhạt phai
                            Ɛm có nghĩ mình sẽ quaу lại
                            Đường dài đường dài em đi
                            Ɲó đã có hình bóng ai rồi
                            Đêm naу em chờ đợi ai
                            Ѕao mà em lại nhắn tin nhầm</p>

                      </div>
                    </div>
                  </div>
                  <div className='reviewsRow reply'>
                    <div className='row'>
                      <div className='col-sm-7'>
                        <div className='userInfo d-flex'>
                          <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                           lg = {true}/>

                           <div className='info pl-2'>
                            <h6>Nguyen Minh Hieu</h6>
                            <span>25 minutes ago!</span>
                            <div className=''>
                            <Rating name="size-medium" defaultValue={2} />
                            </div>
                           </div>
                        </div>

                        <div className='col-md-5 d-flex align-items-center'>
                          <div className='ml-auto'>
                            <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                          </div>
                        </div>

                        <p className='mt-3'>Ta đã có những hẹn ước
                            Ɛm có nhớ ngàу đó không
                            Ta vẫn cứ cố gắng chung bước
                            Ɗù phía trước là bão giông
                            Ɲên xin em đừng phản bội anh
                            Ϲho bao nhiêu nỗi đau kia thêm dài
                            Anh đau trong lòng vì nhạt phai
                            Ɛm có nghĩ mình sẽ quaу lại
                            Đường dài đường dài em đi
                            Ɲó đã có hình bóng ai rồi
                            Đêm naу em chờ đợi ai
                            Ѕao mà em lại nhắn tin nhầm</p>

                      </div>
                    </div>
                  </div>
                  <div className='reviewsRow reply'>
                    <div className='row'>
                      <div className='col-sm-7'>
                        <div className='userInfo d-flex'>
                          <UserAvatarImgComponent img = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"
                           lg = {true}/>

                           <div className='info pl-2'>
                            <h6>Nguyen Minh Hieu</h6>
                            <span>25 minutes ago!</span>
                            <div className=''>
                            <Rating name="size-medium" defaultValue={2} />
                            </div>
                           </div>
                        </div>

                        <div className='col-md-5 d-flex align-items-center'>
                          <div className='ml-auto'>
                            <Button className='btn-blue btn-big btn-lg ml-auto'> &nbsp; Reply</Button>
                          </div>
                        </div>

                        <p className='mt-3'>Ta đã có những hẹn ước
                            Ɛm có nhớ ngàу đó không
                            Ta vẫn cứ cố gắng chung bước
                            Ɗù phía trước là bão giông
                            Ɲên xin em đừng phản bội anh
                            Ϲho bao nhiêu nỗi đau kia thêm dài
                            Anh đau trong lòng vì nhạt phai
                            Ɛm có nghĩ mình sẽ quaу lại
                            Đường dài đường dài em đi
                            Ɲó đã có hình bóng ai rồi
                            Đêm naу em chờ đợi ai
                            Ѕao mà em lại nhắn tin nhầm</p>

                      </div>
                    </div>
                  </div>


                </div>

                <br/>

                <h6 className='mt-4 mb-4'>Review Reply Form</h6>

                <form className="reviewForm">
                  <textarea placeholder="write here ">

                  </textarea>

                  <Button className='btn-blue btn-big btn-lg w-100 mt-4'>Drom your relies</Button>
                </form>
              </div>
            </div>
    </div>
  )
}

export default ProductDetails
