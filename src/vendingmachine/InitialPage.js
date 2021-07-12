import React, {useEffect,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Images} from "../images.js"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Counter from "./Counter"
import "react-image-lightbox/style.css";
import Image from "react-image-enlarger";
// import Carousel from "./Carousel"

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "55px"
      },
      maxWidth: 345,
    },
    media: {
      height: 270,
    },
  }));

export default function InitialPage({addToCart}){

    const classes = useStyles();
    const url = "http://localhost:8080/api/machine"
    const [val, setVal] = useState([]);
    let path;
    let items = [];
    let [quantity,setQuantity]=useState(1)
    let [isAdded,setIsAdded]=useState(false)

    useEffect(() => {
      const abortController = new AbortController();
    const signal = abortController.signal;
        fetch([url], {
          method: "GET"
        }, { signal: signal })
          .then((response) => response.json())
          .then((response) => {
            setVal(response);
          })
          .catch((err) => {
            console.log("error", err);
          });
          return function cleanup() {
            abortController.abort();
          };
      }, [])

      
      const updateQuantity = (value)=>{
        console.log("updatequantity",value)
        setQuantity(value)
      }

     const handleClick=(image, data, quantity)=> {
          addToCart(image, data, quantity)
            setIsAdded(true)
          
            setTimeout(() => {
              setIsAdded(false)
            }, 3500);
      }
      function SingleSource({ src,name }) {
        const [zoomed, setZoomed] = React.useState(false);
      
        return (
          <div style={{ margin: "0.25rem" }}>
            <Image
              style={{ width: "262px", height: "165px" }}
              zoomed={zoomed}
              src={src}
              alt={name}
              title={name}
              onClick={() => setZoomed(true)}
              onRequestClose={() => setZoomed(false)}
            />
          </div>
        );
      }

  return(
  <div>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#fafafa', height: '17vh' }} />
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
        <Typography component="div" style={{ backgroundColor: '#fafafa', height: '7vh' }} />
      </Container>
    </React.Fragment>
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
      <Grid container spacing={6}>
        {
          (Object.entries(val).map(data => {
            let img=(data[1].name).split("-")
            let c=0
            Images.map(im => {
              if ((im.name == img[0])||((im.name).toLowerCase()==img[0])||((im.name).toUpperCase()==img[0])||((im.name).toLowerCase()==(img[0]).toLowerCase())) {
                path = im.url
                c=1
              }
            }
          )
          if(c==0)
              {
                path="https://www.uokpl.rs/fpng/f/217-2178808_transparent-salad-clipart.png"
              }
          items.push(data[1])
          return (            
          <Grid  item xs={3} >
              <Card style={{ height: "370px" }}  >
                  <div style={{ display: "flex" ,height:"185px",position:"initial"}}>
                    <SingleSource  key={path} src={path} name={data[1].name} />
                </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginLeft: "35px",width: "220px"}}>
                      {data[1].name} 
                    </Typography>
                    <Typography variant="body2" className="product-price" color="textSecondary" component="h2" style={{marginLeft: "35px", width: "100px"}}>
                      {data[1].cost} INR
                    </Typography>
                    <Typography variant="body2" className="product-price" color="textSecondary" component="h2" style={{marginLeft: "35px", width: "100px"}}>
                     Quantity: {data[1].quantity} 
                    </Typography>
                    <Typography variant="body2" className="product-price" color="textSecondary" component="h2" style={{marginLeft: "35px", width: "100px"}}>
                     Shelf life: {data[1].lifetime} 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{marginLeft: "15px", width: "120px"}}>
                  <Counter productQuantity={data[1].quantity} updateQuantity={updateQuantity} />
                  </div>
                  <div className="product-action"  >
                    <button
                      className={!isAdded ? "" : "added"}
                      type="button"
                      onClick={() => handleClick(path,
                        data[1],
                        quantity)}
                    >
                      {!isAdded ? "ADD TO CART" : "ADD  TO CART"}
                    </button>
                  </div>
                  </CardActions>
              </Card>
            </Grid>
          )
          }
        )
        )
      }
      </Grid>
    </Container>
  </React.Fragment>
  </div>
    )
}
