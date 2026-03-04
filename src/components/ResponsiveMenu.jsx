import { UserButton, useUser } from '@clerk/clerk-react'
import { FaUserCircle } from 'react-icons/fa'
import { FaFacebook, FaSquareXTwitter, FaTelegram } from 'react-icons/fa6'
import { HiMenuAlt3 } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

export default function ResponsiveMenu({ isOpenBurger, setIsOpenBurger, location }) {
  const { user } = useUser()
  return (
    <div
      className={`${
        isOpenBurger ? 'left-0' : '-left-[100%]'
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <HiMenuAlt3 onClick={() => setIsOpenBurger(false)} className="absolute h-8 w-8 md:hidden text-firm top-6 right-3" />
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <div>
            <h1>Hello, {user?.firstName}</h1>
            {/* <h2 className="text-sm text-slate-500">Premium User</h2> */}
            {location && <span className="text-sm text-firm">{location.city}</span>}
          </div>
        </div>
        <nav className="pt-20">
          <ul className="flex flex-col gap-5">
            <NavLink onClick={() => setIsOpenBurger(false)} to={'/'}>
              <li className="text-firm cursor-pointer text-2xl">Shop</li>
            </NavLink>
            <NavLink onClick={() => setIsOpenBurger(false)} to={'/products'}>
              <li className="text-firm cursor-pointer text-2xl">Products</li>
            </NavLink>
            <NavLink onClick={() => setIsOpenBurger(false)} to={'/guide'}>
              <li className="text-firm cursor-pointer text-2xl">Guide</li>
            </NavLink>
            <div className="text-rose  flex items-center justify-start pt-3 gap-8">
              <FaTelegram className="telegram  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
              <FaSquareXTwitter className="twitter  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
              <FaFacebook className="facebook  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
            </div>
          </ul>
        </nav>
      </div>
    </div>
  )
}
