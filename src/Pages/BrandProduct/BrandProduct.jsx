import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noproduct from "../../assets/images/noneProductImage.png";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function BrandProduct() {
  let [Brandproduct, setBrandproduct] = useState(null);
  let { id } = useParams();
  async function BrandProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data);
      setBrandproduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    BrandProducts();
  }, [id]);
  return (
    <>
      {" "}
      {Brandproduct ? (
        <>
          {Brandproduct.length === 0 ? (
            <div className={` relative`}>
              <img src={noproduct} alt="" className="w-full" />
            </div>
          ) : (
            <>
              <div className=" space-x-2 space-y-2 px-5 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1">
                {Brandproduct.map((products) => (
                  <ProductCard key={products.id} productInfo={products} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}