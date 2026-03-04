import { useParams } from 'react-router-dom'

import DataContext from '../context/dataContext'
import { useContext, useEffect, useState } from 'react'

import BreadCrumbs from '../components/BreadCrumbs'
import { IoCartOutline } from 'react-icons/io5'
import loading from '../assets/Loading4.webm'

import CartContext from '../context/CartContext'
import { toast } from 'react-toastify'

// import { dataProducts } from '../data'

export default function SingleProduct() {
  const { dataProducts } = useContext(DataContext)
  //   console.log(dataProducts)
  const params = useParams()

  const { addToCart } = useContext(CartContext)

  // количество экземпляров цветка
  const [productQuantity, setProductQuantity] = useState(1)
  // количество каждого гошка
  const [potColorValue, setPotColorValue] = useState({
    beige: null,
    black: null,
    white: null,
    mint: null,
  })
  console.log(potColorValue.beige)

  function setPotBeigeValue(e) {
    // getPotProduct({ beige: +e.target.value, black: potColorValue.black, white: potColorValue.white, mint: potColorValue.mint })
    setPotColorValue({ beige: +e.target.value, black: potColorValue.black, white: potColorValue.white, mint: potColorValue.mint })
  }
  function setPotBlackValue(e) {
    // getPotProduct({ beige: potColorValue.beige, black: +e.target.value, white: potColorValue.white, mint: potColorValue.mint })
    setPotColorValue({ beige: potColorValue.beige, black: +e.target.value, white: potColorValue.white, mint: potColorValue.mint })
  }
  function setPotWhiteValue(e) {
    // getPotProduct({ beige: potColorValue.beige, black: potColorValue.black, white: +e.target.value, mint: potColorValue.mint })
    setPotColorValue({ beige: potColorValue.beige, black: potColorValue.black, white: +e.target.value, mint: potColorValue.mint })
  }
  function setPotMintValue(e) {
    // getPotProduct({ beige: potColorValue.beige, black: potColorValue.black, white: potColorValue.white, mint: +e.target.value })
    setPotColorValue({ beige: potColorValue.beige, black: potColorValue.black, white: potColorValue.white, mint: +e.target.value })
  }

  const data = dataProducts.reduce((acc, item) => {
    item.lables.forEach((label) => {
      if (label === '-10%' || label === '-20%' || label === '-30%' || label === '-40%' || label === '-50%') {
        const sale = +label.slice(1, -1)
        const newPrice = item.price - (item.price / 100) * sale
        item = { ...item, newPrice, sale }
      }
    })
    acc.push(item)
    return acc
  }, [])
  // нахожу выбранный продукт в массиве
  const singleProduct = data.find((item) => item.title === params.id)
  // console.log(singleProduct)

  // ф-я перебирает массив с гршками и singleProduct и кладет их в корзину
  function sortProducts(flower, flowerQuantity, pots) {
    toast.success('Products added to cart!')
    const potArr = getPotProduct(pots)
    flower = { ...flower, quantity: flowerQuantity }
    const productsArr = [...potArr, flower]
    // productsArr.forEach((prod) => {
    //   addToCart(prod)
    // })
    addToCart(productsArr)
  }
  // sortProducts(singleProduct, productQuantity, potColorValue)
  // получаю массив горшков из dataProducts
  function getPotProduct(obj) {
    let potArr = []
    if (Object.keys(obj).length !== 0) {
      dataProducts.map((prod) => {
        Object.keys(obj).forEach((key) => {
          if ((obj[key] !== 0) & (obj[key] !== null)) {
            if (prod.color == key) {
              let newProd = { ...prod, quantity: obj[key] }
              potArr.push(newProd)
              return potArr
            }
          }
        })
      })
    }
    return potArr
  }

  return (
    <>
      {singleProduct ? (
        <div className="w-full">
          <div className="block-container mt-40 h-max">
            <BreadCrumbs title={singleProduct.title} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-15">
              {/* product image */}
              <div className="w-full md:h-[640px]">
                <img src={`../../public/images/products/${singleProduct.img}`} alt={singleProduct.title} className="rounded-2xl w-full h-full object-cover" />
              </div>
              {/* product details */}
              <div className="flex flex-col gap-6 text-firm">
                <h1 className="md:text-3xl text-xl tracking-wide font-chill">{singleProduct.title}</h1>
                <div className="text-xs">
                  {!singleProduct.plantStand ? <span className="uppercase">plants</span> : <span className="uppercase">stands</span>} / <span className="uppercase">{singleProduct.title}</span>
                </div>
                <div className="text-xl flex items-center gap-4">
                  {!singleProduct.newPrice ? (
                    <span className="actual__price text-xl text-firm tracking-wide">${singleProduct.price}</span>
                  ) : (
                    <>
                      <span className="new__price text-xl text-firm tracking-wide">${singleProduct.newPrice}</span>
                      <span className="old__price text-lg text-gray-400 tracking-wide pt-0.5">${singleProduct.price}</span>
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full">{singleProduct.sale}% discount</span>
                    </>
                  )}
                </div>
                <p className="text-gray-600">{singleProduct.info}</p>

                {/* qunatity selector */}
                <div className="flex items-center gap-4">
                  <label htmlFor="" className="text-sm">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setProductQuantity(+e.target.value)}
                    min={1}
                    value={productQuantity}
                    className="w-20 border border-firm rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-firm"
                  />
                </div>

                {/* pot select */}
                {!singleProduct.plantStand && (
                  <div>
                    <h3 className="text-sm mb-3">Select pot:</h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xl px-0.5 mr-2 text-[#ffdc7c] rounded-full bg-[#ffdc7c]">o</span>
                        <input type="number" min={0} value={potColorValue.beige} onChange={setPotBeigeValue} className="border border-firm rounded-md w-10 pl-1.5 py-1" />
                      </div>
                      <div>
                        <span className="text-xl px-0.5 mr-2 text-[#363535] rounded-full bg-[#363535]">o</span>
                        <input type="number" min={0} value={potColorValue.black} onChange={setPotBlackValue} className="border border-firm rounded-md w-10 pl-1.5 py-1" />
                      </div>
                      <div>
                        <span className="text-xl px-0.5 mr-2 text-[#efeae6] rounded-full bg-[#efeae6]">o</span>
                        <input type="number" min={0} value={potColorValue.white} onChange={setPotWhiteValue} className="border border-firm rounded-md w-10 pl-1.5 py-1" />
                      </div>
                      <div>
                        <span className="text-xl px-0.5 mr-2 text-[#9ef4ff] rounded-full bg-[#9ef4ff]">o</span>
                        <input type="number" min={0} value={potColorValue.mint} onChange={setPotMintValue} className="border border-firm rounded-md w-10 pl-1.5 py-1" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-white mt-3">
                  <button
                    onClick={() => sortProducts(singleProduct, productQuantity, potColorValue)}
                    className="cursor-pointer rounded-md bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3 hover:bg-white hover:text-firm transition-all duration-300"
                  >
                    <IoCartOutline className="w-6 h-6" /> <span className="pt-0.5">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  )
}
