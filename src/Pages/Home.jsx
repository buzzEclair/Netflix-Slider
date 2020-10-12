import React from "react";
import NetflixSlider from "../Components/NetflixSlider";
import "../Scss/Home.scss";

const Home = () => {
  return (
    <>
      <div className="content-home">
        <NetflixSlider title="Netflix Slider" />
      </div>
    </>
  );
};

export default Home;
