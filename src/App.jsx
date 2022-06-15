import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ContainerFiftyFifty from './components/ContainerFiftyFifty'
import { fetchAsyncSearch } from './config/actions/properties'

export const defaultPropsShortCode = {
  center: {
    lat: Number(
      document
        .getElementById('ib-wrapper-residentials')
        .getAttribute('data-lat'),
    ),
    lng: Number(
      document
        .getElementById('ib-wrapper-residentials')
        .getAttribute('data-lng'),
    ),
  },
  zoom: Number(
    document
      .getElementById('ib-wrapper-residentials')
      .getAttribute('data-zoom'),
  ),
  filter: String(
    document
      .getElementById('ib-wrapper-residentials')
      .getAttribute('data-filter'),
  ),
}
window.global_settings = defaultPropsShortCode.filter === '' ? window.__flex_idx_search_filter_v2 : window.__flex_idx_search_filter

const App = () => {
  const dispatch = useDispatch()

  console.log('App started', defaultPropsShortCode)

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
