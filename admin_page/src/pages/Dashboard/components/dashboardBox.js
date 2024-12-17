
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { HiDotsVertical } from "react-icons/hi";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from 'react-icons/io';

const DashboardBox = ({ color, icon, grow, title, fetchUrl }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const [count, setCount] = useState(0); // State lưu số lượng động

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUrl(); // Gọi hàm fetchUrl truyền từ props
                if (response?.count || response?.userCount || response?.productCount) {
                    // Kiểm tra giá trị trả về và cập nhật count tương ứng
                    setCount(response.count || response.userCount || response.productCount);
                }
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu cho ${title}:`, error);
            }
        };
        fetchData();
    }, [fetchUrl, title]);

    return (
        <Button className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${color?.[0]}, ${color?.[1]})`
        }}>
            {grow ? (
                <span className="chart"><TrendingUpIcon /></span>
            ) : (
                <span className="chart"><TrendingDownIcon /></span>
            )}
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white">{title}</h4>
                    <span className="text-white">{count}</span>
                </div>
                <div className="ml-auto">
                    {icon && <span className="icon">{icon}</span>}
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
                        <MenuItem onClick={handleClose}><IoIosTimer /> Hôm qua</MenuItem>
                        <MenuItem onClick={handleClose}><IoIosTimer /> Tuần trước</MenuItem>
                        <MenuItem onClick={handleClose}><IoIosTimer /> Tháng trước</MenuItem>
                        <MenuItem onClick={handleClose}><IoIosTimer /> Năm trước</MenuItem>
                    </Menu>
                </div>
            </div>
        </Button>
    );
};

export default DashboardBox;
