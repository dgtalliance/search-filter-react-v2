
const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    constructor() {
      super()
      this.latlng = args.latlng
      this.html = args.html
      this.classDiv = args.classDiv
      this.setMap(args.map)
    }

    createDiv() {
      this.div = document.createElement('div')
      this.div.style.position = 'absolute'
      this.div.style.border = '4px'
      this.div.style.paddingLeft = '0px'
      this.div.style.cursor = 'pointer'
      var span = document.createElement('span')
      span.style.position = 'absolute'
      span.className = this.classDiv
      span.appendChild(document.createTextNode(this.html))
      this.div.appendChild(span)

      google.maps.event.addDomListener(this.div, 'click', (event) => {
        event.preventDefault()
        google.maps.event.trigger(this, 'click')
      })
    }

    appendDivToOverlay() {
      const panes = this.getPanes()
      panes.overlayImage.appendChild(this.div)
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng)
      let offset = 0
      if (point) {
        this.div.style.left = `${point.x - offset}px`
        this.div.style.top = `${point.y - offset}px`
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv()
        this.appendDivToOverlay()
      }
      this.positionDiv()
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div)
        this.div = null
      }
    }

    getPosition() {
      return this.latlng
    }

    getDraggable() {
      return false
    }
  }

  return new HTMLMapMarker()
}

export default createHTMLMapMarker
