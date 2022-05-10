import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { waterfront_options_d } from '../../config/config'
import { getparams, updateForm } from '../../config/slices/properties'
const FilterModalWaterfront = () => {
  const dispatch = useDispatch()
  
  const [selected, setSelected] = useState('--')  
  const params = useSelector(getparams)

  useEffect(() => {
    setSelected(params.waterfront_options)
  },[params])

  const onChangeValue = (e) => {
    var params = {
      waterfront_options: e.target.value,
    }
    var temp = e.target.value

    if (temp === '--') {
      params = {
        waterfront_options: '',
      }
    }

    dispatch(updateForm(params))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <select
        value= {selected}
        onChange={onChangeValue}
      >
        <option value="--">Any</option>
        {Object.keys(waterfront_options_d).length > 0 && (
          <>
            {waterfront_options_d.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              )
            })}
          </>
        )}
      </select>
    </>
  )
}

export default FilterModalWaterfront
