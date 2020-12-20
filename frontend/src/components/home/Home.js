import React from "react"
import {
  Redirect,
} from 'react-router-dom'

function Home({isConnected}) {

  if(!isConnected){
    return <Redirect to={"/login"} />
  }

  return <Redirect to={"/listBooks"} />

}

export default Home;