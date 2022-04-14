import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContainerFiftyFifty from './components/ContainerFiftyFifty'
import { fetchAsyncSearch } from './config/actions/properties'

const App = () => {
  const dispatch = useDispatch()

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
