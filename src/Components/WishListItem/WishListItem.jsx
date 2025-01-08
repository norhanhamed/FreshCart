import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishContext } from "../../Context/WishList.context";
export default function WishListItem({ productInfo }) {
  const { imageCover, title, category, ratingsAverage, price, id } = productInfo;
  // let name;
  // if (category) {
  //   name = category.name;
  // }
  const { rmoveWishList } = useContext(WishContext);
  return (
    <>
      <div className="cart-item mx-3 space-y-6 grow bg-gray-100  grid grid-cols-12 py-4 px-6 rounded-lg">
        <div className=" col-span-12 cursor-pointer m-auto md:col-span-2 border-2 border-primary-500 rounded-3xl overflow-hidden  shadow-lg hover:border-primary-200 hover:transition-all hover:duration-300">
          <img src={imageCover} alt="" className="w-24 h-28 object-cover   " />
        </div>
        <div className="gap-3 !my-auto col-span-12 md:col-span-10 grid grid-cols-12   ">
          <div className=" align-middle my-auto md:mx-2 text-center md:text-left space-y-2 col-span-12 md:col-span-11">
            {/* caet title */}
            <Link to={`/product/${id}`}>
              <h3 className="text-lg  text-gray-700 font-semibold cursor-pointer  hover:text-primary-500 hover:transition-colors duration-300">
                {title}
              </h3>
            </Link>
            <div className="text-md font-medium text-primary-500">
              {/* cart price */}
              <span className=" text-gray-700">Price :</span> {price}
            </div>
            <div className="text-md font-medium text-primary-500">
              {/* cart ratig */}
              <span className=" text-gray-700">rating :</span> {ratingsAverage}{" "}
              <i className="fa-solid fa-star text-yellow-400"></i>
            </div>
            <h4 className="  text-gray-500 font-semibold">
              {" "}
              <span>{name}</span>
            </h4>
          </div>

          <button
            onClick={() => {
              rmoveWishList({ productId: id });
            }}
            type="submit"
            className=" h-8 m-auto col-span-12 md:col-span-1 my-auto w-8 border-2 group/icon border-transparent rounded-full hover:border-red-600 hover:transition-colors duration-300"
          >
            <i className="fa-solid fa-xmark group-hover/icon:text-red-600 group-hover/icon:rotate-180 group-hover/icon:transition-all group-hover/icon:duration-300 duration-300 "></i>
          </button>
        </div>
      </div>
    </>
  );
}