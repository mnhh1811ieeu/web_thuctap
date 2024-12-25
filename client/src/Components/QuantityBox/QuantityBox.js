

// import { Button } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { FaMinus } from 'react-icons/fa6';
// import { MdAdd } from "react-icons/md";

// const QuantityBox = (props) => {

//     const [inputVal, setInputVal] = useState(1);

//     const plus = () => {
//         setInputVal(inputVal + 1);
//     };

//     const minus = () => {
//         if (inputVal > 1) {
//             setInputVal(inputVal - 1);
//         }
//     };

//     useEffect(() => {

//         // Gửi giá trị inputVal lên component cha
//         props.quantity(inputVal);
//         props.selectedItem(props.item,inputVal);
      
//     }, [inputVal]); // Chạy khi inputVal thay đổi


//     return (
//         <div className='quantityDrop d-flex align-items-center'>
//             <Button onClick={minus}><FaMinus /></Button>
//             <input 
//                 type="text" 
//                 value={inputVal} 
//                 onChange={(e) => setInputVal(parseInt(e.target.value) || 1)} // Đảm bảo giá trị là số
//             />
//             <Button onClick={plus}><MdAdd /></Button>
//         </div>
//     );
// };

// export default QuantityBox;
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';

const QuantityBox = ({ initialQuantity, onQuantityChange }) => {
    const [inputVal, setInputVal] = useState(initialQuantity || 1);

    const plus = () => {
        const newValue = inputVal + 1;
        setInputVal(newValue);
        onQuantityChange(newValue);
    };

    const minus = () => {
        if (inputVal > 1) {
            const newValue = inputVal - 1;
            setInputVal(newValue);
            onQuantityChange(newValue);
        }
    };

    useEffect(() => {
        // Đảm bảo giá trị luôn cập nhật khi cha truyền xuống
        setInputVal(initialQuantity);
    }, [initialQuantity]);

    return (
        <div className="quantityDrop d-flex align-items-center">
            <Button onClick={minus}><FaMinus /></Button>
            <input
                type="number"
                value={inputVal}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setInputVal(value);
                    onQuantityChange(value);
                }}
            />
            <Button onClick={plus}><MdAdd /></Button>
        </div>
    );
};

QuantityBox.defaultProps = {
    initialQuantity: 1,
    onQuantityChange: () => {},
};

export default QuantityBox;



