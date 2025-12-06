"use Client";
import React from "react";
import {
  FaFacebookF,
  FaRegCreditCard,
  FaTruck,
  FaYoutube,
} from "react-icons/fa";
import { FaRegMessage, FaRightLeft } from "react-icons/fa6";
import Link from "next/link";
import DownFooter from "../../DownFooter/DownFooter";
interface FooterProps {
  userCartProducts: {
    cartDetails: any[]; 
  };
}


const Footer: React.FC<FooterProps> = ({ userCartProducts }) => {
  const quickLink = [
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  const information = [
    {
      name: "Privacy Policy",
      link: "/privacyPolicy",
    },
    {
      name: "Return Policy",
      link: "/returnPolicy",
    },
    {
      name: "Terms & Condition",
      link: "/terms-condition",
    },
  ];

  return (
    <div className="relative">
    
      <div className="Container bg-[#D9D9D9] py-10 lg:py-16">
        <div className=" flex flex-col lg:flex-row justify-between space-y-5">
          <div>
            <div className="text-black  mb-5 font-psBold ">
              Contact Info
            </div>
            <div className="text-black text-md lg:text-lg flex flex-col space-y-1">
              <div>WhatsApp: 01700000000</div>
              <div>Phone: 01700000000</div>
              <div>email: a..............@gmail.com</div>
              <div>Address: Miprur 2, Oposite of Stadium Gate no. 1. Dhaka</div>
            </div>
          </div>
          <div>
            <div className="text-black  mb-5 text-xl">
              Quick Links
            </div>
            <ul className="text-black text-xl">
              {quickLink.map((item, index) => (
                <div key={index}>
                  <Link href={item.link}>
                    <li className="my-1 relative group cursor-pointer">
                      <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:text-black text-md lg:text-lg">
                        {item.name}
                      </span>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Infromation
            </div>
            <ul className="text-black text-xl">
              {information.map((item, index) => (
                <div key={index}>
                  <Link href={item.link}>
                    <li className="my-1 relative group cursor-pointer">
                      <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:text-black text-md lg:text-lg">
                        {item.name}
                      </span>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Social Media
            </div>
            <div className="">
              <div className="flex lg:justify-center lg:items-center gap-2 mt-4">
                <a
                  href="https://www.facebook.com/share/1BfwmV2KcS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-[#2563EB] rounded text-white border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://youtube.com/@silkthread-d3v?si=oA7cwongy2QewMZ_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-[#F60000] rounded text-[#fff] border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="youtube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="http://tiktok.com/@silk.thread5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-black rounded text-white border border-white/0 hover:scale-95 hover:border-white hover:border duration-300"
                  aria-label="tiktok"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.5 2c.7 0 1.4 0 2 .2 0 2.3 1.8 4.1 4.1 4.2v3.1c-1.5 0-3-.5-4.2-1.4v6.8c0 3.3-2.7 6-6 6S2.5 18.2 2.5 15s2.7-6 6-6c.5 0 1 .1 1.5.2V12c-.5-.2-1-.3-1.5-.3-1.7 0-3 1.4-3 3s1.3 3 3 3 3-1.4 3-3V2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#37383F] text-white text-center py-4 md:pb-4 pb-[80px]">
        Copyright © 2025 ANF Meat. All Right Reserved. Developed by{" "}
        <a target="_blank" href="https://okobiz.com/">
          Okobiz
        </a>
      </div>
      <DownFooter userCartProducts={userCartProducts} />
    </div>
  );
}

export default Footer;
