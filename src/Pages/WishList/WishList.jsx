import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import WishListItem from "../../Components/WishListItem/WishListItem";
import { WishContext } from './../../Context/WishList.context';
import Loading from "../../Components/Loading/Loading";

export default function WishLists() {
  const { getWishList, WishListinfo } = useContext(WishContext);
  console.log(WishListinfo);

  function getWishLists(){()=>{ getWishList()}  }
  useEffect(() => {
    getWishLists();
  }, []);

  return (
    <>
      <Helmet>
        <title>wishList</title>
      </Helmet>
      {WishListinfo == null ? (
        <Loading />
      ) : (
        <section className=" container space-y-4 px-3">
          <div className=" flex justify-between items-center">
            <div className=" flex  gap-6 items-center ">
              <i className="fa-brands fa-opencart text-3xl text-primary-500 font-semibold"></i>
              <h2 className=" text-lg text-gray-600 font-semibold relative before:absolute before:w-0.5 before:h-full before:bg-gray-600 before:-left-3 before:bottom-0 ">
                your Wish List
              </h2>
            </div>
          </div>
          {WishListinfo.count === 0 ? (
            <div className="py-6 rounded-lg flex flex-col justify-center items-center gap-3 border-2 border-primary-500">
              <h2>There are not items yet.</h2>
              <Link
                to="/allproducts"
                className="btn font-medium text-center mx-2  px-3 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 hover:duration-300 hover:transition-colors "
              >
                Add your product to Wish List
              </Link>
            </div>
          ) : (
            <>
              <div className="  border-2 border-primary-500 py-4 rounded-lg ">
                {WishListinfo.data.map((product) => (
                  <>
                    <div className="  my-4">
                      <WishListItem key={product._id} productInfo={product} />
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}