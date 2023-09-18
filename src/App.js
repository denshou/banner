import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const banner1 = "/b1.jpg";
  const banner2 = "/b2.jpg";
  const banner3 = "/b3.jpg";
  const banner4 = "/b4.jpg";
  const banner5 = "/b5.jpg";
  const banner6 = "/b6.jpg";
  const play = "/play.svg";
  const pause = "/pause.svg";
  const leftArrow = "/left.svg";
  const rightArrow = "/right.svg";

  const MAX_SLIDES = 6;
  const TOTAL_SLIDES = MAX_SLIDES + 4;

  const swiperRef = useRef();
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(2);
  const [loop, setLoop] = useState();
  const [customInterval, setCustomInterval] = useState(3000);
  const [isInitial, setIsInitial] = useState(true);
  const [isSwipe, setIsSwipe] = useState(true);

  const [bannerState, setBannerState] = useState([]);

  const loadBanners = () => {
    const banners = [
      banner5, //0
      banner6, //1
      banner1, //2
      banner2, //3
      banner3, //4
      banner4, //5
      banner5, //6
      banner6, //7
      banner1, //8
      banner2, //9
    ];
    setBannerState(banners);
  };
  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (swiperCurrentPosition === 7) {
      setCustomInterval(500);
    } else {
      setCustomInterval(3000);
    }
    if (!isSwipe) {
      clearTimeout(loop);
    } else {
      const swiperLoop = setTimeout(() => {
        setSwiperCurrentPosition((prev) => {
          if (prev < 8) {
            return prev + 1;
          } else if (swiperCurrentPosition === 8) {
            return 2;
          }
        });
      }, customInterval);
      setLoop(swiperLoop);
    }

    if (swiperCurrentPosition < 2) {
      setSwiperCurrentPosition(7);
    }

    return clearTimeout(loop);
  }, [setSwiperCurrentPosition, swiperCurrentPosition, isSwipe]);

  //스와이퍼 이동
  useEffect(() => {
    if (isInitial) {
      swiperRef.current.style.transform = `translate(-${
        swiperCurrentPosition * 8
      }0vw)`;
      swiperRef.current.style.transition = `none`;
      setIsInitial(false);
      return;
    }
    swiperRef.current.style.transform =
      swiperCurrentPosition === 8
        ? `translate(-80vw)`
        : swiperCurrentPosition === 1
        ? `translate(-640vw)`
        : `translate(-${swiperCurrentPosition * 80}vw)`;
    swiperRef.current.style.transition =
      swiperCurrentPosition === 8 || swiperCurrentPosition < 2
        ? `none`
        : `0.5s ease-in-out`;
  }, [swiperCurrentPosition]);

  const handleBannerLeft = (event) => {
    setCustomInterval(3000);
    setSwiperCurrentPosition((prev) => prev - 1);
    event.target.disabled = true;
    setTimeout(() => {
      event.target.disabled = false;
    }, 500);

    console.log(event.target.disabled);
  };
  const handleBannerRight = (event) => {
    setSwiperCurrentPosition((prev) => prev + 1);
    event.target.disabled = true;
    setTimeout(() => {
      event.target.disabled = false;
    }, 500);
  };
  const handleIsSwipe = () => {
    setIsSwipe((prev) => !prev);
    console.log(isSwipe);
  };

  let pagecnt = swiperCurrentPosition - 1;
  if (swiperCurrentPosition - 1 === 7) pagecnt = 1;

  console.log(swiperCurrentPosition);
  return (
    <div className="non-scroll">
      <div className="container">
        <div className="shade left"></div>
        <button
          type="button"
          className="banner-button button-prev"
          onClick={handleBannerLeft}
        >
          <img src={leftArrow} className="left-arrow" alt="" />
        </button>
        <button
          type="button"
          className="banner-button button-next"
          onClick={handleBannerRight}
        >
          <img src={rightArrow} className="right-arrow" alt="" />
        </button>
        <section className="banner" ref={swiperRef}>
          {bannerState.map((src, index) => (
            <img src={src} alt="" key={index}></img>
          ))}
        </section>
        <div className="shade right"></div>
        <button type="button" className="swiper-play" onClick={handleIsSwipe}>
          {isSwipe && <img src={pause} className="img-pause" alt="" />}
          {!isSwipe && <img src={play} className="img-play" alt="" />}
        </button>
        <div className="pagination">{pagecnt}/6</div>
      </div>
    </div>
  );
}

export default App;
