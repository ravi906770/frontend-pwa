import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";
import { useAuth } from '../../context/authContext';
import useAxiosPrivate from '../../axios/axiosPrivate';

type NotificationData = {
    name: string,
    description: string,
    payment: number,
    date: string
}

type Props = {
    notificationData? :  number
}

const Menu : React.FC<Props> = ({notificationData} : Props) => {

    const axiosPrivate = useAxiosPrivate()
    const [activeTab, setActiveTab] = useState('');
   



   

    const {logout} = useAuth()

    const handleTabClick = (tabName : string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="min-h-screen  flex flex-row">
            <div className="flex flex-col w-56 rounded-r-3xl overflow-hidden">
                <ul className="flex flex-col py-4">
                    <li>
                        <Link to='/dashboard' className={`flex flex-row items-center h-12 transform hover:translate-x-2 hover:bg-blue-200 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'dashboard' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('dashboard')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <RxDashboard />
                            </span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/transaction" className={`flex flex-row items-center h-12 transform hover:bg-blue-200  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'transaction' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('transaction')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <AiOutlineTransaction />
                            </span>
                            <span className="text-sm font-medium">Transaction</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/category" className={`flex flex-row items-center h-12 transform hover:bg-blue-200  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'category' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('category')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <MdOutlineCategory />
                            </span>
                            <span className="text-sm font-medium">Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" className={`flex flex-row items-center h-12 transform hover:bg-blue-200  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'account' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('account')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <MdAccountBalance />
                            </span>
                            <span className="text-sm font-medium">Account</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/split" className={`flex flex-row items-center hover:bg-blue-200  h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'profile' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('profile')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <FaAmazonPay />
                            </span>
                            <span className="text-sm font-medium">Split Bill</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/setting" className={`flex flex-row items-center  hover:bg-blue-200  h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'setting' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('setting')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <IoSettingsOutline />
                            </span>
                            <span className="text-sm font-medium">Setting</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notification" className={`flex flex-row items-center h-12 transform  hover:bg-blue-200  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'notification' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('notification')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <IoMdNotificationsOutline />
                            </span>
                            <span className="text-sm font-medium">Notifications</span>
                            {/* <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">{notificationData}</span> */}
                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={`flex flex-row items-center h-12 transform  hover:bg-blue-200  hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'faq' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('faq')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <FaRegQuestionCircle />
                            </span>
                            <span className="text-sm font-medium">Ask a Question?</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className={`flex flex-row items-center h-12  hover:bg-blue-200  transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white ${activeTab === 'login' ? 'bg-blue-200 text-white' : ''}`} onClick={() => handleTabClick('login')}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <AiOutlineLogout />
                            </span>
                            <span className="text-sm font-medium" onClick={()=>logout()}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
