import React, { useState, useRef, useEffect, useContext } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MdCloudUpload } from "react-icons/md";
import { FaRegImages } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataFromApi, postDataProduct, fetchData, postData } from '../../utils/api';

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

const EditProduct = () => {
    const [productImagesArr, setProductImagesArr] = useState([]);
    const [categoryVal, setCategoryVal] = useState('');
    const [ratingsValue, setRatingValue] = useState(1);
    const [catData, setCatData] = useState([]);
    const context = useContext(MyContext);
    const [productData, setProductData] = useState(null);
    const formdata = new FormData();
    const history = useNavigate();
    const { id } = useParams(); // Get the product ID from URL params
    const [files, setFiles] = useState([]);
    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        brand: '',
        price: null,
        oldPrice: null,
        category: '',
        countInStock: null,
        rating: 0,
        isFeatured: null,
    });

    const [isFeaturedValue, setIsFeaturedValue] = useState('');
    const handleChangeIsFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
        setFormFields((prev) => ({
            ...prev,
            isFeatured: event.target.value,
        }));
    };

    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields((prev) => ({
            ...prev,
            category: event.target.value,
        }));
    };

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            setImgFiles(e.target.files);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                imgArr.push(file);
                formdata.append('images', file);
            }
            setFiles(imgArr);
            postDataProduct(apiEndPoint, formdata).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const inputChange = (e) => {
        setFormFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);

        fetchDataFromApi('/api/category/').then((res) => {
            setCatData(res);
            context.setProgress(100);
        });

        // Fetch product data for editing
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);
            setFormFields(res); // Prefill the form fields with the product data
        });
    }, [id]);

    useEffect(() => {
        if (!imgFiles) return;
        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }
        setPreviews(tmp);
        for (let i = 0; i < tmp.length; i++) {
            return () => {
                URL.revokeObjectURL(tmp[i]);
            };
        }
    }, [imgFiles]);

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

        setIsLoading(true);
        postData(`/api/products/update/${id}`, formFields).then((res) => {
            context.setAlertBox({
                open: true,
                msg: 'Sản phẩm đã được cập nhật thành công',
                error: false,
            });
            setIsLoading(false);
            history('/product/list');
        });
    };

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Edit Product</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                    <StyledBreadcrumb
                        components="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb components="a" label="Products" href="#" deleteIcon={<ExpandMoreIcon />} />
                    <StyledBreadcrumb label="Edit Product" deleteIcon={<ExpandMoreIcon />} />
                </Breadcrumbs>
            </div>

            {productData ? (
                <form className="form" onSubmit={addProduct}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4">
                                <h5 className="text-white mb-4">Basic</h5>

                                <div className="form-group">
                                    <h6>Name</h6>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formFields.name}
                                        onChange={inputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <h6>Description</h6>
                                    <textarea
                                        rows={5}
                                        cols={10}
                                        name="description"
                                        value={formFields.description}
                                        onChange={inputChange}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Category</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {catData?.categoryList?.length !== 0 &&
                                                    catData?.categoryList?.map((cat, index) => {
                                                        return (
                                                            <MenuItem value={cat.id} key={index}>
                                                                {cat.name}
                                                            </MenuItem>
                                                        );
                                                    })}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Brand</h6>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={formFields.brand}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Featured Product</h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeIsFeaturedValue}
                                                displayEmpty
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Regular Price</h6>
                                            <input
                                                type="text"
                                                name="price"
                                                value={formFields.price}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Old Price</h6>
                                            <input
                                                type="text"
                                                name="oldPrice"
                                                value={formFields.oldPrice}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Stock Count</h6>
                                            <input
                                                type="number"
                                                name="countInStock"
                                                value={formFields.countInStock}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Rating</h6>
                                            <Rating
                                                name="rating"
                                                value={formFields.rating}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="btn-submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={24} /> : 'Update Product'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default EditProduct;
