import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Products from './pages/Products'
import Guide from './pages/Guide'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'

import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openSearchSection, setOpenSearchSection] = useState(false)

  // useGSAP(() => {
  //   ScrollSmoother.create({
  //     smooth: 3,
  //     effects: true,
  //   })
  // })

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
        // console.log(exactLocation);
      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  const toggleSearchSection = () => {
    setOpenSearchSection((openSearchSection) => !openSearchSection)
  }

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropDown={openDropdown} setOpenDropDown={setOpenDropdown} toggleSearchSection={toggleSearchSection} />
      <Routes>
        <Route path="/" element={<Shop openSearchSection={openSearchSection} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/guide" element={<Guide />} />
        <Route path="/cart" element={<Cart location={location} getLocation={getLocation} />} />
      </Routes>
      <Contacts />
    </BrowserRouter>
  )
}

export default App
