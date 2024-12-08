import React, { useContext, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'; 
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

const Sidebar = (props) => {
  const [value, setValue] = useState([100, 60000000]);
  const [ value2, setValue2] =useState(0);
  const context = useContext(MyContext);
  const [cateName, setCateName]= useState(''); 

  const [filterCat, setFilterCat] = React.useState('female');

  const {name} =useParams();

  const handleChange = (event) => {
    setFilterCat(event.target.value);
    props.filterData(event.target.value)
    setCateName(event.target.value)
  };

  useEffect( () => {
    setCateName(name)
  }, [name])

  useEffect( () => {
    props.filterByPrice(value, cateName)
  }, [value])

  const filterByRating= (rating ) => {
    props.filterByRating(rating, cateName)
  }

  // const getNameRate = () => {
  //   // Ưu tiên lấy cateName nếu có giá trị
  //   return cateName || name;
  // };

  return (
    <>
    <div className='sidebar'>
      
        <div className='filterBox'>
            <h6>PRODUCT CATEGORIES</h6>

            <div className='scroll'>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filterCat}
              onChange={handleChange}
            >
              {
                  context.categoryData?.length !==0 && context.categoryData?.map( (item, index) => {
                      return(
                        <FormControlLabel value={item?.name} control={<Radio />} label={item?.name}  />
                      )
                  })
              }
              
            </RadioGroup>
            </div>
        </div>


        <div className='filterBox'>
          <h6>Mức Giá</h6>


          <RangeSlider value={value} onInput={setValue} min={100} max={60000000} step={5} />

          <div className='d-flex pt-2 pb-2 priceRange'>
            <span>
              Từ: <strong className='text-dark'>{value[0]}Đ</strong> 
            </span>
            <span className='ml-auto'>
              Đến: <strong className='text-dark'>{value[1]}Đ</strong></span>
          </div>


        </div>

        <div className='filterBox'>
            <h6>BRANDS</h6>

            <div className='scroll'>
              
                <Button onClick={ () => filterByRating(5)}><Rating name="read-only" value={5} readOnly size="small"/></Button>
                <Button onClick={ () => filterByRating(4)}><Rating name="read-only" value={4} readOnly size="small"/></Button>
                <Button onClick={ () => filterByRating(3)}><Rating name="read-only" value={3} readOnly size="small"/></Button>
                <Button onClick={ () => filterByRating(2)}><Rating name="read-only" value={2} readOnly size="small"/></Button>
                <Button onClick={ () => filterByRating(1)}><Rating name="read-only" value={1} readOnly size="small"/></Button>

            </div>
        </div>

        
      
    </div>
    </>
  )
}

export default Sidebar