import { Link } from 'react-router-dom'
import { HiArrowLongRight } from 'react-icons/hi2'

// import DataContext from '../context/dataContext'
// import { useContext } from 'react'

import { dataArrivals } from '../data'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Arrivals() {
  //   const { dataArrivals } = useContext(DataContext)
  // console.log(dataArrivals)
  useGSAP(() => {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const socTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.arrivals',
          start: 'top bottom',
          end: '50% bottom',
          scrub: true,
        },
      })
      socTl.from('.arrivals', {
        rotate: 10,
        scale: 0.9,
        yPercent: 30,
        x: 100,
        opacity: 0,
        ease: 'power1.inOut',
      })
    })
  })
  return (
    <section style={{ opacity: 1 }} className="arrivals bg-white overflow-hidden mb-20 pb-4">
      <div className="block-container ">
        <div className="arrivals__header sm:flex-row sm:flex-between">
          <h2 className="arrivals__title title-h2">Colorful New Arrivals</h2>
          <Link to={'/products'} className="cursor-pointer text-firm p-2 border-2 border-transparent rounded hover:border-firm transition-colors duration-300">
            view all
          </Link>
        </div>
        <div className="arrivals__latest-images mt-12 flex flex-col items-center sm:justify-between sm:flex-row sm:flex-between gap-3 lg:gap-5">
          {dataArrivals.slice(dataArrivals.length - 4, dataArrivals.length).map((item, index) => (
            // <NewArrivalCard key={index} card={item} />
            <div key={index} className="arrivals__card h-dvh sm:h-100 w-full sm:w-67 max-w-96 max-h-124 relative">
              <img src={`../../public/images/arrivals/${item.img}`} className="w-full h-full object-cover" alt={item.title} />
              <div className="arrivals__info opacity-0 transition-all duration-500 absolute bottom-0 left-0 w-full h-full p-3 text-center flex-center flex-col">
                <h3 className="lg:text-white text-transparent text-[28px] mb-3 leading-8">{item.title}</h3>
                <Link to={'/product'} className="lg:text-white text-transparent flex items-center lg:hover:text-rose hover:scale-105">
                  <span className="pr-2 tracking-wide">more information</span>
                  <HiArrowLongRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
