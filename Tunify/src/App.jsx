import Header from "./components/Layout/Header/Header"
import Resizable from "@/components/ui/Resizable/Resizable"
import PlayerBar from "./components/Layout/PlayerBar/PlayerBar"

function App() {

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Resizable />
        <PlayerBar />
      </div>
    </>
  )
}

export default App
