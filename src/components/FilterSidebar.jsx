import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearFilters,
  setCategory,
  setPriceRange,
  setSearch,
  setSort,
} from '../features/filters/filterSlice.js'

const MAX_PRICE = 150000
const categories = ['All', 'Smartphones', 'Audio', 'Accessories']
const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

const FilterSidebar = memo(function FilterSidebar() {
  const dispatch = useDispatch()
  const { category, minPrice, maxPrice, search, sortBy } = useSelector(
    (state) => state.filters,
  )

  const updatePrice = useCallback(
    (nextMinPrice, nextMaxPrice) => {
      dispatch(
        setPriceRange({
          minPrice: Math.min(nextMinPrice, nextMaxPrice),
          maxPrice: Math.max(nextMinPrice, nextMaxPrice),
        }),
      )
    },
    [dispatch],
  )
  const handleClear = useCallback(() => dispatch(clearFilters()), [dispatch])
  const handleSearch = useCallback(
    (event) => dispatch(setSearch(event.target.value)),
    [dispatch],
  )
  const handleCategory = useCallback(
    (event) => dispatch(setCategory(event.target.value)),
    [dispatch],
  )
  const handleSort = useCallback(
    (event) => dispatch(setSort(event.target.value)),
    [dispatch],
  )

  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <div className="sidebar-tab">Filter / sort</div>
      <div className="filter-heading">
        <div>
          <span className="eyebrow">Make it yours</span>
          <h2>Filters</h2>
        </div>
        <button className="text-button" type="button" onClick={handleClear}>Clear all</button>
      </div>

      <label className="filter-label" htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        className="filter-input"
        type="search"
        placeholder="Try “Samsung”"
        value={search}
        onChange={handleSearch}
      />

      <fieldset className="filter-group">
        <legend>Category</legend>
        {categories.map((option) => (
          <label className="radio-row" key={option}>
            <input type="radio" name="category" value={option} checked={category === option} onChange={handleCategory} />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group price-group">
        <legend>Price range</legend>
        <div className="price-values"><span>{formatPrice(minPrice)}</span><span>{formatPrice(maxPrice)}</span></div>
        <label htmlFor="minimum-price">Minimum price</label>
        <input id="minimum-price" type="range" min="0" max={MAX_PRICE} step="500" value={minPrice} onChange={(event) => updatePrice(Number(event.target.value), maxPrice)} />
        <label htmlFor="maximum-price">Maximum price</label>
        <input id="maximum-price" type="range" min="0" max={MAX_PRICE} step="500" value={maxPrice} onChange={(event) => updatePrice(minPrice, Number(event.target.value))} />
      </fieldset>

      <label className="filter-label" htmlFor="sort-products">Sort by</label>
      <select id="sort-products" className="filter-input" value={sortBy} onChange={handleSort}>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="newest">Newest</option>
      </select>
    </aside>
  )
})

export default FilterSidebar
