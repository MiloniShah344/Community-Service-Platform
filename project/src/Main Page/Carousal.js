// src/Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Paper } from '@mui/material';
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import './MainDashboard.css'

const BootstrapMaterialCarousel = () => {
  return (
    <Carousel class='crsl' indicators={false} controls={true}>
      
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img1}
            alt="First slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img2}
            alt="Second slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img3}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img4}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img5}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={img6}
            alt="Sixth slide"
          />
        </Paper>
      </Carousel.Item>
    </Carousel>
  );
};

export default BootstrapMaterialCarousel;