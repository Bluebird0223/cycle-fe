import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
// import { languages } from "../../../utils/language";
// import { currencies } from "../../../utils/currencies";
import { categories } from "../../../utils/categorySubcategory";

const MobileMenu = ({ setIsMobileNavVisible }) => {
  const [isExtendedNavVisible, setIsExtendedNavVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const navlinks = [
    {
      name: "Home",
      url: "/home",
      activeUrl: "home",
      isDropdown: false,
    },
    {
      name: "About Us",
      url: "/about",
      activeUrl: "about",
      isDropdown: false,
    },
    {
      name: "Shop",
      url: "/products",
      activeUrl: "products",
      isDropdown: true,
    },
    {
      name: "Contact Us",
      url: "/contact",
      activeUrl: "contact",
      isDropdown: false,
    },
    {
      name: "Cart",
      url: "/cart",
      activeUrl: "cart",
      isDropdown: false,
    },
    {
      name: "My Account",
      url: "/account",
      activeUrl: "account",
      isDropdown: false,
    },
  ];

  // useEffect to remove scroll when mobile nav is open
  useEffect(() => {
    document?.documentElement?.classList?.add("model-open");
    return () => {
      document?.documentElement?.classList?.remove("model-open");
    };
  }, []);

  return (
    <aside className="w-full h-[100vh] fixed top-0 left-0 z-50 md:hidden">
      <nav className="bg-white w-[375px] h-full p-7">
        <div className="close-icon text-3xl">
          <CloseIcon
            className="text-primary-blue cursor-pointer border rounded-sm"
            fontSize="inherit"
            onClick={() => {
              setIsMobileNavVisible(false);
            }}
          />
        </div>

        {/* main links  */}
        {!isExtendedNavVisible && (
          <ul className="pt-5 capitalize">
            {navlinks?.map((link, i) => (
              <li
                key={i}
                className={`font-["Branch"]  hover:font-semibold font-medium text-base tracking-wide text-primary-blue relative border-b`}
              >
                <Link
                  className="flex py-4 items-center justify-between"
                  to={link?.isDropdown ? "#" : link?.url}
                  onClick={()=>setIsExtendedNavVisible(false)}
                >
                  {link?.name}
                  {link?.isDropdown ? (
                    <ChevronRightIcon
                      fontSize="inherit"
                      className="text-primary-blue"
                    />
                  ) : (
                    <></>
                  )}
                </Link>
              </li>
            ))}
            <li
              className={`font-["Branch"] py-4 flex items-center gap-5 font-medium text-base tracking-wide text-primary-blue relative border-b`}
            >
              {/* <select
                className="rounded border p-1 bg-gray-100 capitalize"
                name="language"
                id=""
              >
                {languages?.map((data, index) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
              <select
                className="rounded border p-1 bg-gray-100 capitalize"
                name="currency"
                id=""
              >
                {currencies?.map((data, index) => (
                  <option value="inr">
                    {data?.symbol}&nbsp;{data?.currencyName}
                  </option>
                ))}
              </select> */}
            </li>
            <li
              className={`font-["Branch"]  py-4 flex items-center gap-5 font-medium text-base tracking-wide text-primary-blue relative border-b`}
            >
              <button className="bg-primary-blue py-2 text-white rounded px-1 text-xs">
                GET E-BROCHURE
              </button>
            </li>
          </ul>
        )}
        {/* main links  */}

        {/* extended categories links  */}
        {isExtendedNavVisible && (
          <ul className="pt-5 capitalize">
            {/* back li  */}
            <li
              onClick={() => {
                setIsExtendedNavVisible(false);
              }}
              className={`group transition-all hover:text-gray-900 cursor-pointer text-sm tracking-wide text-gray-600 relative border-b`}
            >
              <span className="flex py-4 gap-3 items-center">
                <ArrowBackIosIcon
                  fontSize="inherit"
                  className="text-gray-600 group-hover:text-gray-900"
                />
                Shop
              </span>
            </li>

            {categories?.map((data, index) => (
              <>
                <li
                  className={`font-["Branch"] ${
                    index === selectedCategory && "font-semibold"
                  }  hover:font-semibold py-4 font-medium text-base tracking-wide text-primary-blue relative border-b`}
                  onMouseOver={() => {
                    setSelectedCategory(index);
                  }}
                >
                  <Link
                    className="flex items-center justify-between"
                    to={data?.link}
                  >
                    {data?.category}
                    {data?.subcategory?.length > 0 ? (
                      index === selectedCategory ? (
                        <KeyboardArrowUpIcon
                          fontSize="inherit"
                          className="text-primary-blue"
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          fontSize="inherit"
                          className="text-primary-blue"
                        />
                      )
                    ) : (
                      <span></span>
                    )}
                  </Link>
                </li>
                {/* sub categories list  */}
                {index === selectedCategory && (
                  <ul className="capitalize">
                    {data?.subcategory?.map((data, i) => (
                      <li className="text-xs p-2 flex items-center justify-between gap-20 cursor-pointer text-primary-blue border-b transition-all hover:bg-blue-100 hover:font-semibold">
                        <Link
                          className="text-xs p-2"
                          to={data?.link}
                          onClick={() => {
                            setIsMobileNavVisible(false);
                          }}
                        >
                          {data?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {/* sub categories list  */}
              </>
            ))}
          </ul>
        )}

        {/* extended categories links  */}
      </nav>
    </aside>
  );
};

export default MobileMenu;
