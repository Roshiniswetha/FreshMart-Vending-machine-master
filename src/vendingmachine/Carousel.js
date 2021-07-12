import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Typography } from "@material-ui/core";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default () => (
  <AutoplaySlider animation="foldOutAnimation"
    play={true}
    cancelOnInteraction={false} 
    interval={3000}>
    <div>
      <img alt="vending machine" src="https://images.unsplash.com/photo-1542372358-5d022764bd6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80.jpg" />
      <Typography>hi</Typography>
    </div>
    <div>
      <img alt="Fruits" src="https://images.unsplash.com/photo-1569442130407-8d2d49e741db?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80.jpg" />
    </div>
    <div>
      <img alt="Fruits" src="https://cdn.pixabay.com/photo/2017/07/07/12/31/lime-2481346__340.jpg" />
      
    </div>
    <div>
      <img alt="Fruits" src="https://cdn.pixabay.com/photo/2016/08/07/15/02/blueberries-1576409__340.jpg" />
    </div>
    <div>
      <img alt="Fresh fruits" src="https://images.unsplash.com/photo-1496318447583-f524534e9ce1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpg" />
    </div>
  </AutoplaySlider>
);
