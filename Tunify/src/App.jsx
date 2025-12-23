import Header from "./components/Layout/Header/Header"
import Resizable from "@/components/ui/Resizable/Resizable"

function App() {

  return (
    <>
      <div className="flex flex-col h-screen">      
        <Header/>
        <Resizable />
      </div>
    </>
  )
}

export default App
