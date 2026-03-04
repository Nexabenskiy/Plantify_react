import { Link } from 'react-router-dom'
import { VscArrowRight } from 'react-icons/vsc'

// import DataContext from '../context/dataContext'
// import { useContext } from 'react'

import { dataProducts } from '../data'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ProductCard } from '../components/ProductCard'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Featured() {
  // const { dataProducts } = useContext(DataContext)
  // console.log(dataProducts)
  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const socTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.featured',
          start: 'top bottom',
          end: '90% bottom',
          scrub: true,
        },
      })
      socTl.from('.featured', {
        // rotate: 10,
        scale: 0.8,
        // yPercent: 30,
        y: -100,
        opacity: 0,
        ease: 'power1.inOut',
      })
    })
  })

  // добавляю в объект с продуктом ключ/значение newPrice=true, если есть лэйбл со скидкой и высчитываю старую цену
  const data = dataProducts.reduce((acc, item) => {
    item.lables.forEach((label) => {
      if (label === '-10%' || label === '-20%' || label === '-30%' || label === '-40%' || label === '-50%') {
        const sale = +label.slice(1, -1)
        const newPrice = item.price - (item.price / 100) * sale
        item = { ...item, newPrice }
      }
    })
    acc.push(item)
    return acc
  }, [])

  // items having label "Featured"
  const featuredItemsArr = data.reduce((acc, item) => {
    item.lables.forEach((label) => {
      if (label === 'Featured') {
        acc.push(item)
      }
    })
    return acc
  }, [])

  //   arrows
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div className={`${className} arrow`} onClick={onClick}>
        <VscArrowRight
          className="next-arrow w-12 h-12 hover:scale-115 shadow-md transition-all opacity-70 hover:opacity-100"
          style={{ ...style, display: 'block', borderRadius: '50%', background: '#fff', color: '#004F44', position: 'absolute', padding: '12px', right: '13px' }}
        />
      </div>
    )
  }

  var settings = {
    dots: false,
    infinite: true,
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
          // centerMode: true,
          // centerPadding: '60px',
        },
      },
    ],
    //  adaptiveHeight: true,
    //  onInit: () => {
    //    const slickList = document.querySelector('.slick-list')
    //    slickList.style.overflow = 'visible'
    //  },
  }
  return (
    <section style={{ opacity: 1 }} className="featured bg-white overflow-hidden mb-20 pb-4">
      <div className="block-container ">
        <div className="featured__header sm:flex-row sm:flex-between">
          <h2 className="featured__title title-h2">Featured</h2>
          <Link to={'/products'} className="cursor-pointer text-firm p-2 border-2 border-transparent rounded hover:border-firm transition-colors duration-300">
            view all
          </Link>
        </div>
      </div>
      <div className="block-container relative ">
        <div className="left-curtain h-[105%] w-2010 absolute top-0 -left-2002 bg-transparent md:bg-white z-20"></div>
        <div className="featured__slider  mt-12 z-10 sm:left-0 top-0">
          <Slider {...settings}>
            {featuredItemsArr.map((prod, index) => (
              <div className="futured__card sm:pr-6.5">
                <ProductCard key={index} prod={prod} isProdCard />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
