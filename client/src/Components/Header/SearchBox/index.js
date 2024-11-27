import { Button } from '@mui/material';
import React from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchBox = () => {
  return (
    <div className='headerSearch ml-3 mr-3'>
        <input type='text' placeholder='Tìm kiếm sản phẩm . . .'/>
        <Button>
            <IoMdSearch/>
        </Button>
    </div>
  )
}

export default SearchBox