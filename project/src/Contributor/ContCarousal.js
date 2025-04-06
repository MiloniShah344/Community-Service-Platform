// src/Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Paper } from '@mui/material';
import SliderImg1 from './images/SliderImg1.jpg'
import SliderImg2 from './images/SliderImg2.jpg'
import SliderImg3 from './images/SliderImg3.jpg'
import SliderImg4 from './images/SliderImg4.jpg'
import SliderImg5 from './images/SliderImg5.jpg'
import './ContCarousal.css'

const BootstrapMaterialCarousel = () => {
  return (
    <Carousel class='crsl' indicators={false} controls={true}>
      
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={SliderImg1}
            alt="First slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={SliderImg2}
            alt="Second slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={SliderImg3}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={SliderImg4}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <img
            className="d-block w-100 SlideImage"
            src={SliderImg5}
            alt="Third slide"
          />
        </Paper>
      </Carousel.Item>
      {/* <Carousel.Item interval={2000}>
        <Paper class="Corousel1">
          <SliderImg
            className="d-block w-100 SlideImage"
            src={img6}
            alt="Sixth slide"
          />
        </Paper>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default BootstrapMaterialCarousel;