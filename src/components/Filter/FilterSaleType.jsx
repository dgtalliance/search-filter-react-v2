import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { getparams, updateForm } from '../../config/slices/properties'

const FilterSaleType = () => {
  const params = useSelector(getparams)
  const [active, setActive] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setActive(params.sale_type !== '' ? params.sale_type : 0)
    console.log('FilterSaleType')
  }, [params])

  const handleClick = (value) => {
    setActive(value)
    var tempPrice = {
      min_sale_price: '',
      max_sale_price: '',
      min_rent_price: '',
      max_rent_price: '',
      page:1,
      sale_type: value,
    }
    dispatch(updateForm(tempPrice))
    console.log('FilterSaleType Click')
    dispatch(fetchAsyncSearch())
  }

  return (
    <>
      <div className="ib-chk-list -property">
        <div className="ant-radio-group ant-radio-group-outline">
          <label
            className={
              parseInt(active) === 0
                ? `ant-radio-button-wrapper ant-radio-button-wrapper-checked`
                : `ant-radio-button-wrapper`
            }
            onClick={() => {
              handleClick(0)
            }}
          >
            <span className="ant-radio-button">
              <input
                type="radio"
                className="ant-radio-button-input"
                value="0"
              />
              <span className="ant-radio-button-inner"></span>
            </span>
            <span>For Sale</span>
          </label>
          <label
            className={
              parseInt(active) === 1
                ? `ant-radio-button-wrapper ant-radio-button-wrapper-checked`
                : `ant-radio-button-wrapper`
            }
            onClick={() => {
              handleClick(1)
            }}
          >
            <span className="ant-radio-button">
              <input
                type="radio"
                className="ant-radio-button-input"
                value="1"
              />
              <span className="ant-radio-button-inner"></span>
            </span>
            <span>For Rent</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default memo(FilterSaleType)
