import { FiSearch } from 'react-icons/fi'
import settings from '../../public/svg/settings.svg'

export default function SearchSection() {
  return (
    <section className="py-21 bg-light mb-24">
      <div className="block-container flex-between gap-4">
        <button type="button" className="border-2 border-firm h-15 min-w-15 flex-center rounded cursor-pointer">
          <img src={settings} alt="" className="" />
        </button>
        <input type="text" className="w-full text-firm h-15 outline-0 border-2 border-firm py-5 px-6 rounded" name="" id="" placeholder="Search flowers..." />
        <button type="button" className="border-2 border-firm h-15 min-w-15 flex-center bg-firm rounded cursor-pointer">
          <FiSearch className="text-white h-7 w-7" />
        </button>
      </div>
    </section>
  )
}
