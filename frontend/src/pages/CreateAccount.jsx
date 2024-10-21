import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CreateAccount() {
  const INFO = ["name", "contact", "major", "year", "advicePreference", "interests", "career", "advice"]
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    swipe: false,
  };
  return (
    <div class="overflow-hidden">
      <Slider {...settings} ref={slider => {
        sliderRef = slider;
      }}>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl">What's your name?</p>
            <div className="flex items-center gap-5 w-full">
              <input
                placeholder="Name"
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px", 
                }}
              />
              <button
                style={{
                  backgroundColor: "#9247BF",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 10,
                  width: "10vw",
                  minWidth: "100px", 
                }}
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div>
        <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
        <p className="self-start text-xl">Major(s)?</p>
            <div className="flex items-center gap-5 w-full">
              <input
                placeholder="Major(s)"
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px", 
                }}
              />
              <button
                style={{
                  backgroundColor: "#9247BF",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 10,
                  width: "10vw",
                  minWidth: "100px", 
                }}
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div>
        <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
        <p className="self-start text-xl">Year?</p>
            <div className="flex items-center gap-5 w-full">
              <input
                placeholder="Name"
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px", 
                }}
              />
              <button
                style={{
                  backgroundColor: "#9247BF",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 10,
                  width: "10vw",
                  minWidth: "100px", 
                }}
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
