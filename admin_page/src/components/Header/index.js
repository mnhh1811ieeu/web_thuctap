import {useState} from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo1.png';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App';
import { useContext } from 'react';
import { MenuOpen, MenuOutlined } from '@mui/icons-material';
import UserAvatarImgComponent from '../userAvatarimg';


const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
    const openNotifications = Boolean(isOpennotificationDrop);
    const openMyAcc = Boolean(anchorEl);

    const [isLogin, setIsLogin] = useState(false);

    const context = useContext(MyContext);

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };

    const handleOpennotificationsDrop = () => {
        setisOpennotificationDrop(true);
    };
    
    const handleClosenotificationsDrop = () => {
        setisOpennotificationDrop(false);
    };

    return (
        
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        {/* Logo */}
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className="d-flex align-items-center logo">
                            <img src={logo}/>
                            <span className="ml-2">BHM</span>

                            </Link>
                        </div>

                        <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                            <Button className="rounded-circle mr-3" onClick={()=>context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                {
                                    context.isToggleSidebar === false ? <MenuOpen/> : <MenuOutlined/>
                                }
                            </Button>
                            <SearchBox/>
                        </div>

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                            <Button className="rounded-circle mr-3"><CiLight/></Button>
                            <Button className="rounded-circle mr-3" ><TiShoppingCart/></Button>
                            <Button className="rounded-circle mr-3"><MdOutlineEmail/></Button>
                            

                            <div className="dropdownWrapper position-relative">
                            <Button className="rounded-circle mr-3" onClick={handleOpennotificationsDrop}><FaRegBell/></Button>
                            <Menu
                                    anchorEl={isOpennotificationDrop}
                                    className="notifications dropdown_list"
                                    id="notifications"
                                    open={openNotifications}
                                    onClose={handleClosenotificationsDrop}
                                    onClick={handleClosenotificationsDrop}
                                    
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    
                                    <div className="head pl-3 pb-0">
                                        <h4>Order (12)</h4>
                                    </div>
                                    <Divider className="mb-1"/>

                                    <div class="scroll">
                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    
                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>


                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationsDrop}>
                                        <div className="d-flex ">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src="https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png"/>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="dropdownInfo">
                                                <h4>
                                                    <span>
                                                        <b>
                                                            Mahmudul
                                                        </b> added to his favortite list <b>Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">
                                                    few seconds ago
                                                </p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    </div>
                                    <div className="pl-3 pr-3 W-100 pt-3 pb-1">
                                        <Button className="btn-blue w-100">View all notifications</Button>
                                    </div>
                                </Menu>

                            </div>
                            {
                                context.isLogin !== true ? <Link to={'/login'}><Button className='btn-blue'>Sign In</Button></Link>
                                : 
                                
                            <div className="myAccWrapper">
                                <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                                    <div>
                                        <UserAvatarImgComponent img={'https://png.pngtree.com/png-clipart/20230825/original/pngtree-cute-little-beagle-dog-cartoon-sitting-picture-image_8725356.png'}/>
                                    </div>

                                    <div className="userInfo">
                                        <h4>BHM</h4>
                                        <p className="mb-0">@BHM79</p>
                                    </div>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={openMyAcc}
                                    onClose={handleCloseMyAccDrop}
                                    onClick={handleCloseMyAccDrop}
                                    
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    
                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    My Account
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                    <ListItemIcon>
                                        <FaShieldAlt />
                                    </ListItemIcon>
                                    Reset Password
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAccDrop}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
    );
}

export default Header;