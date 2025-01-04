import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { MdBrandingWatermark } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { GiResize } from "react-icons/gi";
import { MdPreview } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchDataFromApi, postData } from '../../utils/api';
import { useEffect } from 'react';
import ProductZoom from '../../components/ProductZoom/ProductZoom';
import { useContext } from 'react';
import { MyContext } from '../../App';




const ProductDetails = () => {

  const handleDeleteReview = async (reviewId) => {
    try {
      // Gọi API để xóa bình luận
      const response = await fetch(`http://localhost:4000/api/productReviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Cập nhật lại mảng reviewData để loại bỏ bình luận đã xóa
        const updatedReviewData = reviewData.filter((review) => review._id !== reviewId);
        setReviewData(updatedReviewData);
        context.setAlertBox({
          msg: "Đánh giá đã được xóa!",
          error: false,
          open: true,
        });

      } else {
        context.setAlertBox({
          msg: "Lỗi khi xóa đánh giá!",
          error: true,
          open: true,
        });
      }
    } catch (error) {
      console.error('Lỗi:', error);
      context.setAlertBox({
        msg: "Không thể xóa đánh giá",
        error: true,
        open: true,
      });
    }
  };


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
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [replyForms, setReplyForms] = useState({});
  const [replyContent, setReplyContent] = useState('');
  const context = useContext(MyContext);

  const toggleReplyForm = (reviewId) => {
    setReplyForms((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId], // Toggle form visibility for specific review
    }));
  };

  const handleReplySubmit = async (e, reviewId) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      context.setAlertBox({
        msg: "Vui lòng nhập nội dung phản hồi!",
        error: true,
        open: true,
      });
      return;
    }

    try {
      const formData = {
        responderName: "Admin",
        reply: replyContent,
      };

      await postData(`/api/productReviews/${reviewId}/reply`, formData);

      context.setAlertBox({
        msg: "Phản hồi đã được gửi!",
        error: false,
        open: true,
      });

      setReplyContent("");
      setReplyForms((prev) => ({ ...prev, [reviewId]: false }));

      const updatedReviewData = await fetchDataFromApi(`/api/productReviews?productId=${id}`);
      setReviewData(updatedReviewData);
    } catch (error) {
      context.setAlertBox({
        msg: error.response?.data?.message || "Không thể gửi phản hồi!",
        error: true,
        open: true,
      });
    }
  };

  // Load product and reviews data when component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setProductData(res);
    });

    fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
      setReviewData(res); // Ensure review data is correctly set
    });
  }, [id]);

  const ensureArray = (data) => {
    if (Array.isArray(data)) {
      return data.flatMap(item => {
        if (typeof item === 'string' && item.includes(',')) {
          return item.split(',');
        }
        return item;
      });
    }
    return data ? data.split(',') : [];
  };

  const sizes = ensureArray(productData?.productSIZE);

  return (
    <div className='right-content w-50'>
      <div className='card shadow border-0 w-100 flex-row p-4'>
        <h5 className='mb-0'>Xem sản phẩm</h5>
        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
          <StyledBreadcrumb components="a" href="#" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
          <StyledBreadcrumb components="a" label="Products" href="#" />
          <StyledBreadcrumb label="Product Upload" />
        </Breadcrumbs>
      </div>

      <div className='card productDetailsSEction'>
        <div className='row'>
          <div className='col-md-5'>
            <div className='sliderWrapper pt-3 pb-3 pl-4 pr-4'>
              <h5 className='mb-3'>Sản phẩm trưng bày</h5>
              <ProductZoom images={productData?.images} discount={productData?.discount} />
            </div>
          </div>
          <div className='col-md-7'>
            <div className='pt-3 pb-3 p1-4 pr-4'>
              <h5 className='mb-3'>Chi tiết sản phẩm</h5>
              <h3>{productData?.name}</h3>
              <div className='productInfo mt-3'>
                <div className='row mb-2'>
                  <div className='col-sm-5 d-flex align-items-center'>
                    <span className='icon'><MdBrandingWatermark /></span>
                    <span className='name'>Hãng</span>
                  </div>
                  <div className='col-sm-7'>: <span>{productData?.brand}</span></div>
                </div>

                <div className='row mb-2'>
                  <div className='col-sm-5 d-flex align-items-center'>
                    <span className='icon'><TbCategoryFilled /></span>
                    <span className='name'>Loại sản phẩm</span>
                  </div>
                  <div className='col-sm-7'>: <span>{productData?.catName}</span></div>
                </div>

                <div className='row mb-2'>
                  <div className='col-sm-5 d-flex align-items-center'>
                    <span className='icon'><GiResize /></span>
                    <span className='name'>Size</span>
                  </div>
                  <div className='col-sm-7'>: <span>{sizes?.length !== 0 && sizes.map((item, index) => <span key={index} className="tag">{item}</span>)}</span></div>
                </div>

                <div className='row mb-2'>
                  <div className='col-sm-5 d-flex align-items-center'>
                    <span className='icon'><MdPreview /></span>
                    <span className='name'>Đánh giá</span>
                  </div>
                  <div className='col-sm-7'>: <span>{reviewData?.length} Đánh giá</span></div>
                </div>

                <div className='row mb-2'>
                  <div className='col-sm-5 d-flex align-items-center'>
                    <span className='icon'><MdPublishedWithChanges /></span>
                    <span className='name'>Ra mắt</span>
                  </div>
                  <div className='col-sm-7'>:
                    <span>{new Date(productData?.dateCreated).toLocaleString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric'
                    })}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-4'>
          <h4 className='mt-4 mb-3'>Chi tiết sản phẩm</h4>
          <p>{productData?.description}</p>

          <br />

          <h4 className="mt-4 mb-4">Đánh giá của khách hàng</h4>
          <div className="reviewSection">
            {reviewData?.length > 0 ? (
              reviewData.map((review) => (
                <div className="reviewsRow reply" key={review._id}>
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="userInfo d-flex">
                        <span className="rounded-circle">
                          {context.user?.name.charAt(0)}
                        </span>
                        <div className="info pl-3">
                          <h6 className="customer-name">{review?.customerName}</h6>
                          <span className="review-date">
                            {new Date(review?.dateCreated).toLocaleString('vi-VN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                            })}
                          </span>

                          <div className="rating">
                            <Rating name="read-only" value={review?.customerRating} readOnly />
                          </div>
                          <p className="review-text">{review?.review}</p>

                          {/* Buttons for Delete and Reply */}
                          <div className="action-buttons">
                            <button
                              onClick={() => handleDeleteReview(review._id)}
                              className="btn btn-danger btn-sm ml-2"
                            >
                              Xóa
                            </button>
                            <button
                              onClick={() => toggleReplyForm(review._id)}
                              className="btn btn-link"
                            >
                              {replyForms[review._id] ? "Ẩn trả lời" : "Trả lời"}
                            </button>
                          </div>

                          {/* Reply Form */}
                          {replyForms[review._id] && (
                            <form
                              onSubmit={(e) => handleReplySubmit(e, review._id)}
                              className="reply-form"
                            >
                              <textarea
                                className="form-control"
                                rows="3"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Nhập nội dung phản hồi..."
                              ></textarea>
                              <button type="submit" className="btn btn-primary mt-2">
                                Gửi
                              </button>
                            </form>
                          )}

                          {/* Display Replies */}
                          {review?.replies?.length > 0 && (
                            <div className="replies pl-3">
                              <h6 className="replies-title">Phản hồi:</h6>
                              {review.replies.map((reply, index) => (
                                <div key={index} className="reply">
                                  <p>
                                    <strong>{reply.responderName}:</strong> {reply.reply}
                                  </p>
                                  <span className="reply-time">
                                    {new Date(reply.timestamp).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-reviews">Sản phẩm chưa có đánh giá.</p>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};


export default ProductDetails