import { House, Bell, UsersRound, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/Button/Button"
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import TunifyLogo from "@/assets/TunifyLogo.webp"

const Header = () => {
    return (
        <header className=' bg-black grid grid-cols-[auto_1fr_auto] items-center gap-3 px-6 py-3 relative'>
            <div className="z-2">
                <h1
                    className="flex items-center"
                >
                    <a href="/" className="inline-block">
                        <img src={TunifyLogo} alt="Tunify Logo" className="h-11 w-11 cursor-pointer object-contain" />
                    </a>
                </h1>
            </div>
            <div className="">
            </div>
            <div className="flex items-center absolute w-screen justify-center gap-2">
                <Button variant="ghost" size="icon-lg" className="rounded-full text-white/80 hover:text-white cursor-pointer bg-fill border border-transparent hover:border-purple-950/30 hover:bg-fill-hover">
                    <House className="size-7"/>
                </Button>
                <SearchInput/>
            </div>
            <div className="items-center gap-4 z-2">
                <Button variant="outline" size="icon-lg" className="rounded-full text-white cursor-pointer">
                    <CircleUserRound className="size-7"/>
                </Button>
            </div>
        </header>
    );
}

export default Header;