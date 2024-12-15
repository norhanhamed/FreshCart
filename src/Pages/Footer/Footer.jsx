import React from 'react'
import amazonPayLogo from '../../assets/images/amazon-pay.png'
import americanExpressLogo from '../../assets/images/American-Express-Color.png'
import masterCardLogo from '../../assets/images/mastercard.webp'
import payPalLogo from '../../assets/images/paypal.png'
import googleplay from '../../assets/images/get-google-play.png'
import appstore from '../../assets/images/get-apple-store.png'

export default function Footer() {
    return (
        <>
            <footer className='bg-slate-100 py-2 absolute left-0 right-0 bottom-0'>
                <div className="container">
                    <h2 className='text-2xl font-semibold '>Get Freshcart App</h2>
                    <p className='my-3 capitalize'> we will send you a link ,open it in your phone to download the app . </p>
                    <div className='flex gap-4'>
                        <input type="email" placeholder='Email...' className='form-control flex-grow' />
                        <button className='btn-primary rounded'>share app link</button>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="flex gap-2 items-center ">
                            <span>Payment Partener</span>
                            <div className='flex items-center'>
                                <img src={amazonPayLogo} className='w-16' alt="amazonPayLogo" />
                                <img src={americanExpressLogo} className='w-16' alt="americanExpressLogo" />
                                <img src={masterCardLogo} className='w-16' alt="masterCardLogo" />
                                <img src={payPalLogo} className='w-16' alt="payPalLogo" />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <span>Get deliviers with Freshcart </span>
                            <div className='flex items-center'>
                                <img src={googleplay} className='w-16' alt="googleplay" />
                                <img src={appstore} className='w-16' alt="appstore" />
                            </div>


                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
