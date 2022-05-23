import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { updateDataMap } from '../../config/slices/properties'
import { abbreviateNumber } from '../../utils/utils'
import CustomInfoWindow from './CustomInfoWindow'

const Marker = ({ info }) => {
  console.log('Marker')
  const dispatch = useDispatch()
  const setActive = (data) => {
    console.log(data)
  }
  const handleOnItemMouseEnter = (e, value) => {
    e.preventDefault()
    dispatch(updateDataMap({ mls_num: value, active: true }))
  }

  const handleOnItemMouseLeave = (e, value) => {
    e.preventDefault()
    dispatch(updateDataMap({ mls_num: value, active: false }))
  }
  return (
    <>
      {
        <>
          {info.group.length > 1 ? (
            <div
              onClick={(e) => setActive(info.group[0].mls_num)}
              onMouseEnter={(e) =>
                handleOnItemMouseEnter(e, info.group[0].mls_num)
              }
              onMouseLeave={(e) =>
                handleOnItemMouseLeave(e, info.group[0].mls_num)
              }
              className={`dgt-richmarker-group ${
                info.item.hovered ? 'ib-search-marker-active' : ''
              }`}
            >
              <strong>{info.group.length}</strong>
              <span>Units</span>
            </div>
          ) : (
            <div
              onClick={(e) => setActive(info.group[0].mls_num)}
              onMouseEnter={(e) =>
                handleOnItemMouseEnter(e, info.group[0].mls_num)
              }
              onMouseLeave={(e) =>
                handleOnItemMouseLeave(e, info.group[0].mls_num)
              }
              className={`dgt-richmarker-single ${
                info.item.hovered ? 'ib-search-marker-active' : ''
              }`}
            >
              <strong>{abbreviateNumber(info.group[0].price)}</strong>
            </div>
          )}
         {/*  {info.item.hovered && (
            <CustomInfoWindow info={info} />
          )} */}
        </>
      }
    </>
  )
}
function areEqual(prev, next) {
  return prev.info === next.info
}
export default memo(Marker)
