import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const banner1 = "/banner1.png";
  const banner2 = "/banner2.png";
  const banner3 = "/banner3.jpg";
  const banner4 = "/banner4.jpg";
  const banner5 = "/banner5.jpg";
  const banner6 = "/banner6.jpg";

  const MAX_SLIDES = 6;
  const TOTAL_SLIDES = MAX_SLIDES + 2;

  const swiperRef = useRef();
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(1);
  const [loop, setLoop] = useState();
  const [customInterval, setCustomInterval] = useState(3000);
  const [isInitial, setIsInitial] = useState(true);

  const [bannerState, setBannerState] = useState([]);

  const loadBanners = () => {
    const banners = [
      banner6,
      banner1,
      banner2,
      banner3,
      banner4,
      banner5,
      banner6,
      banner1,
    ];
    setBannerState(banners);
  };
  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (swiperCurrentPosition === 6 || swiperCurrentPosition === 0) {
      setCustomInterval(500);
    } else {
      setCustomInterval(3000);
    }
    const swiperLoop = setTimeout(() => {
      setSwiperCurrentPosition((prev) => {
        if (prev < TOTAL_SLIDES - 1) {
          return prev + 1;
        } else return 0;
      });
    }, customInterval);

    setLoop(swiperLoop);

    return clearTimeout(loop);
  }, [setSwiperCurrentPosition, swiperCurrentPosition]);

  //스와이퍼 이동
  useEffect(() => {
    if (isInitial) {
      swiperRef.current.style.transform = `translate(-${swiperCurrentPosition}00vw)`;
      swiperRef.current.style.transition = `none`;
      setIsInitial(false);
      return;
    }
    swiperRef.current.style.transform =
      swiperCurrentPosition === 0
        ? `translate(-100vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
    swiperRef.current.style.transition =
      swiperCurrentPosition === 0 ? `none` : `0.5s ease-in-out`;
  }, [swiperCurrentPosition]);

  console.log(swiperCurrentPosition);
  return (
    <div className="non-scroll">
      <div className="container" ref={swiperRef}>
        <section className="banner">
          {bannerState.map((src, index) => (
            <img src={src} alt="" key={index}></img>
          ))}
        </section>
        
      </div>
      <ul className="slide-pagination">
        <li>
          <button>1</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
