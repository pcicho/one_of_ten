import React from 'react';
import background from '../../../assets/images/startbg.jpg';

const Home = () => (
  <div className="home-page" style={{ backgroundImage: `url(${background})` }}>
    <div className="home-page__wrapper">
      <h4>SHOW</h4>
      <h1 className="home-page__title">Games</h1>
      <h3 className="home-page__subtitle">by Przemyslaw Cichocki</h3>
    </div>
  </div>
);

export default Home;
