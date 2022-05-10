import React from 'react'

export default function CheckboxGroup({
  dataValue,
  labelTitle,
  identificator,
  defaultValue,
  changeClick
}) {
  function setChecked(v) {
    return defaultValue.find((f) => f.toString() === v.toString())
  }

  function List_elements_html(props) {
    const value = props.value.value
    const label = props.value.label

    return (
      <div className="ib-chk-wrapper">
        <input
          type="checkbox"
          id={`${value}`}
          name="amenities"
          checked={setChecked(value)}
          onChange={(e) => changeClick(e)}
          value={`${value}`}
        />
        <label htmlFor={`${value}`}>{label}</label>
      </div>
    )
  }

  function ListOptionsElements() {
    const listOptions = dataValue.map((opt, index) => (
      <List_elements_html key={`item-${index}`} value={opt || ''} />
    ))

    return listOptions
  }

  return (
    <>
      <div className={'ib-wrapper'}>
        <div className={'ib-flex-wrapper'}>
          <div className={`${identificator}`}>
            <ListOptionsElements />
          </div>
        </div>
      </div>
    </>
  )
}
