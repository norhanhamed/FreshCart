import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css";

/* react-image-gallary */
import "react-image-gallery/styles/css/image-gallery.css";




/* for swiper library*/
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
