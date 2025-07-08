import React from 'react'
import '../styles/components/pagination.css'

class Pagination extends React.Component {
  render() {
    const {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      onPageChange,
      onPageSizeChange,
    } = this.props

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    return (
      <div className="pagination-container">
        <div className="items-info">
          {startItem}-{endItem} of {totalItems} items
        </div>

        <div className="page-navigation">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="page-btn prev-btn"
          >
            &lt;
          </button>

          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="page-btn"
            >
              {currentPage - 1}
            </button>
          )}

          <button className="page-btn active">{currentPage}</button>

          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="page-btn"
            >
              {currentPage + 1}
            </button>
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="page-btn next-btn"
          >
            &gt;
          </button>
        </div>

        <div className="page-size-selector">
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            className="page-size-select"
          >
            <option value={10}>10 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Pagination
