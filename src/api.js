import { dataProducts } from './data'
import { dataArrivals } from './data'

export function fakeFetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataProducts)
    }, 1)
  })
}

export function fakeFetchArrivals() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataArrivals)
    }, 1)
  })
}
