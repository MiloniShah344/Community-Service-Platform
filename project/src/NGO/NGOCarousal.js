import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Paper } from '@mui/material';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';
import img6 from './img6.jpg';
// import './NGODashboard1.css';

const NGOCarousal = () => (
    <Carousel>
        {[img1, img2, img3, img4, img5, img6].map((img, index) => (
            <Carousel.Item key={index}>
                <img className="d-block w-100" src={img} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
        ))}
    </Carousel>
);
export default NGOCarousal
