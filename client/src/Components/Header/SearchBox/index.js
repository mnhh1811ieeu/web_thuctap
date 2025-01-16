import { Button } from '@mui/material';
import React,{ useState, useContext, useEffect } from 'react'
import { IoMdSearch } from "react-icons/io";
import { fetchDataFromApi } from '../../../utils/api';
import { MyContext } from '../../../App';
import { useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { slugify } from '../../../SEOProvider';

const SearchBox = () => {

  const [searchFields, setSearchFields] = useState("");
  const [isLoading, setIsLoading] =useState(false);
  const [suggestData, setSuggestData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const context = useContext(MyContext);

  const history = useNavigate();

  const onChangeValue= (e) => {
    setSearchFields( e.target.value);
  }
  const searchProducts = (e) =>{
    if (!searchFields.trim()) {
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
    
    setSearchFields('');
    setSuggestData([]); 
    setIsFocused(false);
  }

  useEffect(() => {
    if (!searchFields.trim()) {
      setSuggestData([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetchDataFromApi(`/api/search?q=${searchFields}`);
        setSuggestData(res); // Update the suggestions list
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
      setIsLoading(false);
    };

    
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchFields, fetchDataFromApi]);

  const handleProductClick = (name, productId) => {
    //setSearchFields(""); // Xóa nội dung ô tìm kiếm
    setSuggestData([]); // Ẩn gợi ý
    history(`/product/${slugify(name)}-${productId}.html`)// Chuyển hướng đến chi tiết sản phẩm
    setIsFocused(false);
  };

  return (
    <>
    <div className='headerSearch ml-3 mr-3'>
        <input type='text' 
          placeholder='Tìm kiếm sản phẩm . . .' 
          onChange={onChangeValue} 
          value={searchFields} 
          onFocus={() => setIsFocused(true)}
          
          />
        <Button onClick={searchProducts}>
          {
            isLoading=== true ? <CircularProgress/> :   <IoMdSearch/>
          }
         
        </Button>
    </div>
    { (isFocused && searchFields.trim()) && (
        <div className="searchBox">
          <ul>
            {suggestData?.length > 0 ? (
             suggestData.map((item, index) => (
              <li key={index} onClick={() => handleProductClick(item.name,item.id)}>
                <div className="search-img">
                  {console.log(item.name+ item.id)}
                  <img src={item.images[0] || "default-image.jpg"} alt={item.name} />
                </div>
                <div className="search-content">
                  <h3 className="pro-tittle">{item.name}</h3>
                  <p>{item.price ? `${item.price}Đ` : "Unavailable"}</p>
                </div>
              </li>
            ))
            ) : (
              (searchFields.trim() && searchFields !== '') && (
                <li>
                  {console.log(searchFields)}
                  <div className="search-img"></div>
                  <div className="search-content">
                    <h3 className="pro-title">Không có thông tin</h3>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
    )}
    </>
    
  )
}

export default SearchBox