import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/User.context';


export default function Login() {
  const [errMsg, setErrMsg] = useState(null);
  let navigate = useNavigate();
  const {token,setToken} = useContext (userContext);
  async function loginForm(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      };
    /*hot toast loading....*/
    id = toast.loading("wait....")
    const { data } = await axios.request(options);
    console.log(data);
    toast.dismiss(id);
    toast.success("ueser loggedIn successfuly");
    setTimeout(() => {
      if (data.message === "success") {
        localStorage.setItem("token",data.token);
       setToken(data.token)
        navigate('/')
      }
    }, 2000)
  } catch (error) {
    toast.dismiss(id)
    toast.error(error.response.data.message)
    console.log(error)
    setErrMsg(error.response.data.message)
  }
  }
  /* validationSchema with yup*/
  const validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('Invalid email address'),
    password: Yup.string().required('password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginForm,
  })

  return (
    <>
      <section>
        <h2 className='text-primary text-2xl py-3'>
          <i className='fa-regular fa-circle-token me-3'></i>
          <span>Login Now</span>
        </h2>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div>
            <input type="email"
              className="w-full form-control"
              name='email'
              placeholder='email...'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
           
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 font-bold mt-3">
                *{formik.errors.email}
              </div>
            )
              :
              ("")
            }
          </div>
          <div>
            <input type="password"
              className="w-full form-control"
              name='password'
              placeholder='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600 font-bold mt-3">
                *{formik.errors.password}
              </div>
            )
              :
              ("")
            }
            {
              errMsg?(
                <div className="text-red-600 font-bold mt-3">
                *{errMsg}
              </div>
              )
              :('')
            }
          </div>
          <button className='bg-primary p-1 rounded px-3' type='submit'>LogIn..</button>
        </form>
      </section>
    </>
  )
}
