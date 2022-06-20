import React, { createContext, useState } from 'react'
import { useDispatch } from 'react-redux'

import { removeDetail } from '../config/slices/propertiesDetails'

const FilterContext = createContext()

const FilterProvider = ({ children }) => {
  const dispatch = useDispatch()
  // Slug
  const [slug, setSlug] = useState('')

  const [autoMapSearch, setAutoMapSearch] = useState(true)

  ////// OPEN MODAL
  const [modalData, setModalData] = useState(null)
  const [modalInfoWindow, setModalInfoWindow] = useState([])

  const openModal = (datainfo) => {
    setModalData(datainfo)

    if (!document.body.classList.contains('openModals')) {
      document.body.classList.add('openModals')
    }

    var new_slug = slug
      ? slug + `&show=${datainfo.mls_num}`
      : `show=${datainfo.mls_num}`
    history.replaceState(null, null, '?' + new_slug)
    setSlug(new_slug)
  }
  const closeModal = () => {
    setModalData(null)
    dispatch(removeDetail())
    if (document.body.classList.contains('openModals')) {
      document.body.classList.remove('openModals')
    }

    if (slug.includes('&')) {
      let pos = slug.lastIndexOf('&')
      let new_str = slug.slice(0, pos)
      history.replaceState(null, null, '?' + new_str)
      setSlug(new_str)
    } else {
      history.replaceState(null, null, '')
      setSlug('')
    }
  }

  //Modal Alert Component
  const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
  const [success, setSuccess] = useState(false)

  const isOpenModalAlert = () => {
    setIsOpenModalMessage(true)
    setSuccess(true)
    if (!document.body.classList.contains('openModals')) {
      document.body.classList.add('openModals')
    }
  }
  const closeModalAlert = () => {
    setIsOpenModalMessage(false)
    setSuccess(true)
    if (document.body.classList.contains('openModals')) {
      document.body.classList.remove('openModals')
    }
  }
  const defSuccess = (val) => {
    setSuccess(val)
  }

  const data = {
    modalData,
    openModal,
    closeModal,
    isOpenModalMessage,
    success,
    defSuccess,
    isOpenModalAlert,
    closeModalAlert,
    slug,
    setSlug,
    modalInfoWindow,
    setModalInfoWindow,
    autoMapSearch,
    setAutoMapSearch,
    setModalData, 
  }
  return (
    <FilterContext.Provider value={data}>{children}</FilterContext.Provider>
  )
}

export { FilterProvider }
export default FilterContext
