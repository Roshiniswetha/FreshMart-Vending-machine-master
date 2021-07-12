import React, { useState,useEffect } from "react";
import NoResults from "./NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import SearchPage from "./SearchPage"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Search({term,addToCart}){
  
  const url = "http://localhost:8080/api/machine"
  let [list,setList]=useState([])
  useEffect(() => {
    const abortController = new AbortController();
  const signal = abortController.signal;
      fetch([url], {
        method: "GET"
      }, { signal: signal })
        .then((response) => response.json())
        .then((response) => {
          setList(response);
        })
        .catch((err) => {
          console.log("error", err);
        });
        return function cleanup() {
          abortController.abort();
        };
    }, [])
    let x;    
    function cutterm(term) {
     let matchterm=new RegExp('(?={3,5})a?p?p?l?e?')
     console.log(term.match(matchterm))
    }

    function searchingFor(term) {
      // let str=term
      // let res=str.match((?=[hello]{3,5})h?e?l?l?o?)
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    const addingOnSearch=(image,data,quantity)=>{
      addToCart(image,data,quantity)
    }
   let productsData = list
       .filter(searchingFor(term))
      //  .filter(cutterm(term))
      .map(product => {
        return (
          <div>
          <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#ffffff00', height: '16vh' }} />
    </Container>
    </React.Fragment>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* <Carousel /> */}
      </Container>
    </React.Fragment>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs">
        {/* <Typography component="div" style={{ backgroundColor: '#fafafa', height: '6vh' }} /> */}
      </Container>
    </React.Fragment>
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Grid container spacing={3}>
          <SearchPage product={product} addingOnSearch={addingOnSearch}/>
          </Grid>
    </Container>
  </React.Fragment>
  </div>
        );
      });

    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      // view = <LoadingProducts />;
      // console.log("hi")
    } else if (productsData.length <= 0 && term) {
      view = <NoResults />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          {productsData}
        </CSSTransitionGroup>
      );
    }
    return <div >
           
      {view}
      
  </div>;
  }


 