import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react'
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '../../config/config'
import axios from 'axios'
import validator from 'validator'
import FilterContext from '../../Contexts/FilterContext'

const RentalFormContact = ({
  address_large,
  address_short,
  mls_num,
  key_val,
  owner,
  lead = {},
}) => {
  useEffect(() => {
    window.location.host === 'localhost:3000'
      ? setRecaptcha('6LfEzb4eAAAAAFDj82cxqSMHBcf65OEe7ezaftNm')
      : setRecaptcha(window.__flex_g_settings.google_recaptcha_public_key)
  }, [])

  const { defSuccess, isOpenModalAlert } = useContext(FilterContext)

  //shared with you parent

  const [leadFirstName, setLeadFirstName] = useState(
    Cookies.get('_ib_user_firstname') !== undefined
      ? Cookies.get('_ib_user_firstname')
      : '',
  )
  const [leadLastName, setLeadLastName] = useState(
    Cookies.get('_ib_user_lastname') !== undefined
      ? Cookies.get('_ib_user_lastname')
      : '',
  )
  const [leadEmailAddress, setLeadEmailAddress] = useState(
    Cookies.get('_ib_user_email') !== undefined
      ? Cookies.get('_ib_user_email')
      : '',
  )
  const [leadPhoneNumber, setLeadPhoneNumber] = useState(
    Cookies.get('_ib_user_phone') !== undefined
      ? Cookies.get('_ib_user_phone')
      : '',
  )
  const [leadComment, setLeadComment] = useState(
    'I am interested in ' + address_short + ' ' + address_large,
  )
  const [recaptcha, setRecaptcha] = useState(null)
  const [token, setToken] = useState(null)
  const [useToken, setUseToken] = useState(false)

  const handleVerify = useCallback(
    (token) => {
      setToken(token)
    },
    [useToken],
  )

  const reffirstName = useRef()
  const reflastName = useRef()
  const refemail = useRef()
  const refphone = useRef()

  const [firstName, setFirstName] = useState(false)
  const [lastName, setLastName] = useState(false)
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false)
  const [disable, setDisable] = useState(false)

  const blurFirstName = (e) => {
    if (!e.target.value.trim() || validator.isEmpty(e.target.value)) {
      setFirstName(true)
      reffirstName.current.focus()
    } else {
      setFirstName(false)
    }
  }

  const blurLastName = (e) => {
    if (!e.target.value.trim() || validator.isEmpty(e.target.value)) {
      setLastName(true)
      reflastName.current.focus()
    } else {
      setLastName(false)
    }
  }

  const blurEmailAddress = (e) => {
    if (!validator.isEmail(e.target.value)) {
      setEmail(true)
      refemail.current.focus()
    } else {
      setEmail(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    var chech_in = '',
      check_out = ''
    if (lead.stay) {
      var date_stay = lead.stay.split('-')
      chech_in = date_stay[0]
      check_out = date_stay[1]
    }

    var permalink = window.location.origin + lead.slug

    var message = `Sleeps: ${lead.occupancy_limit}. `
    if (chech_in && check_out) {
      message += ` Rentals Stay: ${chech_in} - ${check_out}. `
    }

    var form_data = {
      first_name: leadFirstName,
      last_name: leadLastName,
      email_address: leadEmailAddress,
      phone_number: leadPhoneNumber,
      comments: message + ' ' + leadComment,
      mls_num: mls_num,
      price_rate: lead.rate,
      permalink: encodeURIComponent(permalink),
    }

    var is_vacation_rentals = 1
    var ib_tags = 'Vacation Rentals'
    var recaptcha_response = token
    var lead_credentials =
      Cookies.get('ib_lead_token') !== undefined
        ? Cookies.get('ib_lead_token')
        : ''

    form_data = JSON.stringify(form_data)

    if (
      leadFirstName.trim() &&
      leadLastName.trim() &&
      !validator.isEmpty(leadFirstName) &&
      !validator.isEmpty(leadLastName) &&
      validator.isEmail(leadEmailAddress)
    ) {
       fetchData(
        form_data,
        ib_tags,
        is_vacation_rentals,
        recaptcha_response,
        lead_credentials,
      ) 
    } else {
      return
    }
  }
  async function fetchData(
    form_data,
    ib_tags,
    is_vacation_rentals,
    recaptcha_response,
    lead_credentials,
  ) {
    try {
      setDisable(true)
      const API_SEARCH_URL =
        window.location.host === 'localhost:3000'
          ? 'https://api.idxboost.dev/tracking/property_inquiries'
          : `${window.__flex_g_settings.domain_service}/tracking/property_inquiries`
      const body = `access_token=${ACCESS_TOKEN}&ib_tags=${ib_tags}&is_vacation_rentals=${is_vacation_rentals}&recaptcha_response=${recaptcha_response}&lead_credentials=${lead_credentials}&data=${form_data}`
      const response = await axios.post(API_SEARCH_URL, body)
      if (response.data.success) {
        isOpenModalAlert(true)
        defSuccess(true)
        setUseToken(!useToken)
        setDisable(false)
      } else {
        isOpenModalAlert(true)
        defSuccess(false)
        setUseToken(!useToken)
        setDisable(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {recaptcha && (
        <GoogleReCaptchaProvider reCaptchaKey={recaptcha}>
          <GoogleReCaptcha onVerify={handleVerify} />
        </GoogleReCaptchaProvider>
      )}
      <div className="ib-modal-form">
        <div className="ib-modal-dialog">
          <div className="ib-modal-content">
            <div className="ib-modal-header">
              {owner !== undefined && (
                <div className="ib-avatar-detail">
                  <img src={owner.photo} />
                  <div className="ib-avatar-info">
                    <span className="ib-title">
                      {owner.first_name !== undefined ? owner.first_name : ''}{' '}
                      {owner.last_name !== undefined ? owner.last_name : ''}
                    </span>
                    {owner.phone_number !== undefined && (
                      <a
                        href={`tel:${owner.phone_number}`}
                        className="ib-phone"
                      >
                        Ph. {owner.phone_number}
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button aria-label="Close" className="ib-close"></button>
            </div>
            <div className="ib-modal-body">
              {/* <div className="ib-info-property">
                <div className="ib-item -price">
                  <span className="ib-label">Rate</span>
                  <span className="ib-price">{lead.rate}</span>
                </div>

                <div className="ib-item">
                  <span className="ib-label">Bed(s)</span>
                  <i className="modal-detail-icon-beds"></i>
                  <span className="ib-text">{lead.bed}</span>
                </div>

                <div className="ib-item">
                  <span className="ib-label">Bath(s)</span>
                  <i className="modal-detail-icon-baths"></i>
                  <span className="ib-text">{lead.bath}</span>
                </div>

                <div className="ib-item">
                  <span className="ib-label">Sleep(s)</span>
                  <i className="modal-detail-icon-sleeps"></i>
                  <span className="ib-text">{lead.occupancy_limit}</span>
                </div>

                <div className="ib-item -key">
                  <span className="ib-label">Key</span>
                  <i className="modal-detail-icon-key"></i>
                  <span className="ib-text">{key_val}</span>
                </div>

                <div className="ib-item -rental">
                  <span className="ib-label">Rental Stay</span>
                  <span className="ib-text">
                    {lead.stay ? dateViewRental(lead.stay) : 'N/A'}
                  </span>
                </div>
              </div> */}

              <div className="ib-form">
                <form action="" onSubmit={handleSubmit} id="propertyForm">
                  <div className="ib-input">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      ref={reffirstName}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name*"
                      value={leadFirstName}
                      onChange={(e) => setLeadFirstName(e.target.value)}
                      onBlur={(e) => blurFirstName(e)}
                      onPaste={() => {
                        return false
                      }}
                      onDrop={() => {
                        return false
                      }}
                      autoComplete="off"
                      required
                    />
                    {firstName && (
                      <label
                        htmlFor="firstName"
                        generated="true"
                        className="error"
                      >
                        Please Enter Your First Name
                      </label>
                    )}
                  </div>
                  <div className="ib-input">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      ref={reflastName}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name*"
                      value={leadLastName}
                      onChange={(e) => setLeadLastName(e.target.value)}
                      onBlur={(e) => blurLastName(e)}
                      onPaste={() => {
                        return false
                      }}
                      onDrop={() => {
                        return false
                      }}
                      autoComplete="off"
                      required
                    />
                    {lastName && (
                      <label
                        htmlFor="lastName"
                        generated="true"
                        className="error"
                      >
                        Please Enter Your Last Name
                      </label>
                    )}
                  </div>
                  <div className="ib-input">
                    <label htmlFor="email">Email</label>
                    <input
                      ref={refemail}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email*"
                      value={leadEmailAddress}
                      onChange={(e) => setLeadEmailAddress(e.target.value)}
                      onBlur={(e) => blurEmailAddress(e)}
                      onPaste={() => {
                        return false
                      }}
                      onDrop={() => {
                        return false
                      }}
                      autoComplete="off"
                      required
                    />
                    {email && (
                      <label htmlFor="email" generated="true" className="error">
                        Please Enter a Valid Email Address
                      </label>
                    )}
                  </div>
                  <div className="ib-input">
                    <label htmlFor="phone">Phone</label>
                    <input
                      ref={refphone}
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Phone*"
                      value={leadPhoneNumber}
                      onChange={(e) => setLeadPhoneNumber(e.target.value)}                      
                      onPaste={() => {
                        return false
                      }}
                      onDrop={() => {
                        return false
                      }}
                      autoComplete="off"                      
                    />
                    {phone && (
                      <label htmlFor="phone" generated="true" className="error">
                        Please Enter a Valid Phone Number
                      </label>
                    )}
                  </div>
                  <div className="ib-input">
                    <label htmlFor="Comment">Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      value={leadComment}
                      onChange={(e) => setLeadComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="ib-button-form">
                    <button className="ib-btn" disabled={disable}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RentalFormContact
