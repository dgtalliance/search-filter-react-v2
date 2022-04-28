import HTMLReactParser from 'html-react-parser'
import { memo } from 'react'

const PropertiesHackbox = ({ index, hackbox }) => {
  return (
    <>
    {/*   {(index === 0 && hackbox!==undefined) ? (
        <li className="ib-pitem ib-pitem-marketing">{HTMLReactParser(hackbox)}</li>
      ) : null} */}
    </>
  )
}

export default memo(PropertiesHackbox)
