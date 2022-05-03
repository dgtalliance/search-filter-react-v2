import { useState } from 'react'
import FilterPropertyType from './FilterPropertyType'

function ContainerFilterPropertyType() {
  const [title, setTitle] = useState('Any Types')

  return (
    <>
      <div className="ib-wrapper-dropdown -types">
        <button className="ib-action -types js-show-basic-filter">
          <span id="text-types" data-text="Any Types">
            {title}
          </span>
        </button>
        <div className="ib-dropdown">
          <div className="ib-wrapper-title">Property Type</div>
          <FilterPropertyType setTitle={setTitle} />
        </div>
      </div>
    </>
  )
}

export default ContainerFilterPropertyType
