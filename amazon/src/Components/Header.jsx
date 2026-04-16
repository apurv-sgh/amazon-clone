import React, { useContext } from "react";
import NavBar from "./NavBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import CartContext from "../ContextApi/CartContext";
import { assetsImg } from "../Data/data";
const Header = () => {

  const { productList } = useContext(CartContext);

  return (
    <>
      <div className="flex justify-between items-center h-15 py-2 fixed left-0 right-0 z-999 bg-[#131921] cursor-pointer">
        <div className=" mx-4 flex justify-center items-center">
          <div className=" w-28 border border-transparent hover:border-white p-2 h-12">
            <Link to={'/'}>
              <img className=" w-full" src={assetsImg.amazonLogo} alt="" />
            </Link>
          </div>
          <div className=" flex justify-center items-center text-sm p-2 h-12 border border-transparent hover:border-white m-0">
            <div>
              <LocationOnIcon />
            </div>
            <div className=" " >
              <span className="text-[12px] text-[#d7cece]">Hello</span>
              <p className="font-semibold capitalize">Select Your Address</p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md">
          <div className="bg-white rounded-md m-1 flex justify-center items-center h-10 border border-transparent focus-within:ring-3 focus-within:ring-[#f08804]">
            <select className="bg-[#dadada] text-black text-[0.9rem] p-2 rounded-l-md h-10 border-0 outline-none cursor-pointer">
              <option defaultValue="all">
                All Categories
              </option>
              <option value="amazon-pharmacy">Alexa Skills</option>
              <option value="amazon-pharmacy">Amazon Devices</option>
              <option value="amazon-pharmacy">Amazon Fashion</option>
              <option value="amazon-pharmacy">Amazon Pharmacy</option>
              <option value="appliances">Appliances</option>
              <option value="mobile-apps">Apps & Games</option>
              <option value="audible">Audible Audiobooks</option>
              <option value="baby">Baby</option>
              <option value="beauty">Beauty</option>
              <option value="books">Books</option>
              <option value="automotive">Car & Motorbike</option>
              <option value="apparel">Clothing & Accessories</option>
              <option value="collectibles">Collectibles</option>
              <option value="computers">Computers & Accessories</option>
              <option value="today-deals">Deals</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="garden">Garden & Outdoors</option>
              <option value="gift-cards">Gift Cards</option>
              <option value="grocery">Grocery & Gourmet Foods</option>
              <option value="health">Health & Personal Care</option>
              <option value="kitchen">Home & Kitchen</option>
              <option value="industrial">Industrial & Scientific</option>
              <option value="jewelry">Jewellery</option>
              <option value="kindle">Kindle Store</option>
              <option value="luggage">Luggage & Bags</option>
              <option value="luxury-beauty">Luxury Beauty</option>
              <option value="movies">Movies & TV Shows</option>
              <option value="digital-music">MP3 Music</option>
              <option value="music">Music</option>
              <option value="musical-instruments">Musical Instruments</option>
              <option value="office-products">Office Products</option>
              <option value="pets">Pet Supplies</option>
              <option value="prime-video">Prime Video</option>
            </select>
            <input
              className="text-xl flex-1 px-3 h-fit text-black border-0 outline-none"
              type="text"
              placeholder="Search Amazon.in"
            />
            <button className="bg-[#f3a847] text-[#131921] px-3 rounded-r-md h-10 border-0 outline-none cursor-pointer">
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className=" mx-4 flex justify-center items-center">
          <div className="text-sm p-2 h-12 border border-transparent hover:border-white flex justify-center items-center">

            <div className=" gap-2 flex justify-center items-center">
              <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/in.svg" />
              <p className="font-semibold capitalize">EN</p>
            </div>
          </div>
          <div className=" px-1">
            <ArrowDropDownIcon />
          </div>

          <div className="text-[12px] p-2 h-12 border border-transparent hover:border-white">
            <span>
              Hello, <span>Sign in</span>
            </span>
            <p className="font-semibold capitalize">Account & List</p>
          </div>
          <div className="text-[12px] p-2 h-12 border border-transparent hover:border-white">
            <span>Returns</span>
            <p className="font-semibold capitalize">& Orders</p>
          </div>
          <Link to={"/CartPage"}>
            <div className="text-sm p-2 h-12 border border-transparent hover:border-white flex justify-center items-center">
              <div className="font-semibold capitalize flex flex-col justify-center items-start">
                <span className=" px-2 py-0 text-base text-[#f08804]">{productList.length}</span>
                <div className=" flex ">
                  <ShoppingCartIcon />
                  <p>Cart</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;
