import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const banner1 = "/banner1.png";
  const banner2 = "/banner2.png";
  const banner3 = "/banner3.jpg";
  const banner4 = "/banner4.jpg";
  const banner5 = "/banner5.jpg";
  const banner6 = "/banner6.jpg";

  const swiperRef = useRef();
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
  const [loop, setLoop] = useState();

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      setSwiperCurrentPosition((prev) => {
        if (prev < 5) {
          return prev + 1;
        } else return 0;
      });
    }, 3000);

    setLoop(swiperLoop);

    return clearTimeout(loop);
  }, [setSwiperCurrentPosition, swiperCurrentPosition]);

  //스와이퍼 이동
  useEffect(() => {
    swiperRef.current.style.transform =
      swiperCurrentPosition === 0
        ? `translate(000vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
  }, [swiperCurrentPosition]);

  return (
    <div className="non-scroll">
      <div className="container" ref={swiperRef}>
        <section className="banner">
          <img src={banner1} alt="" />
          <img src={banner2} alt="" />
          <img src={banner3} alt="" />
          <img src={banner4} alt="" />
          <img src={banner5} alt="" />
          <img src={banner6} alt="" />
          <ul className="slide-pagination"></ul>
        </section>
      </div>
    </div>
  );
}

export default App;
