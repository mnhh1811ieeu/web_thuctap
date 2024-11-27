import React from 'react';
import Button from '@mui/material/Button';
import { HiDotsVertical } from "react-icons/hi";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from 'react-icons/io';

const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Button className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            {props.grow ? (
                <span className="chart"><TrendingUpIcon /></span>
            ) : (
                <span className="chart"><TrendingDownIcon /></span>
            )}
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white">Tổng người dùng</h4>
                    <span className="text-white">277</span>
                </div>
                <div className="ml-auto">
                    {props.icon && <span className="icon">{props.icon}</span>}
                </div>
            </div>
            <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Tháng trước</h6>
                <div className="ml-auto">
                    <Button className="ml-auto toggleIcon" onClick={handleClick}>
                        <HiDotsVertical />
                    </Button>
                    <Menu
                        className='dropdown'
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <IoIosTimer />Hôm qua</MenuItem>
                        <MenuItem onClick={handleClose}>
                            <IoIosTimer />
                            Tuần trước</MenuItem>
                        <MenuItem onClick={handleClose}>
                        <IoIosTimer />
                            Tháng trước</MenuItem>
                        <MenuItem onClick={handleClose}>
                            <IoIosTimer />
                            Năm trước</MenuItem>
                    </Menu>
                </div>
            </div>
        </Button>
    );
};

export default DashboardBox;