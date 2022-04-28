import { memo } from 'react'

function MapSearch() {
  console.log("Render Map");
  return (
    <div className="ib-wrapper-map">
      <div className="ib-map-content"></div>
    </div>
  )
}

export default memo(MapSearch)
