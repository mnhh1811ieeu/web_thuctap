import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = (props) => {

  return (
    <div>
        <section className='homeCat'>
            <div className='container' /*style={{ overflow: 'hidden'}}*/>
                
                <h3 className='mb-4 hd'>Danh mục nổi bật</h3>
                
                <Swiper
                    slidesPerView={10}
                    spaceBetween={8}
                    navigation={true}
                    slidesPerGroup={1}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                {
                    
                    props.catData?.length!==0 &&  props.catData?.map( (cat, index) => {
                        return(
                            <SwiperSlide key={index}>
                                <div className='item text-center cursor' style={{ background:cat.color}}>
                                    <img src={ cat.images[0]} alt=""/>
                                </div>

                                <h6 style={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: "bold"}}>{cat.name}</h6>
                            </SwiperSlide>
                        )
                    })
                }
                
                </Swiper>
            
            </div>
        </section>
    </div>
  )
}

export default HomeCat