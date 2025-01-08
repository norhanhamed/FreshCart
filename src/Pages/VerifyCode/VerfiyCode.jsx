import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function VerifyCode() {
  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: function (values) {
      senddata(values);
      console.log(values);
    },
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "Success") {
        toast.success(data.status);
        setTimeout(() => {
          navigate("/resetPassword");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccountExisstError(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className=" container space-y-3 flex justify-center items-center ">
      <Helmet>
        <title>verifyCode </title>
      </Helmet>
      <div className=" space-y-3 py-8 md:px-20 px-4  ">
        <div className=" flex justify-center items-center">
          <i class="fa-regular fa-envelope text-blue-900 text-3xl font-semibold text-center"></i>
        </div>
        <div>
          {" "}
          <h1 className="text-blue-900 text-3xl font-semibold text-center">
            Check your email
          </h1>
          <p className="text-blue-950 text-center">
            Reset code sent to your email
          </p>
        </div>
        <form action="" className=" space-y-3" onSubmit={formik.handleSubmit}>
          <div className="email ">
            <input
              type="text"
              placeholder="Enter Reset Code"
              className="form-control"
              name="resetCode"
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              onChange={formik.handleChange}
            />

            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 font-semibold">
                *{formik.errors.email}
              </p>
            )}
            {accountExisstError && (
              <p className="text-red-600 font-semibold">
                *{accountExisstError}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center my-3">
            <Link
              to={`/forgot`}
              className="btn bg-primary-500 !w-fit mx-0 hover:bg-primary-700 rounded-xl"
            >
              {" "}
              <span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>{" "}
              Back
            </Link>
            <button
              type=" submit "
              className="btn bg-primary-500 w-fit mx-0 hover:bg-primary-700 rounded-xl"
            >
              Next{" "}
              <span>
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}