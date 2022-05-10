import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { property_type_d } from '../../config/config'
import { getparams } from '../../config/slices/properties'
import { pluck } from '../../utils/utils'
import FilterPropertyType from './FilterPropertyType'

function ContainerFilterPropertyType() {
  const [title, setTitle] = useState('Any Types')
  var params = useSelector(getparams)

  const defaultTitle = (arrDefault, arrValue) => {
    var temp = []
    arrDefault.forEach((element) => {
      if (arrValue.find((f) => f.toString() === element.value.toString())) {
        temp.push(element)
      }
    })
    var labels = pluck(temp, 'label')
    setTitle(labels.join(', '))
  }


  useEffect(() => {
    var property_type = params.property_type
    console.log(params);
    if (Array.isArray(property_type)) {
      defaultTitle(property_type_d, property_type)
    } else {
      var temp = property_type.split(',')
      defaultTitle(property_type_d, temp)
    }

  },[params])
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
          <FilterPropertyType />
        </div>
      </div>
    </>
  )
}

export default ContainerFilterPropertyType
