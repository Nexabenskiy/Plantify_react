import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps'
import { useState } from 'react'
import { FaDirections } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import gsap from 'gsap'
import { FaFacebook, FaSquareXTwitter, FaTelegram } from 'react-icons/fa6'
// import { useGSAP } from '@gsap/react'

const locations = {
  rizhskyAve: {
    name: 'Rizhsky Ave 49',
    city: 'Pskov',
    tel: '8 (800) 123-56-00',
    email: ' plantify-shop@gmail.com',
    center: [57.816957, 28.261893],
    shops: [{ id: 1, coords: [57.81572, 28.297942], name: 'Магазин на Рижском, 49' }],
  },
  engineeringStreet: {
    name: 'Engineering Street 11A',
    city: 'Pskov',
    tel: '8 (800) 123-56-01',
    email: 'plantify-shop@gmail.com',
    center: [57.823091, 28.313008],
    shops: [{ id: 2, coords: [57.822679, 28.36588], name: 'Магазин на Инженерной, 115' }],
  },
}

export default function Contacts() {
  // текущая локация
  const [currentLocation, setCurrentLocation] = useState('rizhskyAve')
  const currentLocationData = locations[currentLocation]
  // console.log(locations[currentLocation].shops)
  const [windowOpacity, setWindowOpacity] = useState(0)
  const [window, setWindow] = useState('polygon(0% 0%, 100% 0%, 100% 100%, 100% 0%)')
  const [word, setWord] = useState('get')
  const [isActiveWindow, setIsActiveWindow] = useState(false)
  // console.log(isActiveWindow)

  function openAddressWindow() {
    const tlOpen = gsap.timeline({
      delay: 0,
    })

    tlOpen.to('#address-btn', {
      right: 0,
      duration: 0.5,
      ease: 'back',
    })
    tlOpen.to('#address-window', {
      duration: 0.7,
      opacity: 1,
      ease: 'circ',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })
    setTimeout(() => {
      setWindowOpacity(1)
      setWindow('polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)')
      setIsActiveWindow(true)
    }, 1300)
    setTimeout(() => {
      setWord('put')
    }, 400)
  }

  function closeAddressWindow() {
    // console.log('ok')
    const tlClose = gsap.timeline({
      delay: 0,
    })
    tlClose.to('#address-window', {
      duration: 0.7,
      opacity: 0,
      ease: 'circ',
      clipPath: 'polygon(0% 0%, 86% 0%, 100% 100%, 86% 0%)',
    })

    tlClose.to('#address-btn', {
      right: 'auto',
      duration: 0.3,
      ease: 'power2.out',
    })
    setTimeout(() => {
      setWindowOpacity(0)
      setWindow('polygon(0% 0%, 100% 0%, 100% 100%, 100% 0%)')
      setIsActiveWindow(false)
    }, 1300)
    setTimeout(() => {
      setWord('set')
    }, 900)
  }

  return (
    <section className="contacts">
      <div className="block-container bg-white py-15  sm:py-30">
        <div className="relative">
          <YMaps
            query={{
              lang: 'en_US',
              apikey: '9f78356f-6188-4ef6-89e3-3fd94a9f7d67',
            }}
          >
            <div className="contacts__btns flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-7">
              {Object.keys(locations).map((loc) => {
                const isActive = currentLocation === loc
                return (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => setCurrentLocation(loc)}
                    className={` cursor-pointer tracking-[0.03em] rounded mb-3 pb-2 pt-2.5 px-4 border-2 transition-all duration-300 ${
                      isActive ? 'border-2 border-firm bg-firm text-white' : 'border-firm sm:border-transparent hover:border-firm bg-firm sm:bg-transparent text-white sm:text-firm'
                    }`}
                  >
                    {locations[loc].name}
                  </button>
                )
              })}
            </div>
            <Map width={'100%'} height={'300px'} defaultState={{ center: currentLocationData.center, zoom: 13 }} state={{ center: currentLocationData.center, zoom: 13 }}>
              {/* <Placemark geometry={currentLocationData.center} /> */}
              {locations[currentLocation].shops.map((shop) => (
                <Placemark key={shop.id} geometry={shop.coords} options={{ iconLayout: 'default#image', iconImageHref: '/public/svg/address.svg', iconImageSize: [40, 40] }} />
              ))}
            </Map>
          </YMaps>
          <div className="contacts__info sm:absolute top-21 left-7 z-20 sm:w-130">
            <button
              id="address-btn"
              onClick={!isActiveWindow ? openAddressWindow : closeAddressWindow}
              type="button"
              className=" top-0  text-white mt-10 sm:mt-0 sm:absolute z-22 cursor-pointer rounded bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3"
            >
              <FaDirections />
              <span className="pt-0.5 text-sm uppercase tracking-[0.08em]">{word} contacts</span>
            </button>
            {Object.keys(locations).map((loc) => {
              // console.log(locations[loc].city)
              const isActive = currentLocation === loc
              const patternTel = locations[loc].tel.replace(/\D/g, '')
              return (
                <div key={loc}>
                  {isActive && (
                    <div id="address-window" className="relative bg-white flex flex-col gap-2 p-2.5 sm:p-7 top-0 w-full" style={{ clipPath: window, opacity: windowOpacity }}>
                      <h3 className="text-2xl tracking-[0.01em]">Visit us</h3>
                      <div className="flex flex-col gap-1">
                        <p className="leading-[163%] tracking-[0.03em]">
                          {locations[loc].name}, {locations[loc].city}
                        </p>
                        <Link to={`tel:${patternTel}`} className="leading-[163%] tracking-[0.03em]">
                          tel : <span>{locations[loc].tel}</span>
                        </Link>
                        <Link to={`mailto:${locations[loc].emai}`} className="leading-[163%] tracking-[0.03em]">
                          email : <span>{locations[loc].email}</span>
                        </Link>
                      </div>
                      <div className="leading-[163%] tracking-[0.03em]">
                        <span className="underline">Open day</span> : 10am–5:30pm everyday
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            {/* <button
              id="address-btn"
              onClick={!isActiveWindow ? openAddressWindow : closeAddressWindow}
              type="button"
              className=" top-0  text-white order-1 sm:absolute z-22 cursor-pointer rounded bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3"
            >
              <FaDirections />
              <span className="pt-0.5 text-sm uppercase tracking-[0.08em]">{word} contacts</span>
            </button> */}
            {/* <div className="relative bg-white flex flex-col gap-2 p-7 top-0">
              <h3 className="text-2xl tracking-[0.01em]">Visit us</h3>
              <div>
                <p className="leading-[163%] tracking-[0.03em]">Gekikara Street 16, Atalanta</p>
                <p className="leading-[163%] tracking-[0.03em]">
                  tel : <span></span>
                </p>
                <p className="leading-[163%] tracking-[0.03em]">email :</p>
                <p className="leading-[163%] tracking-[0.03em]">T2G 0T2</p>
              </div>
              <div className="leading-[163%] tracking-[0.03em]">
                <span className="underline">Open day</span> : 10am–5:30pm everyday
              </div>
              <button
                type="button"
                className=" top-0 left-0 text-white absolute z-22 cursor-pointer rounded hover:text-firm  bg-firm hover:bg-white border-2 border-firm transition-all duration-300 pb-2 pt-2.5 px-4 flex-center gap-3"
              >
                <FaDirections />
                <span className="pt-0.5 text-sm uppercase tracking-[0.08em]">get contacts</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="h-20 bg-firm z-100 relative">
        <div className="text-white  flex items-center justify-center pt-6 gap-8">
          <FaTelegram className="telegram  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
          <FaSquareXTwitter className="twitter  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
          <FaFacebook className="facebook  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-8 h-8" />
        </div>
      </div>
    </section>
  )
}
