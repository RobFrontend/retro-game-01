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
  const [isHighScore, setIsHighScore] = useState(0);
  const [isCar, setIsCar] = useState("bluecar.png");

  // *****************
  // Starting game by clicking on vehicle/hero
  function hideStart() {
    setIsStart(true);
    setIsRestart(false);
  }

  // *******************
  //  Setting car to start position after restart
  useEffect(() => {
    if (isRestart) {
      setToTop(0);
      setToSide(50);
    }
  }, [toTop, toSide, isRestart]);

  // *************************************
  // Restarting, Starting, Time ending, Counting, Point icon
  useEffect(() => {
    // Reset of part of states to restart
    if (isRestart) {
      // setIsPointLeft(Math.floor(Math.random() * 1560));
      // setIsPointTop(Math.floor(Math.random() * 940));
      setIsPointLeft(null);
      setIsPointTop(null);
      setIsTime(15);
      setIsScore(0);
      setIsTimeEnd(false);
    }
    if (isStart) {
      // setting highsocre
      isScore > isHighScore && setIsHighScore(isScore);
      // Respawn of point icon
      if (isPointLeft === null && isPointTop === null && !isRestart) {
        setIsPointLeft(Math.floor(Math.random() * 1560));
        setIsPointTop(Math.floor(Math.random() * 940));
        setIsRestart(false);
      }
      // Counting
      if (isStart && isTime > 0) {
        const timeLeft = setInterval(() => {
          setIsTime((time) => time - 1);
        }, 1000);
        return () => clearInterval(timeLeft);
      }
      // End of game if time ends
      if (isTime <= 0) {
        setIsPointLeft(null);
        setIsPointTop(null);
        setIsTimeEnd(true);
        setIsStart(false);
      }
    }
  }, [isStart, isTime, isPointLeft, isPointTop, isRestart, isScore, isTimeEnd]);

  // **************************************
  // Steering, rotating, gaining points
  const key = (e) => {
    let carSpeed;
    if (isCar === "bluecar.png") carSpeed = 5;
    if (isCar === "greencar.png") carSpeed = 7;
    if (isCar === "redcar.png") carSpeed = 9;
    if (isCar === "blackcar.png") carSpeed = 11;
    e.preventDefault();
    // e.stopPropagation();
    console.log(e.key);
    if (isStart && !isTimeEnd) {
      // *********************************
      // steering
      if (e.key === "w" && toTop <= 940) {
        setToTop((t) => t + carSpeed);
        setIsRotate(0);
      }
      if (e.key === "s" && toTop >= -15) {
        setToTop((t) => t - carSpeed);
        setIsRotate(180);
      }
      if (e.key === "d" && toSide <= 1560) {
        setToSide((l) => l + carSpeed);
        setIsRotate(90);
      }
      if (e.key === "a" && toSide >= 0) {
        setToSide((l) => l - carSpeed);
        setIsRotate(-90);
      }
      if (e.key === "q" && toSide >= 0 && toTop <= 940) {
        setToTop((t) => t + carSpeed);
        setToSide((l) => l - carSpeed);
        setIsRotate(-45);
      }
      if (e.key === "e" && toSide <= 1560 && toTop <= 940) {
        setToTop((t) => t + carSpeed);
        setToSide((l) => l + carSpeed);
        setIsRotate(45);
      }
      // *************************
      // restart on escape key
      if (e.key === "Escape") {
        setIsRestart(true);
      }
      // if (
      //   (toSide === isPointLeft - 20 || toSide === isPointLeft + 20) &&
      //   (toTop === isPointTop - 20 || toTop === isPointTop + 20)
      // ) {
      //   setIsTime((t) => t + 20);
      // }
      // ***************************
      // Gaining points
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
  };
  let isTop = `${toTop}`;
  let isLeft = `${toSide}`;
  let rotate = `${isRotate}`;

  return (
    <div className="grid min-h-screen bg-slate-800">
      {/* Timer */}

      <div className="absolute text-slate-700 top-12 right-1/2 translate-x-1/2 z-20 flex gap-6 items-end">
        <h2 className="text-xl">
          Score: <span className="font-bold">{isScore}</span>
        </h2>
        <h2 className="text-4xl">
          Time left: <span className="font-bold">{isTime}</span>
        </h2>
        <h2 className="text-xl">
          HighScore: <span className="font-bold">{isHighScore}</span>
        </h2>
      </div>
      {/* Legend */}
      <div className="absolute top-12 right-8 text-slate-100">
        <button
          onClick={() => setIsTimeEnd(true)}
          className=" p-2  rounded-full mb-6 w-full bg-red-700 hover:bg-red-600 transition-all duration-300"
        >
          Restart
        </button>
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
      </div>
      {/* Choose Car */}
      {isStart && !isRestart ? null : (
        <div className="absolute top-12 left-8 text-slate-100 grid gap-6 justify-items-center text-center">
          <h2>
            Choose<br></br> your car:
          </h2>
          <div className="py-2 px-3 shadow-md bg-slate-700 grid justify-items-center ">
            <button onClick={() => setIsCar("bluecar.png")}>
              <img src="bluecar.png" className="h-12 self-center" />
            </button>
            <p>
              Speed:<br></br>5
            </p>
          </div>
          <div className="py-2 px-3 shadow-md bg-slate-700 grid justify-items-center ">
            <button
              onClick={() => isHighScore >= 7 && setIsCar("greencar.png")}
            >
              <img src="greencar.png" className="h-12 self-center" />
            </button>
            {isHighScore >= 7 ? (
              <p>
                Speed:<br></br>7
              </p>
            ) : (
              <p>
                Minimum<br></br>Highscore<br></br>to unlock:
                <br></br>7
              </p>
            )}
          </div>
          <div className="py-2 px-3 shadow-md bg-slate-700 grid justify-items-center ">
            <button onClick={() => isHighScore >= 9 && setIsCar("redcar.png")}>
              <img src="redcar.png" className="h-12 self-center" />
            </button>
            {isHighScore >= 9 ? (
              <p>
                Speed:<br></br>9
              </p>
            ) : (
              <p>
                Minimum<br></br>Highscore<br></br>to unlock:
                <br></br>9
              </p>
            )}
          </div>
          <div className="py-2 px-3 shadow-md bg-slate-700 grid justify-items-center ">
            <button
              onClick={() => isHighScore >= 11 && setIsCar("blackcar.png")}
            >
              <img src="blackcar.png" className="h-12 self-center" />
            </button>
            {isHighScore >= 11 ? (
              <p>
                Speed:<br></br>11
              </p>
            ) : (
              <p>
                Minimum<br></br>Highscore<br></br>to unlock:
                <br></br>11
              </p>
            )}
          </div>
        </div>
      )}
      {/* Start Info */}
      <div
        className="h-[1000px] w-[1600px] relative bg-transparent   justify-self-center self-center"
        style={{ backgroundColor: "#E2E8F0" }}
      >
        {isStart && !isRestart ? null : (
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
            src={isCar}
            className={`max-w-[36px] absolute transition-transform duration-200  ease-in-out drop-shadow-md z-10`}
            style={{
              bottom: `${isTop}px`,
              left: `${isLeft}px`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        </button>
        {/* Point */}

        {isPointLeft ? (
          <img
            src="bluepoint.png"
            className="z-40 absolute max-w-8 drop-shadow-md"
            style={{
              bottom: `${isPointTop}px`,
              left: `${isPointLeft}px`,
            }}
          />
        ) : null}
        {/* <div
          className="z-40 absolute"
          style={{
            bottom: `${isPointTop}px`,
            left: `${isPointLeft}px`,
          }}
        >
          💙
        </div> */}
      </div>
      {/* Game Over */}
      {isTimeEnd && !isRestart ? (
        <div className="grid gap-3 absolute right-1/2 translate-x-1/2 top-1/2 translate-y-[-50%] text-center z-50">
          <h1 className="text-6xl text-red-800 font-bold ">Game Over!</h1>
          <h2 className="text-4xl ">
            Your score: <span className="font-bold">{isScore}</span>
            <br></br>Highscore: <span className="font-bold">{isHighScore}</span>
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
