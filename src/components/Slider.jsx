import { Pagination } from 'swiper'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Slider({ children, slidesPerView = 1, ...props }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={slidesPerView}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            {...props}
        >
            {
                React.Children.map(children, (child) => {
                    return <SwiperSlide>{child}</SwiperSlide>
                })
            }
        </Swiper>
    )
}
