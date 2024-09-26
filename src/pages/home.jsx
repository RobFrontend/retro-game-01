import React, { useEffect, useState } from "react";

export default function About() {
  const [toTop, setToTop] = useState(0);
  const [toSide, setToSide] = useState(50);
  const [isRotate, setIsRotate] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isTime, setIsTime] = useState(15);
  const [isPointLeft, setIsPointLeft] = useState(
    Math.floor(Math.random() * 1600)
  );
  const [isPointTop, setIsPointTop] = useState(
    Math.floor(Math.random() * 1000)
  );
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [isScore, setIsScore] = useState(0);
  const [isRestart, setIsRestart] = useState(false);

  function hideStart() {
    setIsStart(true);
    setIsRestart(false);
  }

  useEffect(() => {
    if (isRestart) {
      setToTop(0);
      setToSide(50);
    }
  }, [toTop, toSide, isRestart]);

  useEffect(() => {
    if (isRestart) {
      setIsPointLeft(Math.floor(Math.random() * 1560));
      setIsPointTop(Math.floor(Math.random() * 940));
      setIsTime(15);

      setIsScore(0);
      setIsTimeEnd(false);
    }
    if (isStart) {
      if (isPointLeft === null && isPointTop === null) {
        setIsPointLeft(Math.floor(Math.random() * 1560));
        setIsPointTop(Math.floor(Math.random() * 940));
        setIsRestart(false);
      }
      if (isStart && isTime > 0) {
        const timeLeft = setInterval(() => {
          setIsTime((time) => time - 1);
        }, 1000);
        return () => clearInterval(timeLeft);
      }
      if (isTime <= 0) {
        setIsTimeEnd(true);
        setIsStart(false);
      }
    }
  }, [isStart, isTime, isPointLeft, isPointTop, isRestart, isScore, isTimeEnd]);

  const key = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log(e.key);
    if (isStart && !isTimeEnd) {
      if (e.key === "w" && toTop <= 940) {
        setToTop((t) => t + 5);
        setIsRotate(0);
      }
      if (e.key === "s" && toTop >= -15) {
        setToTop((t) => t - 5);
        setIsRotate(180);
      }
      if (e.key === "d" && toSide <= 1560) {
        setToSide((l) => l + 5);
        setIsRotate(90);
      }
      if (e.key === "a" && toSide >= 0) {
        setToSide((l) => l - 5);
        setIsRotate(-90);
      }
      if (e.key === "q" && toSide >= 0 && toTop <= 940) {
        setToTop((t) => t + 5);
        setToSide((l) => l - 5);
        setIsRotate(-45);
      }
      if (e.key === "e" && toSide <= 1560 && toTop >= -15) {
        setToTop((t) => t + 5);
        setToSide((l) => l + 5);
        setIsRotate(45);
      }
      // if (
      //   (toSide === isPointLeft - 20 || toSide === isPointLeft + 20) &&
      //   (toTop === isPointTop - 20 || toTop === isPointTop + 20)
      // ) {
      //   setIsTime((t) => t + 20);
      // }
      if (
        toSide >= isPointLeft - 40 &&
        toSide <= isPointLeft + 40 &&
        toTop >= isPointTop - 40 &&
        toTop <= isPointTop + 40
      ) {
        setIsTime((t) => t + 10);
        setIsPointLeft(null);
        setIsPointTop(null);
        setIsScore((s) => s + 1);
      }
    }
    console.log(toSide);
    console.log(toTop);
  };
  let isTop = `${toTop}`;
  let isLeft = `${toSide}`;
  let rotate = `${isRotate}`;

  return (
    <div className="grid min-h-screen bg-slate-800">
      {/* Timer */}
      <div className="absolute text-slate-700 top-12 right-1/2 translate-x-1/2 z-20">
        <h2 className="text-4xl">Time left: {isTime}</h2>
      </div>
      {/* Legend */}
      <div className="absolute top-12 left-6 text-slate-100">
        <h2>
          <b>W</b> to go Up
        </h2>
        <h2>
          <b>S</b> to go Down
        </h2>
        <h2>
          <b>A</b> to go Left
        </h2>
        <h2>
          <b>D</b> to go Right
        </h2>
        <h2>Score: {isScore}</h2>
      </div>
      {/* Start Info */}
      <div className="h-[1000px] w-[1600px] relative bg-transparent bg-slate-100  justify-self-center self-center">
        {isStart ? null : (
          <p
            className="z-20 absolute bg-green-700 text-green-50 p-2 rounded-full opacity-90"
            style={{
              bottom: `${isTop + 80}px`,
              left: `${isLeft - 60}px`,
            }}
          >
            Click on car to Start!
          </p>
        )}
        {/* Car */}
        <button onKeyDown={key} onClick={hideStart} className="bg-none">
          <img
            src="car.jpg"
            className={`max-w-[36px] absolute transition-transform duration-200  ease-in-out drop-shadow-md z-10`}
            style={{
              bottom: `${isTop}px`,
              left: `${isLeft}px`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        </button>
        {/* Point */}

        <div
          className="z-40 absolute"
          style={{
            bottom: `${isPointTop}px`,
            left: `${isPointLeft}px`,
          }}
        >
          💙
        </div>
      </div>
      {/* Game Over */}
      {isTimeEnd && !isRestart ? (
        <div className="grid gap-3 absolute right-1/2 translate-x-1/2 top-1/2 translate-y-[-50%] text-center z-50">
          <h1 className="text-6xl text-red-800 font-bold ">Game Over!</h1>
          <h2 className="text-4xl ">
            Your score: <span className="font-bold">{isScore}</span>
          </h2>
          <button
            onClick={() => setIsRestart(true)}
            className="mt-4 text-2xl text-green-800 font-bold border-2 rounded-md border-green-800 px-6 py-2 hover:opacity-80 transition-all duration-300"
          >
            Play Again!
          </button>
        </div>
      ) : null}
    </div>
  );
}
