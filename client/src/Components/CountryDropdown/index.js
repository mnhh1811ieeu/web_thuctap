import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Dialog from '@mui/material/Dialog';
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdSearch } from 'react-icons/io';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';


const Transition = React.forwardRef(function Transition(props,ref
){
  return <Slide direction='up' ref={ref} {...props}/>
} );
const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [originalCountryList, setOriginalCountryList] = useState([]);
  const context = useContext(MyContext);
  const selectCountry = (index, country) => {
    setSelectedTab(index);
    setisOpenModal(false);
    context.setSelectedCountry(country)
  }

  useEffect( () =>{
    setCountryList(context.countryList);
    setOriginalCountryList(context.countryList);
  },[])
  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
  
    // Lọc dựa trên originalCountryList thay vì countryList đã bị thay đổi
    const filteredList = originalCountryList.filter((item) => {
      return item.country.toLowerCase().includes(keyword);
    });
    setCountryList(filteredList);
  };

  return (
    <>
        <Button className='countryDrop' onClick={ () => setisOpenModal(true)}>
            <div className='info d-flex flex-column'>
                <span className='lable'>Vị trí</span>
                <span className='name'>{ context.selectedCountry !=="" ? (context.selectedCountry.length >10 ? context.selectedCountry?.substr(0,10)+'...' : context.selectedCountry) : 'Chọn địa điểm'}</span>
            </div>  
            <span className='ml-auto'><FaAngleDown/></span>                 
        </Button>

        <Dialog  open={isOpenModal} onClose={() => setisOpenModal(false)} className='locationModel' TransitionComponent={Transition}>
          <h4 className='mb-0'>Chọn địa điểm giao hàng</h4>
          <p>Nhập địa chỉ của bạn để hiển thị các đề xuất thích hợp </p>
          <Button className='close_' onClick={ () => setisOpenModal(false)}><IoCloseCircleOutline/></Button>

          <div className='headerSearch w-100'>
              <input type='text' placeholder='Search for area . . .' onChange={filterList}/>
              <Button>
                  <IoMdSearch/>
              </Button>
          </div>
          <ul className='countryList mt-3'>
          {
            countryList?.length!==0 && countryList?.map((item, index) => {
              return(
                <li key={index}><Button  onClick={ () => selectCountry(index,item.country) } 
                  className={`${selectedTab === index ? 'active' : ''}`}
                >{item.country}</Button></li>
              )
            })
          }
            
          </ul>
        </Dialog>
    </>
   
  )
}

export default CountryDropdown