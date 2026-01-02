import React from "react"
import Header from "@/components/layout/Header/Header.jsx"
import Resizable from "@/components/ui/Resizable/Resizable.jsx"
import PlayerBar from "@/components/layout/PlayerBar/PlayerBar.jsx"
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
