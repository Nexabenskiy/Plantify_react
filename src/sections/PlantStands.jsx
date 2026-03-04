import { Link } from 'react-router-dom'

// import DataContext from '../context/dataContext'
// import { useContext } from 'react'

import { dataProducts } from '../data'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ProductCard } from '../components/ProductCard'
import { HiArrowLongRight } from 'react-icons/hi2'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function PlantStands() {
  // const { dataProducts } = useContext(DataContext)
  // console.log(dataProducts)

  useGSAP(() => {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const socTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.stands',
          start: 'top bottom',
          end: '90% bottom',
          scrub: true,
        },
      })
      socTl.from('.stands', {
        // rotate: 10,
        scale: 0.8,
        // yPercent: 30,
        y: -100,
        opacity: 0,
        ease: 'power1.inOut',
      })
    })
  })

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={`${className} arrow tracking-wide cursor-pointer flex items-center`}
        onClick={onClick}
        style={{ ...style, display: 'block', color: '#004F44', position: 'absolute', padding: '12px', right: '0px' }}
      >
        <button
          type="button"
          className="move-next p-2 rounded text-firm text-base mt-70 2xl:mt-0 ml-10 sm:-ml-24 2xl:ml-10 relative tracking-wide border-2 border-white hover:border-firm flex-center transition-colors duration-300 cursor-pointer"
        >
          <span className="pr-4">more</span>
          <HiArrowLongRight className="w-6 h-6 pb-1" />
        </button>
      </div>
    )
  }

  var settings = {
    dots: false,
    //  infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <section style={{ opacity: 1 }} className="stands bg-light overflow-hidden pb-20">
      <div className="block-container">
        <div className="stands__header sm:flex-row sm:flex-between pt-20">
          <h2 className="stands__title title-h2">Plant Stands</h2>
          <Link to={'/products'} className="cursor-pointer text-firm p-2 border-2 border-transparent rounded hover:border-firm transition-colors duration-300">
            view all
          </Link>
        </div>
        <div className="stands__slider mt-12 z-10 left-0 top-0">
          <Slider {...settings}>
            {dataProducts.map(
              (prod, index) =>
                prod.plantStand && (
                  <div className="stands__card w-87 h-[494.43px] px-3 relative">
                    <div className="stands__card-inner">
                      <div className="card-front flex justify-center">
                        <img src={`../../public/images/products/${prod.img}`} className="w-full h-full 0 max-w-96 object-cover" alt={prod.title} />
                        <div className="absolute top-0 lefy- w-full h-full"></div>
                      </div>
                      <div className="card-back flex justify-center">
                        <ProductCard key={index} prod={prod} isProdCard isPlantSection />
                      </div>
                    </div>
                  </div>
                ),
            )}
          </Slider>
        </div>
      </div>
    </section>
  )
}
