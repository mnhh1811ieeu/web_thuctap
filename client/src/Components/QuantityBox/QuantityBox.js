
// import { Button } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { FaMinus } from 'react-icons/fa6'
// import { MdAdd } from "react-icons/md";

// const QuantityBox = (props) => {

//     const [inputVal, setInputVal] = useState(1);
//     const plus = () => {
//         setInputVal(inputVal+1);
//     }
//     const minus = () => {
//         if( inputVal > 1)
//         {
//             setInputVal(inputVal - 1);
//         }
//     }

//     useEffect(() => {
//         props.quantity(inputVal)
//     }, inputVal);

//   return (
//     <div className='quantityDrop d-flex align-items-center'>
//         <Button onClick={minus}><FaMinus/></Button>
//         <input type="text" value={inputVal}/>
//         <Button onClick={plus}><MdAdd/></Button>
//     </div>
//   )
// }

// export default QuantityBox


import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa6';
import { MdAdd } from "react-icons/md";

const QuantityBox = (props) => {

    const [inputVal, setInputVal] = useState(1);

    const plus = () => {
        setInputVal(inputVal + 1);
    };

    const minus = () => {
        if (inputVal > 1) {
            setInputVal(inputVal - 1);
        }
    };

    useEffect(() => {

        // Gửi giá trị inputVal lên component cha
        props.quantity(inputVal);
        props.selectedItem(props.item,inputVal);
      
    }, [inputVal]); // Chạy khi inputVal thay đổi


    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button onClick={minus}><FaMinus /></Button>
            <input 
                type="text" 
                value={inputVal} 
                onChange={(e) => setInputVal(parseInt(e.target.value) || 1)} // Đảm bảo giá trị là số
            />
            <Button onClick={plus}><MdAdd /></Button>
        </div>
    );
};

export default QuantityBox;
