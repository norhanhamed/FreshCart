import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/User.context";
import { useState } from "react";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountExisstError, setaccountExisstError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  let { setToken } = useContext(userContext);
  const emailRiges =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  function validate(values) {
    const errors = {};

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRiges.test(values.email)) {
      errors.email = "email is not valid";
    }

    if (values.newPassword === "") {
      errors.newPassword = " password is required";
    } else if (!passwordRegex.test(values.newPassword)) {
      errors.newPassword =
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
    }

    return errors;
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let { data } = await axios.request(options);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      setaccountExisstError(error.response.data.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <div className=" space-y-3">
      <Helmet>
        <title> ResetPassword </title>
      </Helmet>
      <div className=" space-y-3 py-8 md:px-20 px-4">
        <div>
          {" "}
          <h1 className="text-blue-900 text-3xl font-semibold text-center">
            Create New password
          </h1>
          <p className="text-blue-950 text-center">
            This password should be different from the previous password.
          </p>
        </div>
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
          <div className="password relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="newPassword"
              className="form-control"
              name="newPassword"
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={
                showPassword
                  ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer`
                  : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer `
              }
            ></i>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-red-600 font-semibold">
              *{formik.errors.newPassword}
            </p>
          )}

          <div className="flex justify-between items-center my-3">
            <Link
              to={`/verify`}
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