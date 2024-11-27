import { Button } from '@mui/material'
import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
//import { IoHomeOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";

const Navigation = () => {
    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);


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
                                <li className=''>
                                    <Link to="/"><Button>Home<FaAngleRight className='ml-auto'/></Button></Link>
                                    <div className='submenu'>
                                        <Link to="/"><Button>Home</Button> </Link>
                                        <Link to="/"><Button>Home</Button> </Link>
                                        <Link to="/"><Button>Home</Button> </Link>                     
                                    </div>
                                </li>
                                <li className=''>
                                    <Link to="/"><Button>Men<FaAngleRight className='ml-auto'/></Button></Link>
                                    <div className='submenu'>
                                        <Link to="/"><Button>Home</Button> </Link>
                                        <Link to="/"><Button>Home</Button> </Link>
                                        <Link to="/"><Button>Home</Button> </Link>                     
                                    </div>
                                </li>
                                <li className=''>
                                    <Link to="/"><Button>Women</Button> </Link>
                                </li>
                                <li className=''>
                                    <Link to="/"><Button>Kids</Button> </Link>
                                </li>
                                <li className=''>
                                    <Link to="/"><Button>Watches</Button> </Link>
                                </li>
                                <li className=''>
                                    <Link to="/"><Button>Beauty</Button> </Link>
                                </li>
                            
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-sm-10 navPart2  d-flex align-items-center'>
                    <ul className='list list-inline ml-auto'>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Home</Button> </Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Men</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Women</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Kids</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Beauty</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Watches</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Blog</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        <li className='list list-inline-item'>
                            <Link to="/"><Button>Contact</Button></Link>
                            <div className='submenu shadow'>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                                <Link to="/"><Button>Home</Button> </Link>
                            </div>
                        </li>
                        
                    </ul>
                </div>                  
            </div>
        </div>
    </nav>
  )
}

export default Navigation