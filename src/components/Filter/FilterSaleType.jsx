import { Button, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { getparams, updateForm } from '../../config/slices/properties'

const FilterSaleType = () => {
  const params = useSelector(getparams)
  const [active, setActive] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setActive(params.sale_type !== '' ? params.sale_type : 0)
  }, [params])

  const handleClick = (e) => {
    e.preventDefault()
    var sale = parseInt(e.target.value)
    setActive(sale)
    var tempPrice = {
      min_sale_price: '',
      max_sale_price: '',
      min_rent_price: '',
      max_rent_price: '',
      page: 1,
      sale_type: sale,
    }
    dispatch(updateForm(tempPrice))
    dispatch(fetchAsyncSearch())
  }

  return (
    <>
      <div className="ib-chk-list -property">
        <div className="ant-radio-group ant-radio-group-outline">
          <Radio.Group defaultValue={active} size="large">
            <Radio.Button
              className={
                parseInt(active) === 0 ? `ant-radio-button-wrapper-checked` : ``
              }
              value="0"
              onClick={handleClick}
            >
              For Sale
            </Radio.Button>
            <Radio.Button
              className={
                parseInt(active) === 1 ? `ant-radio-button-wrapper-checked` : ``
              }
              value="1"
              onClick={handleClick}
            >
              For Rent
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </>
  )
}

export default FilterSaleType
