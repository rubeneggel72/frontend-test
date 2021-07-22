import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import offer from "../image/c01.webp";
import fish from "../image/c02.webp";
import arrival from "../image/c03.webp";

const ProductCarousel = () => {
  
  return (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <img src={offer} alt="First slide" />
        <Carousel.Caption>
          <h3 style={{color:"white"}}>Ofertas</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={arrival} alt="second slide" />

        <Carousel.Caption>
          <h3 style={{color:"white"}}>Productos Nuevos</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={fish} alt="Third slide" />
        <Carousel.Caption>
          <h3 style={{color:"white"}}>Lo mas vendido</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
