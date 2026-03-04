import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { useContext } from 'react'
import CartContext from '../context/CartContext'

import logo from '../../public/svg/logo.svg'

import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { IoCartOutline } from 'react-icons/io5'

// import { GoogleLogin } from '@react-oauth/google'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { ScrollTrigger } from 'gsap/all'
import { useState } from 'react'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

export default function Navbar({ location, getLocation, openDropDown, setOpenDropDown }) {
  // console.log(location)
  const { cartItem } = useContext(CartContext)
  // burger
  const [isOpenBurger, setIsOpenBurger] = useState(false)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.from('#dropdown', {
      x: 500,
      delay: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }, [openDropDown])

  useGSAP(() => {
    const navbarTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.navbar',
        start: 'bottom 10%',
        end: '+=300',
        duration: 0.6,
        scrub: true,
      },
    })
    navbarTl
      .to('.navbar', {
        height: 80,
      })
      .to(
        '.navbar-section',
        {
          backgroundColor: 'rgba(0, 79, 68, 0.9)',
        },
        '<',
      )
  })

  const toggleDropDown = () => {
    setOpenDropDown((openDropDown) => !openDropDown)
  }

  return (
    <div className="navbar-section w-full  md:px-0 fixed top-0 left-0 z-50  items-center" style={{ backgroundColor: 'rgba(0, 79, 68, 1)' }}>
      <div className="navbar block-container grid md:grid-cols-3  grid-flow-col auto-cols-max justify-between items-center h-20 md:h-25 lg:h-30 ">
        {/* left side */}
        <nav>
          {isOpenBurger ? (
            <HiMenuAlt3 onClick={() => setIsOpenBurger(false)} className="h-8 w-8 md:hidden text-white" />
          ) : (
            <HiMenuAlt1 onClick={() => setIsOpenBurger(true)} className="h-8 w-8 md:hidden text-white" />
          )}
          <ul className="md:flex lg:gap-x-10 md:gap-y-1.5 md:gap-x-7 items-center text-base text-white hidden">
            <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'border-b-3 transition-all border-white' : 'text-black'} cursor-pointer`}>
              <li className="text-white">Shop</li>
            </NavLink>
            <NavLink to={'/products'} className={({ isActive }) => `${isActive ? 'border-b-3 transition-all border-white' : 'text-black'} cursor-pointer`}>
              <li className="text-white">Products</li>
            </NavLink>
            <NavLink to={'/guide'} className={({ isActive }) => `${isActive ? 'border-b-3 transition-all border-white' : 'text-black'} cursor-pointer`}>
              <li className="text-white">Guide</li>
            </NavLink>
          </ul>
        </nav>
        <ResponsiveMenu isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} location={location} />
        {/* logo */}
        <Link id="logo" to={'/'} className="px-5 justify-self-center">
          <img src={logo} alt="logo" />
        </Link>
        {/* right side */}
        <div className="flex-center lg:gap-x-5 md:gap-x-3 justify-self-end">
          <div className="md:flex md:items-center gap-1.5 cursor-pointer text-white hidden relative">
            <MapPin />
            <div className="font-semibold ">
              {location ? (
                <div className="pt-1">
                  <p>{location.city}</p>
                  {/* <p>{location.state}</p> */}
                </div>
              ) : (
                'Add Address'
              )}
            </div>
            <FaCaretDown onClick={toggleDropDown} />
          </div>
          {/* <Link to={'/'} className="relative">
            <FiSearch className="text-white h-6 w-6" onClick={toggleSearchSection} />
          </Link> */}
          <Link to={'/cart'} className="relative mr-3 md:mr-0">
            <IoCartOutline className="h-7 w-7 text-white" />
            <span className="bg-rose px-2.5 pt-0.5 flex flex-center  rounded-full absolute -top-3 -right-3 text-white">{cartItem.length}</span>
          </Link>
          <div className="md:block hidden text-white pl-2 pt-1">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
              }}
              onError={() => {
                console.log('Login Failed')
              }}
              useOneTap
            /> */}
          </div>
          {openDropDown ? (
            <div id="dropdown" className="right-1  w-60 h-max shadow-xl z-50 bg-white top-[110%] border-2 p-5 border-gray-100 rounded-md absolute ">
              <h1 className="font-semibold mb-2.5 text-sm text-firm uppercase flex items-center justify-between">
                <span>Change Location</span>
                <span onClick={toggleDropDown}>
                  <CgClose className="text-firm font-bold cursor-pointer h-4.5 w-4.5 pb-0.5" />
                </span>
              </h1>
              <button onClick={getLocation} className="w-full bg-rose hover:bg-white border-2 border-rose  shadow-2xl text-white hover:text-rose px-4 pb-2 pt-2.5 rounded-md cursor-pointer">
                Detect my location
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
