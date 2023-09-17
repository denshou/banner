import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const banner1 = "/banner1.jpg";
  const banner2 = "/banner2.jpg";
  const banner3 = "/banner3.jpg";
  const banner4 = "/banner4.jpg";
  const banner5 = "/banner5.jpg";
  const banner6 = "/banner6.jpg";

  const MAX_SLIDES = 6;
  const TOTAL_SLIDES = MAX_SLIDES + 1;

  const swiperRef = useRef();
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
  const [loop, setLoop] = useState();
  const [customInterval, setCustomInterval] = useState(3000);

  const [bannerState, setBannerState] = useState([]);

  const loadBanners = () => {
    const banners = [
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
  console.log(swiperCurrentPosition);
  useEffect(() => {
    if (swiperCurrentPosition === 5) {
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
    swiperRef.current.style.transform =
      swiperCurrentPosition === 0
        ? `translate(000vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
    swiperRef.current.style.transition =
      swiperCurrentPosition === 0 ? `none` : `0.5s ease-in-out`;
  }, [swiperCurrentPosition]);

  const setIndex = (index) => {
    setSwiperCurrentPosition(index);
  };
  return (
    <div className="non-scroll">
      <div className="container">
        <section className="banner" ref={swiperRef}>
          {bannerState.map((src, index) => (
            <img src={src} alt="" key={index}></img>
          ))}
        </section>
      </div>
      <ul className="slide-pagination">
        <li>
          <button onClick={() => setIndex(0)}>1</button>
          <button onClick={() => setIndex(1)}>2</button>
          <button onClick={() => setIndex(2)}>3</button>
          <button onClick={() => setIndex(3)}>4</button>
          <button onClick={() => setIndex(4)}>5</button>
          <button onClick={() => setIndex(5)}>6</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
