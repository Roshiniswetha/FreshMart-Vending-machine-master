import React,{useState,useRef} from "react";
import {NavLink} from 'react-router-dom';

export default function Counter({productQuantity,updateQuantity}) {
  let [value,setValue]=useState(1)
  let inputRef=useRef("feedQty")

 const increment=(e)=> {
  console.log("inc",value,productQuantity)
    if(value+1<=productQuantity){
   console.log("inc",e.target.value)
    setValue(Number(value) + 1)
      updateQuantity(value+1);
   }
  }

 const decrement=(e)=> {
    if (value <= 1) {
      return value;
    } else {
        setValue(Number(value) - 1)
        updateQuantity(value-1);
    }
  }

 const feed=(e)=> {
      console.log("feed",inputRef.current.valueAsNumber)
    if(e.target.value>0){
        setValue(inputRef.current.valueAsNumber)
        console.log("value",inputRef.current.valueAsNumber)
      updateQuantity(inputRef.current.valueAsNumber);
    }
  }

  
    return (
      <div className="stepper-input">
        <NavLink to="#" className="decrement" onClick={decrement}>
          –
        </NavLink>
        <input
          ref={inputRef}
          readOnly
          type="number"
          className="quantity"
          value={value}
          onChange={feed}
        />
        <NavLink to="#" className="increment" onClick={increment}>
          +
        </NavLink>
      </div>
    );

}


