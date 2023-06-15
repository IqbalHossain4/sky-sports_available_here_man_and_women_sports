import React, { useState } from "react";
import img1 from "../../assets/1 (1).jpg";
import img2 from "../../assets/1 (2).jpg";
import img3 from "../../assets/1 (3).jpg";
import img4 from "../../assets/1 (4).jpg";

const Banner = () => {
  const [isShowMore, setIsShowMore] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <div className="font-serif ">
      <div className="carousel w-full h-[500px]">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="relative w-full ">
            <img
              src={img1}
              className="w-full h-[500px] absolute  object-cover object-right "
            />
            <div className="absolute    bg-gradient-to-l opacity-25 from-white via-black to-black h-[100%] w-full" />

            <div className="top-[15%] left-[5%] absolute">
              <h1 className="font-extrabold text-8xl text-white">
                Learn Sports <br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r from-[#E1AEFF] to-[#FF78C4]">
                  with
                </span>
                <span>Sky</span>
              </h1>
              <div className="w-2/4 mt-6 tracking-widest">
                <span className="text-white ">
                  The bearded man laughing at his daughter is Bill Russell, the
                  most remarkable basketball player of our time. Sport, however,
                  is one of his lesser interests.
                </span>
                {isShowMore && (
                  <span className=" text-white">
                    Here are his trenchant, often angry observations on today's
                    Negro-white crisis and his role in it
                  </span>
                )}

                <button className="text-blck " onClick={toggleReadMoreLess}>
                  {isShowMore ? "...read Less" : "...read More"}
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={img3} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={img2} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src={img4} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
