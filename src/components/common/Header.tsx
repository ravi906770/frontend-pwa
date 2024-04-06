import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import logo from "../../assets/logo2.png"
import userImg from "../../assets/avatar-icon.png"
import userImg2 from "../../assets/userimg.jpg"
import bg from "../../assets/header-bg.png"
import { useAuth } from "../../context/authContext";




const navLinks = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    // {
    //     path: '/transaction',
    //     display: 'Transaction'
    // },
    // {
    //     path: '/category',
    //     display: 'Category'
    // },
    {
        path: '/blog',
        display: 'Blog'
    },
    {
        path: '/contact',
        display: 'Contact'
    },
    {
        path: '/feedback',
        display: 'Feedback'
    },
    // {
    //     path: '/faq',
    //     display: 'FAQ'
    // }
]

const Header: React.FC = () => {

    const { auth  , logout} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

  
    const handleDashboard = ()=>{
        setShowDropdown(!showDropdown)
    }


    const handleLogout = () => {


       
        logout(); // Trigger the logout function
        // console.log("++++++++++");
        // console.log(auth)
      };


    const headerRef = useRef<HTMLElement>(null);

    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current?.classList.add('sticky_header');
            } else {
                headerRef.current?.classList.remove('sticky_header');
            }
        };

        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const toggleMenu = () => menuRef.current?.classList.toggle('show_menu');

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (

        <header className="header flex items-center bg-no-repeat bg-cover bg-center w-full h-[100px] leading-[100px]" style={{ backgroundImage: `url(${bg})` }}>
        <div className="container max-w-full w-[1440px] px-5 mx-auto">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <div>
                        <img src={logo} alt="" className="w-[250px] h-[30px]" />
                    </div>
                </Link>
                <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                    <ul className="menu flex items-center gap-[2.7rem]">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink to={link.path} className={(navClass) => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[600]'} >
                                    {link.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <div className="">
                        <figure className="w-[35px] h-[35px] rounded-full cursor-pointer" onClick={toggleDropdown}>
                            <img className="w-full rounded-full" src={auth.access_token ? userImg : userImg2} alt="" />
                        </figure>
                        {showDropdown && (
                           <ul className="absolute top-15 w-36  bg-white border rounded shadow-md">
                           <li className="py-2 px-4 hover:bg-gray-100 transition duration-300">
                            {auth.access_token ? ( <Link to="/dashboard" className="block text-sm text-gray-800 hover:text-gray-900"><button onClick={handleDashboard}>Dashboard</button></Link>):( <Link to="/error404" className="block text-sm text-gray-800 hover:text-gray-900"><button onClick={handleDashboard}>Dashboard</button></Link>)}
                              
                           </li>
                           <li className="py-2 px-4 hover:bg-gray-100 transition duration-300">
                           {auth.access_token ? ( <Link to="/setting" className="block text-sm text-gray-800 hover:text-gray-900"><button onClick={handleDashboard}>Settings</button></Link>):( <Link to="/error404" className="block text-sm text-gray-800 hover:text-gray-900"><button onClick={handleDashboard}>Settings</button></Link>)}
                           </li>
                       </ul>
                        )}
                    </div>
                    {auth.access_token ? (
                        <>
                        <Link to="/login">
                        <button onClick={handleLogout} className="bg-primaryColor hover:bg-green-400 text-white py-2 px-6 font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                                Logout
                            </button>
                        </Link>
                            
                        </>
                    ) : (
                        <Link to="/register">
                            <button className="bg-primaryColor hover:bg-green-400 text-white py-2 px-6 font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                                SignUp
                            </button>
                        </Link>
                    )}
                    <span className="md:hidden" onClick={toggleMenu}>
                        <BiMenu className="w-6 h-6 cursor-pointer" />
                    </span>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header