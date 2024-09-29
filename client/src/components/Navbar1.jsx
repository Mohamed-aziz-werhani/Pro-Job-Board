import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { users } from "../utils/data";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Navbar1 = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };
  const logout=(e)=>{
    e.preventDefault();
   dispatch(Logout());
   navigate("/user-auth")
   console.log("hello");
  }

  return (
    <>
      <div className='relative bg-[#f7fdfd] z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-blue-600 font-bold text-xl'>
              Job<span className='text-[#1677cccb]'>Finder</span>
            </Link>
          </div>

          <ul className='hidden lg:flex gap-10 text-base'>
            <li>
              <Link to='/'>Find Job</Link>
            </li>
            <li>
              <Link to='/companies'>Companies</Link>
            </li>
            <li>
              <Link to='/upload-job'>Upload Job</Link>
            </li>
            <li>
              <Link to='/about-us'>About</Link>
            </li>
          </ul>

          <div className='hidden lg:block'>
           
          <Link to='/user-auth'>
                <CustomButton
                  title='Log Out'
                  containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'
                  onClick={logout}
                />
             </Link>
         
          </div>

          <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          <Link to='/' onClick={handleCloseNavbar}>
            Find Job
          </Link>
          <Link to='/companies' onClick={handleCloseNavbar}>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType === "seeker" ? "applly-gistory" : "upload-job"
            }
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar}>
            About
          </Link>

          <div className='w-full py-10'>
          
          <Link to='/user-auth'>
                <CustomButton
                  title='Log Out'
                  containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                  onClick={ logout}
                /> 
             </Link>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar1;
