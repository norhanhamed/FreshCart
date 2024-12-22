import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate()
  async function submitForm(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values
      };
      /*hot toast loading....*/
      id = toast.loading("wait....")
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("ueser created successfuly");
      setTimeout(() => {
        if (data.message === "success") {
          navigate('/auth/login')
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
  const phoneRgex = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'name must be grater than 3 chars'),
    email: Yup.string().required('email is required').email('Invalid email address'),
    phone: Yup.string().required('phone is required').matches(phoneRgex),
    password: Yup.string().required('password is required'),
    rePassword: Yup.string().required('rePassword is required'),

  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitForm,
  })
  return (
    <>
      <section>
        <h2 className='text-primary text-2xl py-3'>
          <i className='fa-regular fa-circle-user '></i>
          <span>Register Now</span>
        </h2>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div>
            <input type="text"
              name='name'
              className="w-full form-control"
              placeholder='username'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-600 font-bold mt-3">
                *{formik.errors.name}
              </div>
            )
              :
              ("")
            }
          </div>
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
            {
              errMsg ? (
                <div className="text-red-600 font-bold mt-3">
                  *{errMsg}
                </div>
              )
                : ('')
            }
          </div>
          <div>
            <input type="tel"
              className="w-full form-control"
              name='phone'
              placeholder='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-red-600 font-bold mt-3">
                *{formik.errors.phone}
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
          </div>
          <div>
            <input type="password"
              className="w-full form-control"
              name='rePassword'
              placeholder='reassword'
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-red-600 font-bold mt-3">
                *{formik.errors.rePassword}
              </div>
            )
              :
              ("")
            }
          </div>
          <button className='bg-primary p-1 rounded px-3' type='submit'>LogIn</button>
        </form>
      </section>
    </>
  )
}
