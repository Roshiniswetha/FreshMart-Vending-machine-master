import React, {useEffect,useState,useRef} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Images} from "../images.js"
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import "../scss/style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Selection from "./selection"
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import EmptyCart from "./EmptyCart"
import InitialPage from "./InitialPage"
import Search from "./Search"
import SearchMenu from "./SearchMenu"
import SelectedItems from './SelectedItems.js';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Scrollbars } from 'react-custom-scrollbars';
import App from "../App";
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#e0f2f1",
      },
    },
  });
  
  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
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
  export default function NewMain() {
    
    const classes = useStyles();
    let [totaltoshow, set_totaltoshow] = useState(0);
    const[count,setCount]=useState(0)
    let path;
    const url = "http://localhost:8080/api/machine"
    const [val, setVal] = useState([]);
    const [cartitems] = useState([]);
    let [showCart,setShowCart]=useState(false)
    let inputRef = useRef("cartPreview")
    let [term,setTerm]=useState("")

    
    useEffect(() => {
      const abortController = new AbortController();
    const signal = abortController.signal;
      fetch([url], {
        method: "GET"
      },{ signal: signal })
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
    const addToCart=(image,data,quantity)=>{
       console.log("cart",data,quantity)
      let index=0
      let quan=0
      if(cartitems.map(item=>{
          if(item.name===data.name){
              quan=data.quantity
              data.quantity=item.quantity+quantity
          }
      }))
      if(cartitems.length==0){
          data.quantity=quantity
      }
      var flag=0
      
      if(cartitems.length==0){
        setCount(count+1)
        cartitems.push(data,image)
        calc_total(data.cost*data.quantity)
      }
      else{
        cartitems.map(cart=>{
          if(cart.name==data.name)
          {
            flag=1
           index = cartitems.indexOf(cart)
          }
        })
        if(flag==0){
          data.quantity=quantity
          cartitems.push(data,image)
          console.log("data",data)
          setCount(count+1)
          calc_total(data.cost*data.quantity)
          
        }
        else if(flag==1){
         
           if(quan>=data.quantity){
            console.log("if",quan,data.quantity)
            cartitems.splice(index, 2);
            cartitems.push(data,image)
            console.log("data",data)
            setCount(count)
            calc_total(data.cost*data.quantity)
           }
          else {
            console.log("else",quan,data.quantity)
            cartitems.splice(index, 2);
            data.quantity=quan
            cartitems.push(data,image)
            console.log("data",data)
            setCount(count)
            calc_total(data.cost*data.quantity)
           }
        }
      }
    }

    const calc_total=(cost)=>{
      totaltoshow+=parseInt(cost) 
       console.log("totaltoshow",totaltoshow)
      set_totaltoshow(totaltoshow)
    }
  
    
    const handleOpenCart =()=>{
      setShowCart(!showCart)
    }

   const removeProduct=(id, e)=> {
      let index = cartitems.findIndex(x => x.id == id);
      cartitems.splice(index, 2);
      setCount(count-1)
      return cartitems
    }
    
    let ItemsinCart;
    ItemsinCart = cartitems.map(product => {
      let img=""
      if(product.name!=undefined){
        img=(product.name).split("-")
      }
      let c=0
            Images.map(im => {
        if ((im.name == img[0])||((im.name).toLowerCase()==img[0])) {
          path = im.url
          c=1
        }
      })
      if(c==0)
      {
        path="https://www.uokpl.rs/fpng/f/217-2178808_transparent-salad-clipart.png"
      }
      if(product.cost>=0){   
      return (
        <div>
        <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Typography component="div" style={{ backgroundColor: '#fafafa', height: '2vh' }} />
    </Container>
  </React.Fragment>
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={path} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.cost}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity } {product.quantity  > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.cost}</p>
          </div>
          <NavLink to="#"
            className="product-remove"
            onClick={()=>{removeProduct(product.id)}}
          >
            ×
          </NavLink>
        </li>
        </div>
      );
        }
    });
    let view;
    if (ItemsinCart.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {ItemsinCart}
        </CSSTransitionGroup>
      );
     }
     const searchValue=(value)=>{
      setTerm(value);
     }
    return (
      <> 
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <AppBar
                  position="fixed"
                  color="primary" 
                >
        <Toolbar align="center">
          <Typography variant="h6" noWrap style={{marginRight: "inherit"}} >
              Fresh Mart Vending Machine 
          </Typography>  
          <SearchMenu style={{marginRight:"auto"}}
                    searchValue={searchValue}
                  />
          <div align="right">
          <Tooltip title="Cart" aria-label="Cart">
                <Fab color="primary" className={classes.fab}>
            <Button onClick={handleOpenCart} > 
              <IconButton  color="inherit">
              
                <Badge badgeContent={count} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                
              </IconButton>
            </Button>
            </Fab>
              </Tooltip>
          </div>
          <div align="right">
          <NavLink to="/index/settings"> 
            <Tooltip title="Settings" aria-label="Settings">
              <Fab color="primary" className={classes.fab}>
                <Button> 
                  <SettingsIcon/>
                </Button>
              </Fab>
            </Tooltip>
          </NavLink>
          </div>
         
        </Toolbar>
      </AppBar>
      
        <Switch>
              <Route
                  exact
                  path="/"
                  component={() => (
                    <InitialPage addToCart={addToCart} 
                    />
                  )}
                />
                <Route 
                  path="/index/Search"
                  component={() => (
                    <Search term={term} list={val} addToCart={addToCart}/>
                  )}
                />
                <Route path="/index/settings" 
                component={() => (
                  <Selection/>
                )}
              />
              <Route path="/index/cart" 
                component={() => (
                  <SelectedItems cartitems={cartitems} total={totaltoshow}/>
                )}
              />
              <Route
                  exact
                  path="/index/App"
                  component={() => (
                    <App/>
                  )}
                />
        </Switch>
            <div
              className={
               showCart ? "cart-preview active" : "cart-preview"
              }
              ref={inputRef}
            >
               <Scrollbars style={{ height: 300 }}>{view}</Scrollbars>
                  <div className="action-block">
                    <NavLink to="/index/cart">
                      <button
                        type="button"
                        className={cartitems.length > 0 ? " " : "disabled"}
                        onClick={handleOpenCart}
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    </NavLink>
                  </div>
            </div>
    </ThemeProvider>
    </BrowserRouter>
  </>
  )
  }