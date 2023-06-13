import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
import { FreeMode, Pagination } from "swiper";
import HeaderSection from "../Header/HeaderSection";

const Allsports = () => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allsports")
      .then((res) => res.json())
      .then((data) => setSports(data));
  }, []);

  return (
    <div className="mb-16 bg-[#FF78C4] font-serif">
      <HeaderSection text="Popular Sports"></HeaderSection>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {sports.map((gam) => {
          return (
            <SwiperSlide key={gam._id}>
              <div className="w-[350px] h-[300px] shadow-lg shadow-cyan-500/50 mb-16">
                <img className="w-full h-full" src={gam.image} alt="" />
                <h3 className="font-semibold mt-2">{gam.name}</h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Allsports;
