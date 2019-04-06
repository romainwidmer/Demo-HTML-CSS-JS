class Carousel {

    /**
     *
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slideToScroll nombre d'element a faire defiler
     * @param {Object} options.slideVisible nombre d'element visible dans un slide
     * @param {boolean} options.loop doit on boucler en fin de carousel
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1,
            loop: false
        }, options)

        this.currentItem = 0
        this.moveCallbacks = []
        this.isMobile = false

        let children = [].slice.call(element.children)
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')

        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })

        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(cb => cb(0))

        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    /**
     *
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /**
     * Applique les bonnes dimensions aux elements du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.slideVisible
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = (100 / this.slideVisible) / ratio + "%")
    }


    /**
     *
     */
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))

        if(this.options.loop === true) {
            return
        }

        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev__hidden')
            } else {
                prevButton.classList.remove('carousel__prev__hidden')
            }
            if(this.items[this.currentItem + this.slideVisible] === undefined) {
                nextButton.classList.add('carousel__next__hidden')
            } else {
                nextButton.classList.remove('carousel__next__hidden')
            }
        })
    }

    /**
     *
     */
    next() {
        this.gotoItem(this.currentItem + this.slideToScroll)
    }

    /**
     *
     */
    prev() {
        this.gotoItem(this.currentItem - this.slideToScroll)
    }

    /**
     * Deplace le carousel vers l'element ciblé
     * @param {number} index
     */
    gotoItem(index) {
        if(index < 0) {
            index = this.items.length - this.options.slideVisible
        } else if(index >= this.items.length || (this.items[this.currentItem + this.options.slideVisible]  === undefined && index > this.currentItem) ) {
            index = 0
        }

        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index

        this.moveCallbacks.forEach(cb => cb(index))
    }


    onMove(cb) {
        this.moveCallbacks.push(cb)
    }


    onWindowResize() {
        let mobile = window.innerWidth < 800

        if(mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
     *
     * @returns {number}
     */
    get slideToScroll() {
        return this.isMobile ? 1 : this.options.slideToScroll
    }

    /**
     *
     * @returns {number}
     */
    get slideVisible() {
        return this.isMobile ? 1 : this.options.slideVisible
    }
}



new Carousel(document.querySelector('#carousel1'), {
    slideVisible: 3,
    loop: false
})


new Carousel(document.querySelector('#carousel2'), {
    slideVisible: 2,
    slideToScroll: 2,
    loop: true
})

new Carousel(document.querySelector('#carousel3'), {
    slideVisible: 1
})