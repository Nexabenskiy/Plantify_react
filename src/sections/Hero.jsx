import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'

import { FaTelegram } from 'react-icons/fa6'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'

// import DataContext from '../context/dataContext'
// import { useContext } from 'react'

import { HiArrowLongRight } from 'react-icons/hi2'
import { ProductCard } from '../components/ProductCard'

import { dataProducts } from '../data'
// animate svg
import gsap from 'gsap'
// import { MorphSVGPlugin } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'

export default function Hero() {
  // const { dataProducts } = useContext(DataContext)
  // console.log(dataProducts)
  //   gsap.registerPlugin(MorphSVGPlugin)
  // media query
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const socTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'center 70%',
          // end: 'bottom bottom',
          scrub: true,
        },
      })
      socTl.to('.hero__socials', {
        rotate: 10,
        scale: 0.9,
        // yPercent: 30,
        ease: 'power1.inOut',
        // color: '#eb70ca',
        color: 'transporent',
        // opacity: 0,
        // overflow: 'hidden',
      })
      const heroTl = gsap.timeline({ delay: 1 })
      heroTl
        .from(
          '.hero__socials',
          {
            opacity: 0,
            duration: 1.5,
            // rotation: 180,
            y: -500,
          },
          '-=0.8',
        )
        .from(
          '#dot',
          {
            delay: 1,
            duration: 1,
            opacity: 0,
            scale: 0.2,
            stagger: {
              each: 0.15,
              grid: [8, 8],
              from: 'edges',
            },
          },
          '-=1.2',
        )
    })
  })

  return (
    <section className="hero bg-firm w-full min-h-screen relative mb-20 pb-4">
      <div className="block-container relative flex flex-col lg:flex-row flex-between gap-15 lg:gap-2 xl:gap-5 pt-40 lg:pt-48 xl:pt-58">
        <div className="hero__info shrink text-center lg:text-left lg:max-w-95 xl:max-w-105 flex flex-col gap-8 items-center text-text">
          <h1 className="hero__title text-5xl sm:text-[58px] xl:text-[64px] font-medium font-chill leading-[113%] tracking-wide">Happiness blooms from within</h1>
          <div className="hero__text">
            <p className="tracking-wide leading-relaxed">Our environment, the world in which we live and work, is a mirror of our attitudes and expectations.</p>
          </div>
          <div className="hero__links   flex flex-col md:flex-row lg:flex-col xl:flex-row lg:items-start xl:items-center lg:self-start gap-10">
            <NavLink to={'/products'} className="shadow-2xl tracking-wide justify-self-start py-5 px-10 bg-text hover:bg-rose text-firm hover:text-text rounded-md border-2 border-text">
              Shop now
            </NavLink>
            <Link
              to="featured"
              smooth={true}
              offset={-55}
              className="tracking-wide cursor-pointer py-5 px-5 flex items-center border-2 border-transparent rounded hover:border-white transition-colors duration-300"
            >
              <span className="pr-4">Explore plants</span>
              <HiArrowLongRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="hero__images grid gap-5 sm:gap-1.5 shadow-2xl mb-23 z-5 relative">
          {dataProducts.map((prod, index) => prod.isHeroImg1 && <ProductCard key={index} prod={prod} isHero={true} />)}
          {dataProducts.map((prod, index) => prod.isMainHeroImg && <ProductCard key={index} prod={prod} isHero={true} />)}
          {dataProducts.map((prod, index) => prod.isHeroImg2 && <ProductCard key={index} prod={prod} isHero={true} />)}
          <svg className="absolute hidden md:block -z-1 opacity-50 -left-10 -bottom-10 text-white" width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle id="dot" cx="33.6436" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="33.6436" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="49.5479" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="17.7394" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="1.83511" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4522" cy="1.83511" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="17.7394" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="33.6436" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="49.5479" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="97.2607" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="113.165" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="81.3564" cy="113.165" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4522" cy="65.4521" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="81.3564" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="97.2606" r="1.83511" fill="#ffffff" />
            <circle id="dot" cx="65.4521" cy="113.165" r="1.83511" fill="#ffffff" />
          </svg>
        </div>
        <div style={{ color: '#ffffff', overflow: 'visible', opacity: 0.7 }} className="hero__socials z-50 fixed top-[50%] translate-[-50%] 2xl:flex hidden left-25 flex-col gap-15">
          <FaTelegram className="telegram  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-7 h-7" />
          <FaSquareXTwitter className="twitter  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-7 h-7" />
          <FaFacebook className="facebook  cursor-pointer  hover:text-rose hover:scale-130 duration-500 transition-all  w-7 h-7" />
        </div>
      </div>
    </section>
  )
}
