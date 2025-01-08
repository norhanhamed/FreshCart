import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { userContext } from "../../Context/User.context";
export default function ForsotPassword() {
  let { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [accountExisstError, setaccountExisstError] = useState(null);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  function validate(values) {
    const errors = {};

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRiges.test(values.email)) {
      errors.email = "email is not valid";
    }

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: function (values) {
      senddata(values);
    },
    validate,
  });
  async function senddata(values) {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.statusMsg === "success") {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/verify");
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
        <title>ForgotPassword </title>
      </Helmet>
      <div className=" space-y-3 py-8 md:px-20 px-4  ">
        <h1 className="text-blue-900 text-3xl font-semibold text-center">
          Forgot your password?
        </h1>
        <p className="text-blue-950 text-center">
          Your password will be reset by email
        </p>
        <form action="" className=" space-y-3" onSubmit={formik.handleSubmit}>
          <div className="email ">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              name="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
              to={`/login`}
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