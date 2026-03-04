import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import emptyCart from '../assets/empty-cart.png'

import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

import { useContext, useState } from 'react'
import CartContext from '../context/CartContext'

export default function Cart({ location, getLocation }) {
  const { cartItem, updateQuantity, deleteItem } = useContext(CartContext)
  //   console.log(cartItem)
  const [codeValue, setCodeValue] = useState('')

  const { user } = useUser()
  const navigate = useNavigate()

  // стейты для инпутов формы
  const [changeName, setChangeName] = useState(user?.fullName)
  const [changeAddress, setChangeAddress] = useState(user?.primaryEmailAddress.emailAddress)
  const [changeCountry, setChangeCountry] = useState(location?.country)
  const [changeState, setChangeState] = useState(location?.state)
  const [changePostCode, setChangePostCode] = useState(location?.postcode)
  const [changeNumber, setChangeNumber] = useState(null)

  // общая стоимость
  const totalPrice = cartItem.reduce((total, item) => {
    const price = (item.newPrice ? item.newPrice : item.price) * item.quantity
    return total + price
  }, 0)

  function applyCodeFunc(e) {
    const promocodeBtn = document.querySelector('.input__promocode').nextElementSibling
    if (e.target.value !== '') {
      promocodeBtn.classList.add('active-btn')
    } else {
      promocodeBtn.classList.remove('active-btn')
    }
    setCodeValue(e.target.value)
    //  console.log(codeValue)
  }
  // handling inputs
  function onChangeName(e) {
    setChangeName(user?.fullName ? user?.fullName : e.target.value)
  }
  function onChangeAddress(e) {
    setChangeAddress(user?.primaryEmailAddress.emailAddress ? user?.primaryEmailAddress.emailAddress : e.target.value)
  }
  function onChangeCountry(e) {
    setChangeCountry(location?.country ? location?.country : e.target.value)
  }
  function onChangeState(e) {
    setChangeState(location?.state ? location?.state : e.target.value)
  }
  function onChangePostCode(e) {
    setChangePostCode(location?.postcode ? location?.postcode : e.target.value)
  }
  function onChangeNumber(e) {
    setChangeNumber(e.target.value)
  }
  return (
    <div className="mt-40 md:mt-60 mb-5 px-0 sm:px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div className="block-container">
          <h1 className="font-bold text-2xl text-firm mb-2">My Cart ({cartItem.length})</h1>
          <div className="text-red-500">Delivery charge is free from $100</div>
          <div>
            <div className="mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div key={index} className="bg-gray-100 p-3.5 sm:p-5 rounded-md flex items-center justify-between mt-3 w-full">
                    <div className="flex items-center gap-4">
                      <img src={`../../public/images/products/${item.img}`} onClick={() => navigate(`/products/${item.title}`)} alt={item.title} className="w-20 h-20 rounded-md" />
                      <div className="flex-auto">
                        <h1 className="text-firm md:w-[300px] line-clamp-2 ">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg">${item.newPrice ? item.newPrice : item.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="bg-firm/80 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                        <button onClick={() => updateQuantity(cartItem, item.id, 'decrease')} className="cursor-pointer">
                          -
                        </button>
                        <span className="pt-0.5 w-5 flex-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(cartItem, item.id, 'increase')} className="cursor-pointer">
                          +
                        </button>
                      </div>
                      <span onClick={() => deleteItem(item.id)} className="hover:bg-white/60 self-end transition-all rounded-full p-3 hover:shadow-2xl">
                        <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:gap-20">
              <div className="relative text-firm bg-gray-100 rounded-md p-3.5 sm:p-7 mt-4 space-y-2">
                <h1 className="text-firm font-bold text-xl">Delivery Info</h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name:</label>
                  <input type="text" placeholder="Enter your name" className="p-2 rounded-md text-red-500" value={changeName} onChange={onChangeName} />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address:</label>
                  <input type="text" placeholder="Enter your address" className="p-2 rounded-md text-red-500" value={changeAddress} onChange={onChangeAddress} />
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State:</label>
                    <input type="text" placeholder="Enter your state" className="p-2 rounded-md w-full text-red-500" value={changeState} onChange={onChangeState} />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode:</label>
                    <input type="text" placeholder="Enter your postcode" className="p-2 rounded-md w-full text-red-500" value={changePostCode} onChange={onChangePostCode} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country:</label>
                    <input type="text" placeholder="Enter your country" className="p-2 rounded-md w-full text-red-500" value={changeCountry} onChange={onChangeCountry} />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No:</label>
                    <input type="text" placeholder="Enter your Number" className="p-2 rounded-md w-full text-red-500" value={changeNumber} onChange={onChangeNumber} />
                  </div>
                </div>
                <button className="text-white mt-5 cursor-pointer rounded-md bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3 hover:bg-white hover:text-firm transition-all duration-300">
                  Submit
                </button>
                {/* <div className="flex items-center justify-center w-full text-gray-700">---------OR-----------</div> */}
                <div className="flex sm:justify-center sm:absolute mt-5 sm:mt-0 top-4 right-4">
                  <button
                    onClick={getLocation}
                    className="text-white cursor-pointer rounded-md bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3 hover:bg-white hover:text-firm transition-all duration-300"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-3.5 sm:p-7 mt-4 space-y-2 h-max">
                <h1 className="text-firm font-bold text-xl">Bill details</h1>
                <div className="text-firm flex justify-between items-center">
                  <h1 className="flex gap-1 items-center">
                    <span>
                      <LuNotebookText />
                    </span>
                    <span>Items total:</span>
                  </h1>
                  <p className="text-red-500">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-firm">
                  <h1 className="flex gap-1 items-center">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    <span>Delivery Charge</span>
                  </h1>
                  {totalPrice >= 100 ? (
                    <p className="text-red-500 font-semibold">
                      <span className="text-gray-600 line-through">$5</span> FREE
                    </p>
                  ) : (
                    <p className="text-red-500 font-semibold">$5</p>
                  )}
                  {/* <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$5</span> FREE
                  </p> */}
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-firm">
                    <span>
                      <GiShoppingBag />
                    </span>
                    <span>Handling Charge</span>
                  </h1>
                  <p className="text-red-500 font-semibold">$3</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg text-firm">Grand total</h1>
                  {totalPrice >= 100 ? <p className="font-semibold text-lg text-red-500">${(totalPrice + 3).toFixed(2)}</p> : <p className="font-semibold text-lg text-red-500">${totalPrice + 8}</p>}
                </div>
                <div>
                  <h1 className="font-semibold text-firm mb-3 mt-7">Apply Promo Code</h1>
                  <div className="flex gap-3">
                    <input type="text" value={codeValue} onChange={applyCodeFunc} placeholder="Enter code" className="input__promocode p-2 rounded-md w-full text-red-500" />
                    <button className="bg-white text-firm/70 border-2 border-firm/40 px-4 cursor-pointer py-1 rounded-md">Apply</button>
                  </div>
                </div>
                <button className="text-white cursor-pointer rounded-md bg-firm border-2 border-firm pb-2 pt-2.5 px-4 flex-center gap-3 hover:bg-white hover:text-firm transition-all duration-300 mt-5">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-firm font-bold text-5xl text-muted">Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className="w-[400px]" />
          <button onClick={() => navigate('/products')} className="bg-firm text-white border-2 border-firm hover:bg-white hover:text-firm px-4 pb-2 pt-2.5 rounded-md cursor-pointer ">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}
