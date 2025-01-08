import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";

export default function Brands() {
  let [brand, setbrand] = useState(null);
  async function allbrands() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data.data);
      setbrand(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    allbrands();
  }, []);
  return (
    <>
      {brand ? (
        <div className="">
          <Helmet>
            <title>Brands</title>
          </Helmet>

          <div className=" flex justify-center items-center">
            <h2 className=" font-bold text-center mx-auto text-lg text-primary-600 border-b-2 border-opacity-30 relative border-primary-500 w-fit mb-5 after:w-3/4 after:bg-primary-500 after:bg-opacity-30 after:mx-auto after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:absolute after:h-[2px] after:block ">
              All Brands
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3  gap-y-5 md:grid-cols-4 lg:grid-cols-6">
            {brand.map((Product) => (
              <>
                <div className=" w-fit mx-auto hover:-translate-y-2 duration-300 hover:transition-transform hover:duration-300">
                  <Link
                    to={`/brandProduct/${Product._id}`}
                    className=" flex justify-center items-center flex-col w-36 h-36 border-2 overflow-hidden border-gray-400 border-opacity-25 shadow-xl rounded-3xl"
                  >
                    <img src={Product.image} alt="" className="w-full" />
                    <p className="font-semibold text-primary-500">
                      {Product.name}
                    </p>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  );
}