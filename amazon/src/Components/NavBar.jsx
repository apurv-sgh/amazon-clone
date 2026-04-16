import React from "react";
import { useContext } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LeftBar from "./LeftBar";
import CartContext from "../ContextApi/CartContext";
import { NavBarItem } from "../Data/data";
const navbarAd = "/navbar-ad.jpg";

const NavBar = () => {

  const { openButton } = useContext(CartContext);

  return (
    <>
      <div className="flex justify-between items-center bg-[#232f3e] pt-16 pl-4 pr-0">

        {/* LEFT SECTION */}
        <div className="flex items-center cursor-pointer gap-2">
          <div onClick={openButton} className="flex items-center gap-1">
            <MenuIcon />
            <span className="font-semibold">All</span>
          </div>
          <LeftBar />
        </div>

        {/* CENTER SECTION */}
        <div className="flex-1 ml-4">
          <ul className="flex items-center">
            {NavBarItem.map((item) => (
              <li
                key={item.id}
                className="px-3 py-3 text-sm font-semibold border border-transparent hover:border-white cursor-pointer whitespace-nowrap"
              >
                {item.MenuItem}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SECTION (YOUR IMAGE) */}
        <div className="hidden md:block">
          <img
            src={navbarAd} 
            alt="Offer"
            className="h-9 object-cover cursor-pointer"
          />
        </div>

      </div>
    </>
  );
};

export default NavBar;