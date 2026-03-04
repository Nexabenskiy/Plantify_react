// import { useContext } from 'react'
import DataContext from '../context/dataContext'

import { useEffect, useState } from 'react'
import FilterSection from '../components/FilterSection'
import { ProductCard } from '../components/ProductCard'

import { dataProducts } from '../data'
import MobileFilter from '../components/MobileFilter'

// import Lottie from 'lottie-react'
// import notfound from '../../public/video/not-found-animation-gif.mp4'

export default function Products() {
  // const { data as dataProducts } = useContext(DataContext)
  // console.log(dataProducts)

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // })

  const [search, setSearch] = useState('')
  const [plants, setPlants] = useState(true)
  const [stands, setStands] = useState(true)
  // labels
  const [isSale, setIsSale] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isNew, setIsNew] = useState(false)
  // console.log(isSale)
  const [priceRange, setPriceRange] = useState([0, 100])

  // checked states
  const [checkedPlants, setCheckedPlants] = useState(true)
  const [checkedStands, setCheckedStands] = useState(true)
  // open mobileFilter
  const [openFilter, setOpenFilter] = useState(false)

  // добавляю в объект с продуктом ключ/значение (newPrice, isFeatured, isNew). если есть лэйбл со скидкой то высчитываю старую цену
  const data = dataProducts.reduce((acc, item) => {
    item.lables.forEach((label) => {
      if (label === '-10%' || label === '-20%' || label === '-30%' || label === '-40%' || label === '-50%') {
        const sale = +label.slice(1, -1)
        const newPrice = item.price - (item.price / 100) * sale
        item = { ...item, newPrice }
      }
      if (label === 'Featured') {
        item = { ...item, isFeatured: true }
      }
      if (label === 'New') {
        item = { ...item, isNew: true }
      }
    })
    acc.push(item)
    return acc
  }, [])

  const filteredData = data?.reduce((acc, item) => {
    if (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      ((plants === true && !item.plantStand) ||
        (stands === true && item.plantStand) ||
        (plants === false && stands === false && isSale === true && item.newPrice) ||
        (plants === false && stands === false && isFeatured === true && item.isFeatured) ||
        (plants === false && stands === false && isNew === true && item.isNew)) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    ) {
      acc.push(item)
    }
    // if (plants === true && !item.plantStand && sale === true && item.newPrice) {
    //   // if (!item.plantStand && item.newPrice) {
    //   // acc = []
    //   acc.push(item)
    //   console.log(acc)
    //   // }
    // }
    return acc
  }, [])
  // console.log(filteredData)

  // functions
  function togglePlantsValue() {
    setPlants((plants) => !plants)
    setCheckedPlants((checkedPlants) => !checkedPlants)
  }
  function toggleStandsValue() {
    setStands((stands) => !stands)
    setCheckedStands((checkedStands) => !checkedStands)
  }

  return (
    <section className="products w-full min-h-dvh">
      <div className="block-container mt-60">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          togglePlantsValue={togglePlantsValue}
          toggleStandsValue={toggleStandsValue}
          checkedPlants={checkedPlants}
          checkedStands={checkedStands}
          isSale={isSale}
          setIsSale={setIsSale}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
          isNew={isNew}
          setIsNew={setIsNew}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className=" flex justify-center sm:justify-between mt-5 md:mt-0 items-start  sm:gap-4 xl:gap-8 h-max text-firm">
          {data?.length > 0 ? (
            <>
              <FilterSection
                search={search}
                setSearch={setSearch}
                togglePlantsValue={togglePlantsValue}
                toggleStandsValue={toggleStandsValue}
                checkedPlants={checkedPlants}
                checkedStands={checkedStands}
                isSale={isSale}
                setIsSale={setIsSale}
                isFeatured={isFeatured}
                setIsFeatured={setIsFeatured}
                isNew={isNew}
                setIsNew={setIsNew}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              {filteredData.length > 0 ? (
                <div className="flex-center flex-col">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 xl:gap-6.5">
                    {filteredData.map((prod, index) => (
                      <ProductCard key={index} prod={prod} isProdCard isProductPage />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-max md:max-w-[900px] ">
                  <div className="block-container mt-0 pb-30 flex-center">
                    <div>
                      <video autoPlay loop muted>
                        <source src="../../public/video/not-found-animation-gif.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <h2 className="text-center text-4xl font-bold font-chill">Sorry, I didn't find anything.</h2>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <video muted autoPlay loop>
                <source src={loading} type="video/webm" />
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
