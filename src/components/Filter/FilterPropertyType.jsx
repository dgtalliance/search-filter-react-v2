import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'
import CheckboxGroup from '../common/Checkbox'
import { pluck } from '../../utils/utils'

var temp_property_type = [
  {
    label: 'Single Family Homes',
    value: 2,
  },
  {
    label: 'Condominiums',
    value: 1,
  },
  {
    label: 'Townhouses',
    value: 'tw',
  },
  {
    label: 'Multi-Family',
    value: 'mf',
  },
  {
    label: 'Vacant Land',
    value: 'valand',
  },
]

export const property_type_d =
  window.location.host === 'localhost:3000'
    ? temp_property_type
    : window.__flex_g_settings.params.property_types

const FilterPropertyType = ({ setTitle }) => {
  const dispatch = useDispatch()
  const [listCheck, setlistCheck] = useState([])
  var params = useSelector(getparams)
  var property_type

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
    property_type = params.property_type
    if (Array.isArray(property_type)) {
      setlistCheck(property_type)
      defaultTitle(property_type_d, property_type)
    } else {
      var temp = property_type.split(',')
      setlistCheck(temp)
      defaultTitle(property_type_d, temp)
    }
  }, [params])

  const checkedDefault = (v) => {
    return listCheck.find((f) => f.toString() === v.toString())
  }

  const handleChangeItem = (e) => {
    var v = e.target.value
    var temp = []
    if (checkedDefault(v)) {
      temp = listCheck.filter((item) => item !== v)
    } else {
      temp = Array.from(listCheck)
      temp.push(v)
    }
    handleSubmit(temp)
  }

  const handleSubmit = (temp) => {
    var pt = { property_type: temp.join(','), page: 1 }
    dispatch(updateForm(pt))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <CheckboxGroup
        dataValue={property_type_d}
        defaultValue={listCheck}
        changeClick={handleChangeItem}
        labelTitle={''}
        identificator={'ib-amenitiesList'}
      />

      {/*  {Object.keys(property_type_data).length > 0 && (
        <div className="ib-typesList">
         
            {property_type_data.map((item, index) => {
              return (          
                <div className="ib-chk-wrapper" key={index}>
                <input
                  type="checkbox"
                  id={`ib-ppt-outer_${item.value}`}
                  name="any_types"
                  value={item.value}
                  onChange={checkedActive}
                  defaultChecked={checkedDefault(item.value)}
                />
                <label htmlFor={`ib-ppt-outer_${item.value}`}>
                  {item.label}
                </label>
              </div> 
              )
            })}
         
        </div>
      )} */}
    </>
  )
}

export default FilterPropertyType
