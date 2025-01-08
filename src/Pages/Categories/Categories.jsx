import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setcategories] = useState(null);

    async function getCategories() {
      const options = {
        url:"https://ecommerce.routemisr.com/api/v1/categories",
        method:"GET"
      }
      const { data } = await axios.request(options);
      setcategories(data.data);
    }
      
    useEffect(() => {
      getCategories();
    }, []);
  return (
    <>
            <Helmet>
        <title>Categories</title>
      </Helmet>
      <section className=" ">
        <div className=" flex justify-center items-center">
          <h2 className=" font-bold text-center mx-auto text-lg text-primary-600 border-b-2 border-opacity-30 relative border-primary-500 w-fit mb-5 after:w-3/4 after:bg-primary-500 after:bg-opacity-30 after:mx-auto after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:absolute after:h-[2px] after:block ">
            shop populer categories
          </h2>
        </div>


      {!categories ? (
          <Loading />
        ) : (
          <>
            <div className="  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
              {categories.map((categorie) => (
                <>
                  <div className="m-2 ">
                    <div
                      to={`/categoryProduct${categorie._id}`}
                      className="h-64 overflow-hidden cursor-pointer shadow-xl border border-gray-400 border-opacity-30"
                    >
                      <Link to={`/categoryProduct/${categorie._id}`}>
                        <img
                          src={categorie.image}
                          alt=""
                          className=" w-full h-full object-cover hover:scale-125 hover:transition-transform hover:duration-500  "
                        />
                      </Link>
                    </div>
                    <div className="  w-full flex justify-center items-center">
                      <Link
                        to={`/categoryProduct/${categorie._id}`}
                        className="mt-3  w-full font-semibold text-center"
                      >
                        {categorie.name}{" "}
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        </section>
    </>
  )
}
