import { useContext } from 'react'
import CartContext from '../context/CartContext'

import { Link, useNavigate } from 'react-router-dom'

export function ProductCard({ prod, isHero, isProdCard, isPlantSection }) {
  const { addToCart } = useContext(CartContext)
  // console.log(prod)
  const navigate = useNavigate()
  return (
    <article
      className={
        prod.isMainHeroImg && isHero
          ? 'sm:col-span-2 sm:row-span-2 relative'
          : isPlantSection
            ? 'stands__card-product w-full max-w-96 col-span-1 row-span-1 relative'
            : 'card-product w-full max-w-96 col-span-1 row-span-1 relative'
      }
    >
      <div className="card__lables absolute top-[15px] left-[15px] z-20 flex-center gap-x-1">
        {prod.lables.map((label, index) => (
          <div key={index} className="card__label bg-firm text-white text-xs tracking-widest leading-none pb-2 pt-2.5 px-[15px]">
            {label}
          </div>
        ))}
      </div>
      <div className={isProdCard && 'h-89 relative'}>
        <img src={`../../public/images/products/${prod.img}`} onClick={() => navigate(`/products/${prod.title}`)} className="w-full h-full object-cover object-bottom" alt={prod.title} />
      </div>
      {!isHero ? (
        <div className="card__info mt-5 px-2 pb-3 grid grid-rows-2 gap-1">
          <div className="card__header gap-2 flex items-start justify-between">
            <h3 className="card__title text-xl text-firm tracking-wide line-clamp-2">{prod.title}</h3>
            <div className="card__prices flex flex-col items-end">
              {!prod.newPrice ? (
                <span className="actual__price text-xl text-firm tracking-wide">${prod.price}</span>
              ) : (
                <>
                  <span className="new__price text-xl text-firm tracking-wide">${prod.newPrice}</span>
                  <span className="old__price text-lg text-gray-400 tracking-wide">${prod.price}</span>
                </>
              )}
            </div>
          </div>
          <div className="card__footer flex items-end justify-between gap-2">
            <div className="card__filter">
              <div className="text-[#9ea9a7]">Pot colors</div>
              <div className="flex gap-1.5">
                <span className="text-[10px] px-1 text-[#ffdc7c] rounded-full bg-[#ffdc7c]">o</span>
                <span className="text-[10px] px-1 text-[#363535] rounded-full bg-[#363535]">o</span>
                <span className="text-[10px] px-1 text-[#efeae6] rounded-full bg-[#efeae6]">o</span>
                <span className="text-[10px] px-1 text-[#9ef4ff] rounded-full bg-[#9ef4ff]">o</span>
                {/* <input value="" type="checkbox" name="pot-1" id="pot-1" />
                <label htmlFor="pot-1"></label> */}
                {/* <input value="" type="checkbox" name="pot-2" id="pot-2" />
                <label htmlFor="pot-2"></label>
                <input value="" type="checkbox" name="pot-3" id="pot-3" />
                <label htmlFor="pot-3"></label>
                <input value="" type="checkbox" name="pot-4" id="pot-4" />
                <label htmlFor="pot-4"></label> */}
              </div>
            </div>
            <button onClick={() => addToCart(prod)} className="card__button rounded text-white hover:text-firm bg-firm hover:bg-white border-2 border-firm px-6 pb-2 pt-2.5">
              Buy
            </button>
          </div>
        </div>
      ) : (
        <>
          {prod.isMainHeroImg && (
            <div className="hero-card__info absolute text-text bottom-0 left-0 flex flex-col justify-end gap-1.5 p-6.5 h-[70%]">
              <h3 className="hero-card__title text-3xl font-chill">{prod.title}</h3>
              <div className="hero-card__descr line-clamp-3 tracking-wide leading-[129%]">{prod.info}...</div>
              <button
                onClick={() => navigate(`/products/${prod.title}`)}
                className="hero-card__link mt-3 py-4.25 w-full flex-center rounded text-firm hover:text-white bg-white hover:bg-transparent border-2 border-white tracking-wide text-xs uppercase"
              >
                Read More
              </button>
            </div>
          )}
        </>
      )}
    </article>
  )
}
