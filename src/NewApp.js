import React from "react";
import { Route } from "react-router-dom";
import NewMain from "./vendingmachine/NewMain";

export default function NewApp(){
    return(
        <>
        <Route path="/index"  render={()=><NewMain/>}/>
        </>
    )
}