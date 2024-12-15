import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Online } from 'react-detect-offline'

export default function Layout() {
  return (
    <>
      <Navbar />
        <div className="container pb-[240px] pt-[80px]">
          <Outlet />
        </div>
      <Footer />
    </>
  )
}
