"use client";
import React, { useState } from "react";
import Primary from "./Primary";
import Scheduled from "./Scheduled";
import Register from "./Register";
import Checkout from "./Checkout";

const Home = () => {
  const [currentDiv, setCurrentDiv] = useState(1);

  return (
    <div className="rounded-xl border-[1px] border-gray-400 py-16 shadow-lg shadow-gap-bg">
      <header className="w-full flex items-center justify-center">
        <img
          src="/assets/logo.webp"
          alt="GRSL Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </header>

      {currentDiv === 1 && <Primary setCurrentDiv={setCurrentDiv} />}
      {currentDiv === 2 && <Scheduled setCurrentDiv={setCurrentDiv} />}
      {currentDiv === 3 && <Register setCurrentDiv={setCurrentDiv} />}
      {currentDiv === 4 && <Checkout setCurrentDiv={setCurrentDiv} />}
    </div>
  );
};

export default Home;
