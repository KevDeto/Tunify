import React from "react";
import { House, Bell, UsersRound, CircleUserRound } from "lucide-react";
import { Tooltip } from "react-tooltip";
import Button from "../../ui/Button/Button.jsx";
import Input from "../../ui/Input/Input.jsx";
import TunifyLogo from "../../../assets/Tunify.webp";
import "react-tooltip/dist/react-tooltip.css";

function Header() {
  return (
    <header className=' bg-background grid grid-cols-[auto_1fr_auto] items-center gap-3 px-6 py-3 relative'>  
      <h1 
        className="flex items-center z-2"   
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Tunify">
        <a href="/" className="inline-block">
          <img src={TunifyLogo} alt="Tunify Logo" className="h-11 w-11 cursor-pointer object-contain"/>
        </a>
      </h1>
      <div>
      </div>
      <div className='flex items-center absolute w-screen justify-center gap-2'>
        <Button 
          icon={<House className="h-6 w-6"/>} 
          variant='primary' 
          iconOnly={true} 
          size='lg' 
          aria-label="Home" 
          className="h-11 w-11"
          data-tooltip-id="tooltip_home"
          data-tooltip-content="Inicio">
        </Button>
        <Input/>
      </div>
      <div className='flex items-center gap-4 z-2'>
        <Button 
          variant='text' 
          size='text'
          data-tooltip-id="tooltip_premium"
          data-tooltip-content="Cambiar a premium">
            Explorar Premium
        </Button>
        <Button 
          icon={<Bell className="h-5 w-5"/>} 
          variant='iconWithoutBg' 
          size='icon' 
          iconOnly={true} 
          aria-label="Notifications"
          data-tooltip-id="tooltip_notifications"
          data-tooltip-content="Novedades">
        </Button>
        <Button 
          icon={<UsersRound className="h-5 w-5"/>} 
          variant='iconWithoutBg' 
          size='icon' 
          iconOnly={true} 
          aria-label="Friends"
          data-tooltip-id="tooltip_friends"
          data-tooltip-content="Actividad de amigos">
        </Button>
        <Button 
          icon={<CircleUserRound className="h-full w-full"/>} 
          variant='accesAcount' 
          size='icon' 
          iconOnly={true} 
          aria-label="Profile" 
          className="h-11 w-11"
          data-tooltip-id="tooltip_user"
          data-tooltip-content="Usuario">
        </Button>
      </div>
      <Tooltip id="my-tooltip" className="!px-2 !py-1 !text-xs !border !border-white rounded-0" noArrow={true}/>
      <Tooltip id="tooltip_home" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
      <Tooltip id="tooltip_search" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
      <Tooltip id="tooltip_premium" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
      <Tooltip id="tooltip_notifications" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
      <Tooltip id="tooltip_friends" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
      <Tooltip id="tooltip_user" className="!px-2 !py-1 !text-md !bg-section-bg" noArrow={true}/>
    </header>
  );
}

export default Header;