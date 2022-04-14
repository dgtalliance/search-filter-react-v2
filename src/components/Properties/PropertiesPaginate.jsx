function PropertiesPaginate({ pagination, current }) {
  const { prev, next, pages, range } = pagination

  const paginate = ()=>{
      
  }

  return (
    <div className="ib-wrapper-pagination">
      <ul className="ib-pagination">
        {prev ? (
          <li className="ib-page-item">
            <a
              className="ib-page-link -icon-arrow -prev"
              onClick={() => paginate((p) => (p > 1 ? p - 1 : p))}
            >
              Previous Page
            </a>
          </li>
        ) : null}
        {range.map((page) => (
          <li
            onClick={() => paginate(page)}
            key={`page-picker-${page}`}
            className={`ib-page-item ${current === page ? 'active' : ''}`}
          >
            <a className="ib-page-link">{page}</a>
          </li>
        ))}
        {next ? (
          <li
            className="ib-page-item"
            onClick={() => paginate((p) => (p < pages ? p + 1 : p))}
          >
            <a className="ib-page-link -icon-arrow -next">Next Page</a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default PropertiesPaginate
