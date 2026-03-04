import Arrivals from '../sections/Arrivals'
import Featured from '../sections/Featured'
import Hero from '../sections/Hero'
import PlantStands from '../sections/PlantStands'
import SearchSection from '../sections/SearchSection'

export default function Shop() {
  // console.log(openSearchSection)
  return (
    <>
      <Hero />
      <Featured />
      {/* {openSearchSection && <SearchSection />} */}
      <Arrivals />
      <PlantStands />
    </>
  )
}
