import './styles/App.css'
import Header from './components/layout/Header/Header.jsx'
import ResizablePanel from './components/layout/Panel/ResizablePanel/ResizablePanel.jsx'
import PlayerBar from './components/layout/PlayerBar/PlayerBar.jsx'

function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <ResizablePanel />
      <div className='h-22 w-full py-2'>
        <PlayerBar />
      </div>
    </div>
  )
}

export default App