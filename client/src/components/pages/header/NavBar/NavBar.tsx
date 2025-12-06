"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo/logo.png";
// import SearchForm from "../SearchForm/SearchForm";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FiUser, FiPhone } from "react-icons/fi";
import { RiCloseFill, RiMenuAddFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import ResponsiveSearchForm from "../ResponsiveSearchForm/ResponsiveSearchForm";
import ResponsiveNavSidBar from "../ResponsiveNavSidBar/ResponsiveNavSidBar";
import "../NavBar/NavBar.css";
// import { useLanguage } from "@/context/LanguageContext";
import { getShopSidebar } from "@/services/shopSidebar";
import { getUser, setCorrelation } from "@/services/auth";
import UserPopover from "@/shared/UserPopover/UserPopover";
import { TUser } from "@/types";
// import { usePathname } from "next/navigation";

interface NavBarProps {
  userCartProducts: {
    cartDetails: any[];
  };
}

const NavBar: React.FC<NavBarProps> = ({ userCartProducts }) => {
  // const { t, language, switchLanguage } = useLanguage();

  const [showSearch, setShowSearch] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [usersId, setUsersId] = useState<TUser | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // const pathname = usePathname();
  // const isShopPage = pathname === "/shop";

  // Animated placeholder texts
  const placeholders = [
    "Search for products...",
    "Find your perfect item...",
    "What are you looking for?",
    "Discover amazing deals...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getShopSidebar();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const userData = async () => {
      try {
        const user = await getUser();
        setUsersId(user);
      } catch (error) {
        console.error("get user:", error);
      }
    };

    userData();
  }, []);

  const userName = usersId?.name;

  useEffect(() => {
    const setCorrelationAsync = async () => {
      await setCorrelation();
    };
    setCorrelationAsync();
  }, []);

  return (
    <>
      {/* Main Navbar - Sticky */}
      <div className="py-2 fixed w-full z-40 top-0 bg-white shadow ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => setShowSideMenu(!showSideMenu)}
              className="cursor-pointer lg:hidden"
            >
              {showSideMenu ? (
                <RiCloseFill className="text-2xl" />
              ) : (
                <RiMenuAddFill className="text-2xl" />
              )}
            </div>
            <div className="md:w-[80px] w-[50px]">
              <Link href="/">
                <Image
                  src={logo || null}
                  alt="Unicrescent | Best E-commerce platform in BD"
                  width={150}
                  height={60}
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Search Bar with Animated Placeholder */}
          <div className=" hidden lg:block flex-1 max-w-md relative">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
                placeholder=""
              />
              <motion.div
                key={placeholderIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              >
                {placeholders[placeholderIndex]}
              </motion.div>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary transition-colors duration-300">
                <IoSearchOutline className="text-lg" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center lg:gap-2.5 gap-1 ">
            {/* Contact Number */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <FiPhone className="text-primary text-lg" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Call Us</span>
                <span className="text-xs font-semibold text-gray-700">+8801700000000</span>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <div
              onClick={() => setShowSearch(true)}
              className="px-2 py-2 rounded-full bg-primary text-white lg:font-bold font-semibold cursor-pointer lg:hidden hover:bg-primary transition-colors duration-300"
            >
              <IoSearchOutline className="lg:text-lg text-md" />
            </div>

            {/* Cart */}
            <Link href="/cart">
              <div className="px-2 py-2 rounded-full relative bg-primary text-white lg:font-bold font-semibold hover:bg-primary transition-colors duration-300">
                <BsCart2 className="lg:text-lg text-md" />
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="-top-2 -right-2 absolute w-5 h-5 text-xs text-white flex items-center justify-center rounded-full bg-primary"
                >
                  {userCartProducts?.cartDetails?.length || 0}
                </motion.p>
              </div>
            </Link>

            {/* User */}
            <div>
              {userName ? (
                <div className="p-1.5 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors duration-300">
                  <UserPopover />
                </div>
              ) : (
                <Link href="/login">
                  <div className="px-2 py-2 rounded-full bg-primary text-white lg:font-bold font-semibold hover:bg-primary transition-colors duration-300">
                    <FiUser className="lg:text-lg text-md" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navbar - Categories (Smaller) */}

      <AnimatePresence>
        {showSearch && (
          <ResponsiveSearchForm onClose={() => setShowSearch(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSideMenu && (
          <ResponsiveNavSidBar onClose={() => setShowSideMenu(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;