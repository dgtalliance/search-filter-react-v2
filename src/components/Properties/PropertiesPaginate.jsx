import { memo, useCallback } from "react"
import { useDispatch } from "react-redux";
import { fetchAsyncSearch } from "../../config/actions/properties";
import { updateForm } from "../../config/slices/properties";

function PropertiesPaginate({ pagination, current }) {
  const { prev, next, pages, range } = pagination
  const dispatch = useDispatch()

  console.log("Render PropertiesPaginate");  
  const paginate = useCallback((page)=>{
    console.log('page',page);
    dispatch(updateForm({ page }))
    dispatch(fetchAsyncSearch())
  })

  return (
    <div className="ib-wrapper-pagination">
      <ul className="ib-pagination">
        {prev ? (
          <li className="ib-page-item">
            <button
              className="ib-page-link -icon-arrow -prev"
              onClick={() => paginate(current - 1)}
            >
              Previous Page
            </button>
          </li>
        ) : null}
        {range?.map((page) => (
          <li
            onClick={() => paginate(page)}
            key={`page-picker-${page}`}
            className={`ib-page-item ${current === page ? 'active' : ''}`}
          >
            <button className="ib-page-link">{page}</button>
          </li>
        ))}
        {next ? (
          <li
            className="ib-page-item"
            onClick={() => paginate(current+1)}
          >
            <button className="ib-page-link -icon-arrow -next">Next Page</button>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default memo(PropertiesPaginate)
