import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import 'antd/dist/antd.css'
import { Input, AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  city,
  getautocompleteData,
  updateClean,
} from '../../config/slices/propertiesAutoComplete'
import { ib_fetch_default_cities } from '../../utils/utils'
import { getmapObj, getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { fetchAsyncAutoComplete } from '../../config/actions/propertiesAutoComplete'
import FilterContext from '../../Contexts/FilterContext'

const Complete = () => {
  const dispatch = useDispatch()
  const autocompleteData = useSelector(getautocompleteData)
  const params = useSelector(getparams)
  const getmapobj = useSelector(getmapObj)
  const cities = ib_fetch_default_cities(city)
  const { setAutoMapSearch } = useContext(FilterContext)
  const [keyword, setKeyword] = useState('')
  const [ib_autocomplete_cities, setIbAutoCompleteCities] = useState(cities)

  useEffect(() => {
    setIbAutoCompleteCities(autocompleteData)
  }, [autocompleteData])

  useEffect(() => {
    if (params.filter_search_keyword_label !== '') {
      setKeyword(params.filter_search_keyword_label)
    }else{
      setKeyword('')
    }
  }, [params])

  const setAutocompleteTerm = (term, type) => {
    var param = {
      filter_search_keyword_label: term,
      filter_search_keyword_type: null === type ? '' : type,
      polygon_search: '',
      rect: '',
      zm: '',
      page: '1',
    }
    dispatch(updateForm(param))
    dispatch(fetchAsyncSearch())
  }

  const handleKeyUpAutocompleteEvent = (val) => {
    var inputValue = val
    setKeyword(inputValue)
    if ('' !== inputValue) {
      dispatch(fetchAsyncAutoComplete(inputValue))
    } else {
      dispatch(updateClean(cities))
    }
  }
  const handleSelectAutocomplete = (value) => {
    var tempterm = JSON.parse(value)
    setKeyword(tempterm.label)
    setAutocompleteTerm(tempterm.label, tempterm.type)
    setAutoMapSearch(true)
  }
  const handleClearAutocompleteEvent = () => {
    setKeyword('')
   
    var param = {
      filter_search_keyword_label: '',
      filter_search_keyword_type: '',
      polygon_search: '',
      rect: getmapobj.rect,
      zm: getmapobj.zm,
      page: '1',
    }
    dispatch(updateForm(param))
    dispatch(updateClean(cities))
    dispatch(fetchAsyncSearch())

    // active pan in map
    setAutoMapSearch(false)
  }
  const handleSubmitAutocompleteForm = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
    var inputValue = e.target.value

    if ('' !== inputValue) {
      // Cerrar autocomplete
      if (/^\d+$/.test(inputValue) && 5 === inputValue.length) {
        setAutocompleteTerm(inputValue, 'zip')
      } else {
        var matchCity

        for (var i = 0, l = ib_autocomplete_cities.length; i < l; i++) {
          var term = ib_autocomplete_cities[i]
          var match = new RegExp('^' + term.label + '$', 'i')

          if (false !== match.test(inputValue)) {
            matchCity = term
            break
          }
        }

        if ('undefined' !== typeof matchCity) {
          setAutocompleteTerm(matchCity.label, 'city')
        } else {
          setAutocompleteTerm(inputValue, null)
        }
      }
    }
    setAutoMapSearch(true)
  }

  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const renderLabel = (item) => {
    let label = item.label
    let searchString = keyword //match

    if (searchString) {
      let index = label.toLowerCase().indexOf(searchString.toLowerCase())
      if (index !== -1) {
        let length = searchString.length

        let prefix = label.substring(0, index)
        let suffix = label.substring(index + length)
        let match = label.substring(index, index + length)

        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              {prefix}
              <span className="searchString">{match}</span>
              {suffix}
            </span>
            <span>
              <strong>{capitalizarPrimeraLetra(item.type)}</strong>
            </span>
          </div>
        )
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{label}</span>
        <span>
          <strong>{capitalizarPrimeraLetra(item.type)}</strong>
        </span>
      </div>
    )
  }

  const fillOptions = (options) => {
    var data = []
    options.map((item, index) => {
      data.push({
        label: renderLabel({ label: item.label, type: item.type }),
        value: JSON.stringify({ label: item.label, type: item.type }),
        keyi: index,
      })
    })
    return data
  }

  return (
    <AutoComplete
      allowClear
      onSearch={handleKeyUpAutocompleteEvent}
      onSelect={handleSelectAutocomplete}
      onClear={handleClearAutocompleteEvent}
      value={keyword}
      dropdownClassName="certain-category-search-dropdown"
      options={fillOptions(ib_autocomplete_cities)}
    >
      <Input
        value={keyword}
        size="large"
        placeholder="Enter Address,City Or Key Number Search"
        onKeyPress={(e) => {
          setKeyword(e.target.value)
        }}
        onPressEnter={handleSubmitAutocompleteForm}
      />
    </AutoComplete>
  )
}
export default memo(Complete)
