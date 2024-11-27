import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = () => {

    const [itemBg,  setItemBg] = useState(['#fffceb','#f2fce4','#feefea', '#fff3eb', '#ecffec', '#f2fce4', '#fffceb','#f2fce4','#feefea','#fffceb','#f2fce4','#feefea']);
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
                    itemBg?.map( (item, index) => {
                        return(
                            <SwiperSlide key={index}>
                                <div className='item text-center cursor' style={{ background:item}}>
                                    <img src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/cat-9.png" alt=""/>
                                </div>

                                <h6>Red Apple</h6>
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