import React from "react"
import Header from "./components/Layout/Header/Header"
import Resizable from "@/components/ui/Resizable/Resizable"
import PlayerBar from "./components/Layout/PlayerBar/PlayerBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Resizable />
        <div className="">
          <Routes>
            <Route path="/" element=""/>
            <Route path="/playlist/:id" element="" />
          </Routes>
        </div>
        <PlayerBar />
      </div>
    </Router>
  )
}

export default App
