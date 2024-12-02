
import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { RiProductHuntFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { MyContext } from '../../App';
import { useContext } from 'react';




const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setisToggleSubmenu] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setisToggleSubmenu(!isToggleSubmenu);
    }

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to='/'>
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(0)}>
                            <span className="icon">
                                <LuLayoutDashboard />
                            </span>
                            Dashboard
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(1)}>
                        <span className="icon">
                            <RiProductHuntFill />
                        </span>
                        Sản phẩm
                        <span className="arrow">
                            <FaAngleRight />
                        </span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                        <ul className='submenu'>
                            <li><Link to="/product/list">Product List</Link></li>
                            <li><Link to="/product/details">Product View</Link></li>
                            <li><Link to="/product/upload">Product Upload</Link></li>
                            <li><Link to="/productSIZE/add">Thêm size sản phẩm</Link></li>
                        </ul>
                    </div>

                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(2)}>
                        <span className="icon">
                            <RiProductHuntFill />
                        </span>
                        Category
                        <span className="arrow">
                            <FaAngleRight />
                        </span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                        <ul className='submenu'>
                            <li><Link to="/category">Category List</Link></li>
                            <li><Link to="/category/add">Thêm loại sản phẩm</Link></li>
                            
                        </ul>
                    </div>

                </li>
                <li>
                    <Link to='/'>
                        <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(2)}>
                            <span className="icon">
                                <FaCartArrowDown />
                            </span>
                            Đơn hàng
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(3)}>
                            <span className="icon">
                                <MdOutlineMessage />
                            </span>
                            Tin nhắn
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(4)}>
                            <span className="icon">
                                <IoNotificationsSharp />
                            </span>
                            Thông báo
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(5)}>
                            <span className="icon">
                                <IoSettingsSharp />
                            </span>
                            Chỉnh sửa
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>

            </ul>

            <br />
            <div className='logoutWrapper'>
                <div className='logoutBox'>
                    <Button variant="contained"><IoLogOutOutline />Đăng xuất</Button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;