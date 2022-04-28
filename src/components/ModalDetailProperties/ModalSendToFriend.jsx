import React, { useState} from 'react'
import { connect } from 'react-redux';
import ModalPropertyMap from '../common/ModalPropertyMap';
const ModalSendToFriend = (
  {
    isOpen,
    closeModal,
    mediaElement,
    itemLt,
    itemLg,
    styleMapModal,
    styleMapModalShared,
    origin=1,
    imgProp,
    itemPrice="",
    itemBeds="",
    itemBaths="",
    itemSqft="",
    itemAddress="",
    itemName="",
    itemYear="",
    itemCity="",
    handleSubmitSendToFriend
    }) =>{
     const inicialState = {
        friend_email:'',
        friend_name:'',
        your_email:'',
        your_name:'',
        comments: 'Hi. Check out the property I found on'+' '+window.location.hostname+": "+itemAddress,
      }
      const [formSendToFriend, setformSendToFriend] = useState(inicialState);
      const handleChange = (e) =>{
        setformSendToFriend({
          ...formSendToFriend,
          [e.target.name]: e.target.value,
        })
      }
     
  return (
    <>
      <div 
      className={`ib-modal-master ${isOpen && 'ib-md-active'}`} id="modal_email_to_friend"
       >
        <div className="ib-mmcontent modal_cm">
          <div className="ib-mwrapper ib-mgeneric ms-wrapper-modal">
            <div className="ms-modal-header">
              <span className="ms-title">Email to a Friend</span>
              <p>Recomend this to a friend, just enter their email below.</p>
            </div>
            <div className="ms-modal-body">
              <form onSubmit={(e)=>{handleSubmitSendToFriend(e,formSendToFriend)}} className="ib-property-share-friend-f iboost-secured-recaptcha-form">
                <input type="hidden" name="mls_number" className="ib-property-share-mls-num" defaultValue="" />
                <div className="ms-flex">
                  <div className="ms-form-item">
                    <div className="ms-wrapper-img" id="mediaModal">
                    {mediaElement === 'ib-pva-photos' ? (
                      <div className="gs-wrapper-content">
                        <img className="ib-pvsitem" src={imgProp}/>
                        </div>
                    ) : (

                     
                      <ModalPropertyMap
                        lat={itemLt} 
                        lng={itemLg}
                        activeFullScreen={false}
                        activeStreetView={false}
                        activeControls={false}
                        gestureHandling="none"
                        />

                        
                    )}

                    </div>
                  </div>

                  <div className="ms-form-item">
                    <div className="ms-wrapper-details" id="msInfoPropertyModal">
                      {origin === 1 ? (
                        <>
                          <span className="ms-price-label"><span>{itemPrice}</span></span>
                          <span className="ms-bed-label"><span>{itemBeds}</span>&nbsp;Bed</span>
                          <span className="ms-bath-label"><span>{itemBaths}</span>&nbsp;Bath</span>
                          <span className="ms-sqft-label"><span>{itemSqft}</span> Sqft</span>
                          <span className="ms-address-label"><span>{itemAddress}</span></span>
                          </>
                      ):(
                        <>
                        <span className="ms-price-label"><span>{itemName}</span></span>
                        <span className="ms-bed-label">Bedrooms:&nbsp;<span>{itemBeds}</span></span>
                        <span className="ms-bed-label">Year Built:&nbsp;<span>{itemYear}</span></span>
                        <span className="ms-bed-label">Address:&nbsp;<span>{itemAddress}</span></span>
                        <span className="ms-bed-label">City:&nbsp;<span>{itemCity}</span></span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="ms-form-item">
                    <div className="ms-group-input">
                      <span className="ms-to">To</span>
                      <label className="ms-hidden" htmlFor="friend-email">Friend's email</label>
                      <input className="ib-meinput" id="friend-email" name="friend_email" placeholder="Friend's email*" type="email" defaultValue={formSendToFriend.friend_email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="ms-form-item">
                    <div className="ms-group-input">
                      <label className="ms-hidden" htmlFor="friend-name">Friend's name</label>
                      <input className="ib-meinput" id="friend-name" name="friend_name" placeholder="Friend's name*" type="text"  defaultValue={formSendToFriend.friend_name} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="ms-form-item">
                    <div className="ms-group-input">
                      <label htmlFor="ms-your-email" className="ms-hidden">Enter your email</label>
                      <input className="ib-meinput" id="your-email" name="your_email" placeholder="Your Email*" type="email"  defaultValue={formSendToFriend.your_email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="ms-form-item">
                    <div className="ms-group-input">
                      <label htmlFor="ms-your-name" className="ms-hidden">Enter your name</label>
                      <input className="ib-meinput" id="your-name" name="your_name" placeholder="Your Name*" type="text"  defaultValue={formSendToFriend.your_name} onChange={handleChange} required/>
                    </div>
                  </div>

                  <div className="ms-form-item -full">
                    <div className="ms-group-input">
                      <label htmlFor="friend-comments">Message</label>
                      <textarea className="ib-metextarea" id="friend-comments" name="comments" type="text" placeholder="Comments*" data-comment="Hi. Check out the property I found on" defaultValue={formSendToFriend.comments} onChange={handleChange}></textarea>
                    </div>
                  </div>

                  <div className="ms-wrapper-btn">
                    <button className="ms-btn ib-mgsubmit" aria-label="Submit" type="submit" >
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="ib-mmclose" onClick={closeModal}><span className="ib-mmctxt" >Close</span></div>
        </div>
        <div className="ib-mmbg"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ModalSendToFriend);

