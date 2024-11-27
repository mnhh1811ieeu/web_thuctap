
import React, { useState, useRef, useEffect, useContext } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";
import { fetchDataFromApi, postData, postDataProduct } from '../../utils/api';
import { FaRegImages } from 'react-icons/fa';
import { FaD } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
    };
});

const ProductUpload = () => {
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [categoryVal, setCategoryVal] = useState('');
    const [ratingsValue, setRatingValue] = useState(1);
    const context = useContext(MyContext);
    const formdata = new FormData();
    const history = useNavigate();
    const [files, setFiles] = useState([]);
    const [imgFiles, setimgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        // images: [],
        brand: '',
        price: null,
        oldPrice: null,
        category: '',
        countInStock: null,
        rating: 0,
        isFeatured: null,
    })
    const [isFeaturedValue, setisFeaturedValue] = useState('');
    const handleChangeisFeaturedValue = (event) => {
        setisFeaturedValue(event.target.value);
        setFormFields(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    };
    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            setimgFiles(e.target.files);
            for (var i = 0; i < files.length; i++) {
                const file = files[i];
                imgArr.push(file);
                formdata.append(`images`, file);
            }
            setFiles(imgArr);
            // sửa chỗ này
            postDataProduct(apiEndPoint, formdata).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error)
        }
    }
    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }
    const [isLoading, setIsLoading] = useState(false);
    const productImages = useRef();
    const imagesArr = [];
    const [catData, setCatData] = useState([]);
    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            category: event.target.value
        }))
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);

        fetchDataFromApi('/api/category/').then((res) => {


            setCatData(res);
            context.setProgress(100);
        })

    }, []);
    useEffect(() => {
        console.log('Old Price:', formFields.oldPrice);
    }, [formFields.oldPrice]);

    useEffect(() => {
        if (!imgFiles) return;
        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }
        const objectUrls = tmp;
        setPreviews(objectUrls);
        //free memory
        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    }, [imgFiles])

    const addProductImages = () => {

        setproductImagesArr(prevArray => [...prevArray, productImages.current.value]);
        productImages.current.value = "";

    }
    const addProduct = (e) => {
        e.preventDefault();

        formdata.append('name', formFields.name);
        formdata.append('description', formFields.description);
        formdata.append('brand', formFields.brand);
        formdata.append('price', formFields.price);
        formdata.append('oldPrice', formFields.oldPrice);
        formdata.append('category', formFields.category);
        formdata.append('countInStock', formFields.countInStock);
        formdata.append('rating', formFields.rating);
        formdata.append('isFeatured', formFields.isFeatured);
        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền tên sản phẩm",
                error: true
            });

            return false;
        };
        if (formFields.brand === "") {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền hãng",
                error: true
            });
            return false;
        };
        if (formFields.description === "") {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền mô tả sản phẩm",
                error: true
            });
            return false;
        };
        if (formFields.price === null) {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền giá sản phẩm",
                error: true
            });
            return false;
        };
        if (formFields.oldPrice === null) {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền giá cũ sản phẩm",
                error: true
            });
            return false;
        };
        if (formFields.category === "") {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu chọn loại sản phẩm",
                error: true
            });
            return false;
        };
        if (formFields.countInStock === null) {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu điền số sản phẩm",
                error: true
            });
            return false;
        };
        if (formFields.rating === 0) {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu chọn số sao",
                error: true
            });
            return false;
        };
        if (formFields.isFeatured === null) {
            context.setAlertBox({
                open: true,
                msg: "Yêu cầu chọn có yt k",
                error: true
            });
            return false;
        };
        // if (formFields.images.length === 0) {
        //     context.setAlertBox({
        //         open: true,
        //         msg: "Yêu cầu thêm ảnh",
        //         error: true
        //     });
        //     return false;
        // };
        setIsLoading(true);
        postData('/api/products/create', formFields).then((res) => {
            context.setAlertBox({
                open: true,
                msg: 'Đã tạo sản phẩm thành công',
                error: false
            });
            setIsLoading(false);
            setFormFields({
                name: '',
                description: '',
                images: [],
                brand: '',
                price: 0,
                oldPrice: 0,
                category: '',
                countInStock: 0,
                rating: 0,
                isFeatured: false,
            });
            history('/product/list');
            // return true;
        })

    }
    return (
        <>
            <div className='right-content w-100'>
                <div className='card shadow border-0 w-100 flex-row p-4'>
                    <h5 className='mb-0 '> ProductUpload</h5>
                    <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                        <StyledBreadcrumb
                            components="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />} />
                        <StyledBreadcrumb
                            components="a"
                            label="Products"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Product Upload"

                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addProduct}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4'>
                                <h5 className='text-white mb-4'> basic</h5>

                                <div className='form-group'>
                                    <h6> Tên</h6>
                                    <input type='text' name="name" value={formFields.name} onChange={inputChange} />
                                </div>

                                <div className='form-group'>
                                    <h6> Mô tả</h6>
                                    <textarea rows={5} cols={10} name="description" value={formFields.description} onChange={inputChange} />
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Category</h6>

                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em></MenuItem>
                                                {
                                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat, index) => {
                                                        return (
                                                            <MenuItem value={cat.id} key={index}>{cat.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Brand</h6>
                                            <input type='text' name="brand" value={formFields.brand} onChange={inputChange} />

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Sản phẩm nối bật</h6>

                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>


                                            </Select>
                                        </div>
                                    </div>

                                </div>


                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>regular price</h6>
                                            <input type='text' name="price" value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>old price</h6>
                                            <input type='text' name="oldPrice" value={formFields.oldPrice} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>rating</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingsValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue); setFormFields(() => ({
                                                        ...formFields,
                                                        rating: newValue
                                                    }))


                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>product stock</h6>
                                            <input type='text' name="countInStock" value={formFields.countInStock} onChange={inputChange} />
                                        </div>
                                    </div>

                                </div>
                                {/* <div className='col'>
                               <h6>Anh san pham</h6>
                                    <div className='stickyBox'>{
                                        productImagesArr?.length !== 0 
                                    }
                                        <div className='position-relative inputBtn'>
                                            <input type='text' required ref={productImages} name="images" onChange={inputChange} />
                                            <Button className="btn-blue"
                                                onClick={addProductImages}>Thêm</Button>
                                        </div>



                                    </div>
                                </div> */}
                                <br />


                            </div>


                            <div />
                        </div>
                    </div>

                    <div className='card p-4 mt-0'>
                        <div className='imagesUploadSec'>
                            <h4 className='mb-4 mt-0'>Media And Published</h4>
                            <div className="imgUploadBox d-flex align-items-center">
                                {
                                    previews?.length !== 0 && previews?.map((img, index) => {
                                        return (
                                            <div className='uploadBox' key={index}>
                                                <img src={img} className='w-100' />
                                            </div>
                                        )
                                    })
                                }
                                <div className="uploadBox">
                                    <input type='file' multiple onChange={(e) => onChangeFile(e, '/api/products/upload')} name='images' />
                                    <div className='info'>
                                        <FaRegImages />
                                        <h5>image upload</h5>
                                    </div>
                                </div>


                            </div>




                            <Button type='submit' className='btn-blue btn-lg btn-big w-100' >
                                <MdCloudUpload /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Thêm'}
                            </Button>

                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default ProductUpload