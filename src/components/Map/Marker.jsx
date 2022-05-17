import { memo} from 'react'
import { abbreviateNumber } from '../../utils/utils'
import CustomInfoWindow from './CustomInfoWindow'

const Marker = ({ info }) => {
  console.log('Marker')
    const setActive = (data)=> {
        console.log(data);
    }
  return (
    <>
      {
        <div className="mo-marker-container">
          {info.group.length > 1 ? (
            <div
              onClick={(e) => setActive(info.group[0].mls_num)}
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
              className={`dgt-richmarker-single ${
                info.item.hovered ? 'ib-search-marker-active' : ''
              }`}
            >
              <strong>{abbreviateNumber(info.group[0].price)}</strong>
            </div>
          )}

         <CustomInfoWindow
         info={info}
         />
        </div>
      }
    </>
  )
}
function areEqual(prev, next) {
  return prev.info === next.info
}
export default memo(Marker)
