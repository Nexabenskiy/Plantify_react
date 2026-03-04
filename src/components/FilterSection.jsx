import list from '../../public/svg/list.svg'
import { BadgeDollarSign } from 'lucide-react'
import { MdNewReleases } from 'react-icons/md'

export default function FilterSection({
  search,
  setSearch,
  togglePlantsValue,
  toggleStandsValue,
  checkedPlants,
  checkedStands,
  isSale,
  setIsSale,
  isFeatured,
  setIsFeatured,
  isNew,
  setIsNew,
  priceRange,
  setPriceRange,
}) {
  return (
    <div className="flex-center flex-col self-start hidden md:block relative">
      <img src={list} width={100} alt="" className="absolute top-0" />
      <div className="bg-firm text-text h-max hidden md:block rounded-md p-4 pt-8 mt-22">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search.." className="bg-white text-firm p-2 rounded-md  outline-0" />

        <div className="text-white mt-5 relative">
          <div className="mb-2">
            <input type="checkbox" value="plants" checked={checkedPlants} onChange={togglePlantsValue} name="" id="plants" />
            <label htmlFor="plants" className="category-checkbox cursor-pointer">
              Plants
            </label>
          </div>
          <span className="absolute right-18 bottom-3 text-3xl font-chill tracking-wide">or</span>
          <div className="mb-5">
            <input type="checkbox" value="stands" checked={checkedStands} onChange={toggleStandsValue} name="" id="stands" />
            <label htmlFor="stands" className="category-checkbox cursor-pointer">
              Stands
            </label>
          </div>
        </div>
        <hr />
        <div className="text-white mt-5 mb-5 relative">
          <div className="mb-2">
            <input type="checkbox" name="" id="sale" onChange={() => setIsSale(!isSale)} />
            <label htmlFor="sale" className="category-checkbox cursor-pointer relative">
              <span>Sale</span>
              <BadgeDollarSign className="absolute -right-7 -top-2" />
            </label>
          </div>
          <div className="mb-2">
            <input type="checkbox" name="" id="featured" onChange={() => setIsFeatured(!isFeatured)} />
            <label htmlFor="featured" className="category-checkbox cursor-pointer">
              Featured
            </label>
          </div>
          <div className="mb-2">
            <input type="checkbox" name="" id="new" onChange={() => setIsNew(!isNew)} />
            <label htmlFor="new" className="category-checkbox cursor-pointer relative">
              <span>New</span>
              <MdNewReleases className="absolute -right-7 -top-1.5 text-2xl" />
            </label>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-2 mt-5 overflow-hidden" style={{ priceValue: 80 }}>
          <label htmlFor="">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            type="range"
            min="0"
            max="100"
            step={1}
            name=""
            id="price-range"
            className="transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}
