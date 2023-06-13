import React, { useEffect } from "react";
import Allsports from "../../Component/AllSports/Allsports";
import Banner from "../../Component/Banner/Banner";
import Classes from "../../Component/Classes/Classes";
import Instructors from "../../Component/Instructors/Instructors";

const titleHook = (title) => {
  useEffect(() => {
    document.title = `Sky-${title}`;
  }, [title]);
};

const Home = () => {
  titleHook("Learning Never Ends");
  return (
    <div className="mt-8">
      <Banner />
      <Classes />
      <Instructors />
      <Allsports />
    </div>
  );
};

export default Home;
