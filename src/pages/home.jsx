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
  const [isDangerLeft, setIsDangerLeft] = useState(null);
  const [isDangerTop, setIsDangerTop] = useState(null);
  const [isDanger2Left, setIsDanger2Left] = useState(null);
  const [isDanger2Top, setIsDanger2Top] = useState(null);
  const [isDanger3Left, setIsDanger3Left] = useState(null);
  const [isDanger3Top, setIsDanger3Top] = useState(null);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [isScore, setIsScore] = useState(0);
  const [isRestart, setIsRestart] = useState(false);
  const [isHighScore, setIsHighScore] = useState(0);
  const [isCar, setIsCar] = useState("bluecar.png");
  const [isInfo, setIsInfo] = useState(true);

  // *****************
  // Starting game by clicking on vehicle/hero
  function hideStart() {
    setIsStart(true);
    setIsRestart(false);
    setIsInfo(false);
  }

  // *******************
  //  Setting car to start position after restart
  useEffect(() => {
    if (isRestart) {
      setToTop(0);
      setToSide(50);
    }
  }, [toTop, toSide, isRestart]);

  // Danger points
  useEffect(() => {
    if (isScore > 2 && !isRestart) {
      setIsDangerLeft(Math.floor(Math.random() * 1560));
      setIsDangerTop(Math.floor(Math.random() * 940));
    }
    if (isScore > 5 && !isRestart) {
      const danger2Position = setInterval(() => {
        setIsDanger2Left(Math.floor(Math.random() * 1560));
        setIsDanger2Top(Math.floor(Math.random() * 940));
        if (isScore > 8 && !isRestart) {
          setIsDanger3Left(Math.floor(Math.random() * 1560));
          setIsDanger3Top(Math.floor(Math.random() * 940));
        }
      }, 5000);
      return () => clearInterval(danger2Position);
    }
  }, [isScore]);

  // *************************************
  // Restarting, Starting, Time ending, Counting, Point icon
  useEffect(() => {
    // Reset of part of states to restart
    if (isRestart) {
      // setIsPointLeft(Math.floor(Math.random() * 1560));
      // setIsPointTop(Math.floor(Math.random() * 940));
      setIsPointLeft(null);
      setIsPointTop(null);
      setIsDangerLeft(null);
      setIsDangerTop(null);
      setIsDanger2Left(null);
      setIsDanger2Top(null);
      setIsDanger3Left(null);
      setIsDanger3Top(null);
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
      // Danger point
      // if (isScore > 0 && !isRestart) {
      //   setIsDangerLeft(Math.floor(Math.random() * 1560));
      //   setIsDangerTop(Math.floor(Math.random() * 940));
      //   console.log(setIsDangerLeft);
      // }

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
        setIsDangerLeft(null);
        setIsDangerTop(null);
        setIsDanger2Left(null);
        setIsDanger2Top(null);
        setIsDanger3Left(null);
        setIsDanger3Top(null);
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
      // ***************************
      // Gaining points
      if (
        toSide >= isPointLeft - 40 &&
        toSide <= isPointLeft + 40 &&
        toTop >= isPointTop - 40 &&
        toTop <= isPointTop + 40
      ) {
        if (isScore <= 2) setIsTime((t) => t + 8);
        if (isScore > 2 && isScore <= 7) setIsTime((t) => t + 6);
        if (isScore > 7 && isScore <= 9) setIsTime((t) => t + 4);
        if (isScore > 9) setIsTime((t) => t + 2);
        setIsPointLeft(null);
        setIsPointTop(null);
        setIsScore((s) => s + 1);
      }
      // Minus points for danger
      if (
        toSide >= isDangerLeft - 40 &&
        toSide <= isDangerLeft + 40 &&
        toTop >= isDangerTop - 40 &&
        toTop <= isDangerTop + 40
      ) {
        setIsTime((t) => t - 10);
        setIsDangerLeft(null);
        setIsDangerTop(null);
      }
      if (
        toSide >= isDanger2Left - 40 &&
        toSide <= isDanger2Left + 40 &&
        toTop >= isDanger2Top - 40 &&
        toTop <= isDanger2Top + 40
      ) {
        setIsTime((t) => t - 10);
        setIsDanger2Left(null);
        setIsDanger2Top(null);
      }
      if (
        toSide >= isDanger3Left - 40 &&
        toSide <= isDanger3Left + 40 &&
        toTop >= isDanger3Top - 40 &&
        toTop <= isDanger3Top + 40
      ) {
        setIsTime((t) => t - 10);
        setIsDanger3Left(null);
        setIsDanger3Top(null);
      }
    }
  };
  let isTop = `${toTop}`;
  let isLeft = `${toSide}`;
  let rotate = `${isRotate}`;

  return (
    <div className="grid min-h-screen bg-slate-800">
      {/* Legend */}
      <div className="absolute top-12 right-8 text-slate-100">
        <button
          onClick={() => setIsTimeEnd(true)}
          className=" p-2  rounded-full mb-6 w-full bg-red-700 hover:bg-red-600 transition-all duration-300"
        >
          Restart
        </button>
        <h2 className="mb-8">
          or <b>Escape</b>
          <br></br> to go Restart
        </h2>
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
        <h2>
          <b>E</b> Top Right
        </h2>
        <h2>
          <b>Q</b> Top Left
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

      <div
        className="h-[1000px] w-[1600px] relative bg-transparent   justify-self-center self-center"
        style={{ backgroundColor: "#E2E8F0" }}
      >
        {/* Timer and score*/}

        <div className="absolute text-slate-700 top-4 right-1/2 translate-x-1/2 z-20 flex gap-6 items-end">
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
        {/* Start Info */}
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

        {isInfo ? (
          <div>
            <h2 className="text-center p-4 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-900 text-slate-200">
              1* If your screen resolution is{" "}
              <span className="font-bold">less then 1920x1080</span> and you
              dont have full screen mode option just go with{" "}
              <span className="font-bold">'ctrl' + '-'</span> to fit the game
              screen to your resolution.<br></br>
              You should be able to see game map, restart button with legend on
              the right and Car list on the left.<br></br>
              2* If you want to change car after setting correct highscore click
              'Escape' or 'Restart'.<br></br>
              Do not refresh the page to change your car.<br></br>
              3* Click on car to start! Have Fun!
            </h2>
          </div>
        ) : null}
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

        {/* Danger */}
        {isDangerLeft ? (
          <img
            src="danger.png"
            className="z-40 absolute max-w-8 drop-shadow-md"
            style={{
              bottom: `${isDangerTop}px`,
              left: `${isDangerLeft}px`,
            }}
          />
        ) : null}
        {/* Danger2 */}
        {isDanger2Left ? (
          <img
            src="danger.png"
            className="z-40 absolute max-w-8 drop-shadow-md"
            style={{
              bottom: `${isDanger2Top}px`,
              left: `${isDanger2Left}px`,
            }}
          />
        ) : null}
        {/* Danger3 */}
        {isDanger3Left ? (
          <img
            src="danger.png"
            className="z-40 absolute max-w-8 drop-shadow-md"
            style={{
              bottom: `${isDanger3Top}px`,
              left: `${isDanger3Left}px`,
            }}
          />
        ) : null}
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
