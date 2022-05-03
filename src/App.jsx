import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ContainerFiftyFifty from './components/ContainerFiftyFifty'
import { fetchAsyncSearch } from './config/actions/properties'

let zm = undefined

export const defaultPropsShortCode ={
  center: {
    lat: Number(document.getElementById('ib-wrapper-residentials').getAttribute('data-lat')),
    lng: Number(document.getElementById('ib-wrapper-residentials').getAttribute('data-lng')),
  },
  zoom: zm ? Number(zm) : Number(document.getElementById('ib-wrapper-residentials').getAttribute('data-zoom')),
  filter: zm ? String(zm) : String(document.getElementById('ib-wrapper-residentials').getAttribute('data-filter')),
}
console.log('defaultPropsShortCode',defaultPropsShortCode);
const App = () => {
  const dispatch = useDispatch()
  console.log("App render");
  useEffect(() => {
   dispatch(fetchAsyncSearch())
  }, [dispatch])

  return (
    <>
      <ContainerFiftyFifty />
    </>
  )
}

export default App
