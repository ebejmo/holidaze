export default function SortBy({ value, onChange }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="h5 mb-0">All Venues</h2>

      <div className="d-flex align-items-center gap-2">
        <label
          htmlFor="sortBy"
          className="form-label mb-0 me-2 text-muted small"
        >
          Sort by:
        </label>
        <select
          name="sort"
          id="sortBy"
          className="form-select form-select-sm"
          aria-label="Sort venues"
          value={value}
          onChange={onChange}
        >
          <option value="latest">Latest</option>
          <option value="price">Lowest price</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>
    </div>
  );
}
