import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { parking_options_d } from '../../config/config'
import { getparams, updateForm } from '../../config/slices/properties'
const FilterModalParking = () => {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('--')  
  const params = useSelector(getparams)

  useEffect(() => {
    setSelected(params.parking_options)
  },[params])

  const onChangeValue = (e) => {
    var params = {
      parking_options: e.target.value,
    }
    var temp = e.target.value

    if (temp === '--') {
      params = {
        parking_options: '',
      }
    }

    dispatch(updateForm(params))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <select
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '14px',
          border: '1px solid #e3e3e3',
          borderRadius: '6px',
        }}
        value={selected}
        onChange={onChangeValue}
      >
        <option value="--">Any</option>
        {Object.keys(parking_options_d).length > 0 && (
          <>
            {parking_options_d.map((item, index) => {
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

export default FilterModalParking
