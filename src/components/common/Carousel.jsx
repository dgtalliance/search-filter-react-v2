import { memo, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { isMobile, browserName } from "react-device-detect"

const Carousel = ({
  itemsSlider,
  images,
  address,
  isOpenModal,
  setIsOpenCarusel,
  swipe,
}) => {
  const [isArray, setIsArray] = useState(images.length > 0)
  const [imgIndex, setImgIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(isOpenModal)

  const settings = {
    dots: false,
    lazyLoad: 'ondemand',
    infinite: true,
    swipe: swipe,
    slidesToShow: itemsSlider ? (images.length > 3 ? 3 : images.length) : 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          swipe: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          swipe: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const handleError = (e) => {
    e.target.src = 'https://www.idxboost.com/i/default_thumbnail.jpg'
    setIsArray(false)
  }

  const handleCloseModal = (e) => {
    setIsOpenCarusel(false)
    setIsOpen(false)
    setImgIndex(0)
  }
  const handleClickImage = (e, index) => {
    e.preventDefault()
    setImgIndex(index)
    if (!isMobile) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <Slider {...settings}>
        {isArray ? (
          images.map((image, index) => (
            <img
              key={`${address}-${index}`}
              className="property-image ib-pifimg"
              alt={address}
              onError={handleError}
              src={image}
              onClick={(e) => handleClickImage(e, index)}
            />
          ))
        ) : (
          <img
            key={`${address}-${0}`}
            className="property-image ib-pifimg"
            alt={address}
            src="https://www.idxboost.com/i/default_thumbnail.jpg"
          />
        )}
      </Slider>
      {isOpen && (
        <Lightbox
          mainSrc={images[imgIndex]}
          imageCaption={` ${imgIndex + 1} of ${images.length}`}
          imageTitle={address}
          enableZoom={false}
          discourageDownloads={false}
          nextSrc={images[(imgIndex + 1) % images.length]}
          prevSrc={images[(imgIndex + images.length - 1) % images.length]}
          onCloseRequest={handleCloseModal}
          onMovePrevRequest={() =>
            setImgIndex((imgIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
        />
      )}
    </>
  )
}

export default memo(Carousel)
