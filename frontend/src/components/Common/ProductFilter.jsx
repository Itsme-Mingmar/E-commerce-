const ProductFilter = ({ filters, setFilters }) => {
  return (
    <div className="space-y-6">

      {/* CATEGORY */}
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        <select
          className="w-full border p-2 rounded cursor-pointer"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="Protein">Protein</option>
          <option value="Pre-Workout & Performance">
            Pre-Workout & Performance
          </option>
          <option value="Vitamins & Wellness">Vitamins & Wellness</option>
        </select>
      </div>

      {/* TAG */}
      <div>
        <h4 className="font-semibold mb-2">Tag</h4>
        <select
          className="w-full border p-2 rounded cursor-pointer"
          value={filters.tags}
          onChange={(e) =>
            setFilters({ ...filters, tags: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Best Seller">Best Seller</option>
        </select>
      </div>

    </div>
  )
}

export default ProductFilter
