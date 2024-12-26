import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
//import { IoHomeOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { MyContext } from '../../../App';

const Navigation = () => {
    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);
    const context = useContext(MyContext);

  return (
    <nav>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-2 navPart1'>
                    <div className='catWrapper'>
                        <Button className='allCatTab align-items-center' onClick={ () =>
                            setIsOpenSidebarVal(!isOpenSidebarVal)
                        }>
                            <span className='icon1 mr-2'><IoMdMenu/></span>
                            <span className='text'>DANH MỤC</span>
                            <span className='icon2 ml-2'><FaAngleDown/></span>
                        </Button>
                        <div className={`sidebarNav ${isOpenSidebarVal=== true ? 'open' : ''} `}>
                            <ul>
                                {
                                    context.categoryData?.length !==0 && context.categoryData?.slice(0, 7).map( (item, index) => {
                                        return(
                                            <li className='list list-inline-item'>
                                                <Link to={`/subCat/${item?.name}`}><Button>{item?.name}</Button> </Link>
                                                
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-sm-10 navPart2  d-flex align-items-center'>
                    <ul className='list list-inline ml-auto'>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Home</Button> </Link>
                            
                        </li>

                        {
                            context.categoryData?.length !==0 && context.categoryData?.slice(0, 7).map( (item, index) => {
                                return(
                                    <li className='list list-inline-item'>
                                        <Link to={`/subCat/${item?.name}`}><Button>{item?.name}</Button> </Link>
                                        
                                    </li>
                                )
                            })
                        }
                    
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navigation