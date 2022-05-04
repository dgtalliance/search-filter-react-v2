import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'
import CheckboxGroup from '../common/Checkbox'
import { amenities_d, property_type_d } from '../../config/config'

const FilterModalFeatures = () => {
  const dispatch = useDispatch()
  const [listCheck, setlistCheck] = useState([])
  var params = useSelector(getparams)
  var amenities

  useEffect(() => {
    amenities = params.amenities
    if (Array.isArray(amenities)) {
      setlistCheck(amenities)
    } else {
      var temp = amenities.split(',')
      setlistCheck(temp)
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
    var pt = { amenities: temp.join(','), page: 1 }
    dispatch(updateForm(pt))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <CheckboxGroup
        dataValue={amenities_d}
        defaultValue={listCheck}
        changeClick={handleChangeItem}
        labelTitle={''}
        identificator={'ib-amenitiesList'}
      />
    </>
  )
}

export default FilterModalFeatures
