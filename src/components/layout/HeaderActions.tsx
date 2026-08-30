import { Link } from "react-router-dom"
import SearchIcon from "@/assets/search-icon.svg";

export const HeaderActions = () => {
    return (
        <div className="flex items-center gap-[24px]">
            <button 
                onClick={() => console.log('click contact us')}
                className="
                    w-[164px] h-[43px] border-[1px] text-[16px] cursor-pointer 
                    font-[500] text-background  uppercase tracking-[0.1em] 
                    transition-all duration-500 ease-out hover:opacity-70
                "
            >
                contact us
            </button>
            <Link
                to='/search'
                className="transition-all duration-500 ease-out hover:opacity-70"
            >
                <img src={SearchIcon} alt="Search" />
            </Link>
        </div>
    )
}