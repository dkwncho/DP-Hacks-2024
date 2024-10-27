import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiMail } from "react-icons/ci";



export default function CreateAccount() {
  const INFO = ["name", "contact", "major", "year", "advicePreference", "interests", "career", "advice"]

  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [number, setNumber] = useState("");
  const [advicePreference, setAdvicePreference] = useState(null);
  const [intersts, setInterests] = useState(null);
  const [career, setCareer] = useState(null);

  let sliderRef = useRef(null);
  const next = (e) => {
    e.preventDefault()
    sliderRef.slickNext();
    return false
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
            <form onSubmit={(e) => { if (name) next(e) }} className="flex items-center gap-5 w-full">
              <input
                placeholder="Name"
                // autoFocus
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (name ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl">Major(s)?</p>
            <form onSubmit={(e) => { if (major) next(e) }} className="flex items-center gap-5 w-full">
              <input
                placeholder="Major(s)"
                // autoFocus
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                }}
                onChange={(e) => setMajor(e.target.value)}
                value={major}
              />
              <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (intersts ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl ">What year are you?</p>
            <div className="flex items-center gap-5 w-full ">
              <div className="gap-5 flex items-center w-full">
                <button onClick={() => setYear("freshman")} className={"p-4 border rounded-lg flex-1  duration-200 " + (year === 'freshman' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                  Freshman
                </button>
                <button onClick={() => setYear("sophomore")} className={"p-4 border rounded-lg flex-1 duration-200 " + (year === 'sophomore' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                  Sophomore
                </button>
                <button onClick={() => setYear("junior")} className={"p-4 border rounded-lg flex-1 duration-200 " + (year === 'junior' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                  Junior
                </button>
                <button onClick={() => setYear("senior")} className={"p-4 border rounded-lg flex-1 duration-200 " + (year === 'senior' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                  Senior
                </button>
              </div>
            </div>
            <p className={"self-start text-xl mt-8 duration-300 " + (year ? "" : "opacity-0")} >I'm here to...</p>
            <div className={"flex items-center justify-center gap-5 w-full duration-300 " + (year ? "" : "opacity-0")}>
              <div className="gap-5 flex items-center w-full justify-center">
                {(year === "freshman" || year === "sophomore") &&
                  <button onClick={() => setAdvicePreference("get")} className={"p-4 border rounded-lg duration-200 w-[50%] " + (advicePreference === 'get' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                    <div class='text-xl font-semibold mb-2'>Get Advice 📚</div>
                    <ul class="pl-5 list-disc text-left italic">
                      <li class="mb-1">Help what's going on</li>
                      <li>Who's throwing tn???</li>
                    </ul>
                  </button>
                }
                {(year !== "freshman") &&
                  <button onClick={() => setAdvicePreference("give")} className={"p-4 border rounded-lg duration-200 w-[50%] " + (advicePreference === 'give' ? "bg-purple-200 border-purple-500" : "hover:bg-purple-100")}>
                    <div class='text-xl font-semibold mb-2'>Give Advice 🍔</div>
                    <ul class="pl-5 list-disc text-left italic">
                      <li class="mb-1">Pour into the next generation</li>
                      <li>Free food galore</li>
                    </ul>
                  </button>
                }
              </div>
            </div>
            <button
              class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (year ? " " : "opacity-0 ") + (advicePreference && year ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
              type="submit"
              onClick={(e) => { if (advicePreference) next(e) }}
            >
              Next
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl">What are you interested in pursuing as a career?</p>
            <form onSubmit={(e) => { next(e) }} className="flex flex-col items-center gap-5 w-full">
              <textarea
                placeholder="Not too long :)"
                type="textarea"

                style={{
                  border: "solid 2px",
                  borderImageSlice: "1",
                  borderColor: '#B37BD5',
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                  borderRadius: '10px',
                  height: "100px",
                  width: "100%"
                }}
                onChange={(e) => setCareer(e.target.value)}
                value={intersts}
              />
              <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (career ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl">In a few sentences, what do you like to do for fun?</p>
            <form onSubmit={(e) => { if (intersts) next(e) }} className="flex flex-col items-center gap-5 w-full">
              <textarea
                placeholder="Not too long :)"
                type="textarea"

                style={{
                  border: "solid 2px",
                  borderImageSlice: "1",
                  borderColor: '#B37BD5',
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                  borderRadius: '10px',
                  height: "100px",
                  width: "100%"
                }}
                onChange={(e) => setInterests(e.target.value)}
                value={intersts}
              />
              <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (intersts ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto gap-7">
            <p className="self-start text-xl">How can people contact you?</p>
            <form onSubmit={(e) => { if (email) next(e) }} className="items-center gap-5 w-full">
              <div className="flex flex-col gap-5 w-full">
                <div className="flex gap-5 items-center">
                <CiMail color="purple" size={32} />
                  <input
                    placeholder="example@seas.upenn.edu"
                    style={{
                      borderBottom: "solid 2px",
                      borderImageSlice: "1",
                      borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                      flexGrow: 1,
                      fontSize: 20,
                      padding: "10px 15px",
                      width: "70%",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button
                class={"mt-10 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (email ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Next
              </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center h-[85vh] items-center w-6/12 m-auto">
            <div className="text-[3em] font-bold">All done!</div>
            <div className="text-[1.5em] mt-3">Your PennPals journey begins now...</div>
            <button
              class={"mt-[3rem] text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 text-center flex justify-center items-center " + (true ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
              type="submit"
            >Home</button>
          </div>
        </div>
      </Slider>
    </div>
  );
}
