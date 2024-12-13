import { Button } from '@mui/material';
import React,{ useState, useContext } from 'react'
import { IoMdSearch } from "react-icons/io";
import { fetchDataFromApi } from '../../../utils/api';
import { MyContext } from '../../../App';
import { useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const SearchBox = () => {

  const [searchFields, setSearchFields] = useState("");
  const [isLoading, setIsLoading] =useState(false);
  const context = useContext(MyContext);

  const history = useNavigate();

  const onChangeValue= (e) => {
    setSearchFields( e.target.value);
  }
  const searchProducts = (e) =>{
    if (!searchFields.trim()) {
      // Nếu ô tìm kiếm trống hoặc chỉ toàn khoảng trắng, không làm gì cả
      return;
    }
    
    setIsLoading(true);
    fetchDataFromApi(`/api/search?q=${searchFields}`).then( (res) => {
 
        context.setSearchData(res)
        setTimeout( () => {
          setIsLoading(false);
        }, 2000)
        
        history("/search");
    })
  }
  return (
    <div className='headerSearch ml-3 mr-3'>
        <input type='text' placeholder='Tìm kiếm sản phẩm . . .' 
          onChange={onChangeValue}/>
        <Button onClick={searchProducts}>
          {
            isLoading=== true ? <CircularProgress/> :   <IoMdSearch/>
          }
         
        </Button>
    </div>
  )
}

export default SearchBox