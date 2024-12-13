import React, { useContext } from 'react'
import logo1 from "../../assets/images/logo1.png"
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CountryDropdown from '../CountryDropdown';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { FaRegUserCircle } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        localStorage.clear();
        setAnchorEl(null);
        context.setIsLogin(false);
        setTimeout(() => {
            history("/");
        }, 1000);
    }
    const context = useContext(MyContext)
    return (
        <>
            <div className="headerWrapper" >
                <div className="top-strip bg-blue">
                    <div className="container">
                        <p className='mb-0 mt-0 text-center' style={{ color: '' }}>
                            Freeship đơn từ 45k, giảm nhiều hơn cùng <i style={{ color: 'rgb(255,183,0)' }}>FREESHIP</i>  XTRA
                        </p>
                    </div>
                </div>
                <div className='header'>
                    <div className='container'>
                        <div className='row'>
                            <div className='logoWrapper d-flex align-items-center col-sm-2'>
                                <Link to={'/'}><img src={logo1} alt='logo' style={{ paddingLeft: '35px' }} /></Link>
                            </div>
                            <div className='col-sm-10 d-flex align-items-center part2'>

                                {
                                    context.countryList.length !== 0 && <CountryDropdown />
                                }


                                <SearchBox />
                                <div className='part3 d-flex align-items-center ml-auto'>
                                    {
                                        context.isLogin !== true ? <Link to="/signIn">
                                            <Button className='account mr-3'><FaRegUserCircle /> &nbsp; Đăng nhập</Button></Link> :
                                            <>
                                                <Button className='account mr-3' onClick={handleClick}><FaRegUserCircle /> &nbsp; Tài khoản </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    slotProps={{
                                                        paper: {
                                                            elevation: 0,
                                                            sx: {
                                                                overflow: 'visible',
                                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                mt: 1.5,
                                                                '& .MuiAvatar-root': {
                                                                    width: 32,
                                                                    height: 32,
                                                                    ml: -0.5,
                                                                    mr: 1,
                                                                },
                                                                '&::before': {
                                                                    content: '""',
                                                                    display: 'block',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 14,
                                                                    width: 10,
                                                                    height: 10,
                                                                    bgcolor: 'background.paper',
                                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                                    zIndex: 0,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <Link to="/my-account">
                                                        <MenuItem onClick={handleClose}>
                                                            <Avatar /> Thông tin
                                                        </MenuItem>
                                                    </Link>
                                                    <Divider />
                                                    <Link to="/orders">
                                                        <MenuItem onClick={handleClose}>
                                                            <AddShoppingCartIcon /> &nbsp; Sản phẩm đã mua
                                                        </MenuItem>
                                                        
                                                    </Link>

                                                    <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <Settings fontSize="small" />
                                                        </ListItemIcon>
                                                        Chỉnh sửa
                                                    </MenuItem>
                                                    <MenuItem onClick={logout}>
                                                        <ListItemIcon>
                                                            <Logout fontSize="small" />
                                                        </ListItemIcon>
                                                        Đăng xuất
                                                    </MenuItem>
                                                </Menu>
                                            </>


                                    }


                                    <div className='m1-auto cartTab d-flex align-items-center'>

                                        <div className='position-relative ml-2'>
                                            <Link to="/cart"> {/* Chuyển hướng đến trang giỏ hàng */}
                                                <Button className="circle">
                                                    <BsHandbagFill />
                                                </Button>
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Navigation />

            </div>

        </>
    )
}

export default Header