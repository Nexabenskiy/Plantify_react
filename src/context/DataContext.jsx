import { createContext, useEffect, useState } from 'react'
import { fakeFetchProducts, fakeFetchArrivals } from '../api'

// console.log(fakeFetchProducts())

const DataContext = createContext({
  dataProducts: [],
  dataArrivals: [],
  loading: false,
})
// console.log(DataContext)

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [dataProducts, setDataProducts] = useState()
  const [dataArrivals, setDataArrivals] = useState()
  // console.log(loading, dataProducts)

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try {
        const products = await fakeFetchProducts()
        const arrivals = await fakeFetchArrivals()
        //   console.log(products)
        console.log(products)
        setDataProducts(products)
        setDataArrivals(arrivals)
      } catch (error) {
        console.log(error)
      }
    }
    preload()
  }, [])
  return <DataContext.Provider value={{ loading, dataProducts, dataArrivals }}>{children}</DataContext.Provider>
}

export default DataContext
