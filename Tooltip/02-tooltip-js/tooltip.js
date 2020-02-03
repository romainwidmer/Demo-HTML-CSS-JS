class Tooltip {

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.element = element
        this.title = element.getAttribute('title')
        this.tooltip = null
        this.element.addEventListener('mouseover', this.mouseOver.bind(this))
        this.element.addEventListener('mouseout', this.mouseOut.bind(this))
    }

    /**
     *  Applique le système d'infos sur les éléments
     *  @param {string} selector
     */
    static bind(selector) {
        document.querySelectorAll(selector).forEach(element => new Tooltip(element))
    }


    mouseOver() {
        let tooltip = this.createTooltip()
        let width = this.tooltip.offsetWidth
        let height = this.tooltip.offsetHeight
        let left = this.element.offsetWidth / 2 - width / 2 + this.element.getBoundingClientRect().left
        let top = this.element.getBoundingClientRect().top - height - 15
        tooltip.style.left = left + 'px'
        tooltip.style.top = top + 'px'
        tooltip.classList.add('visible')
    }

    mouseOut() {
        if (this.tooltip !== null) {
            this.tooltip.classList.remove('active')
            document.body.removeChild(this.tooltip)
            this.tooltip = null
        }
    }

    /**
     *  Crée et inject la bullt d'info dans l'HTML
     *  returns {HTMLElement}
     */
    createTooltip() {
        if (this.tooltip === null) {
            let tooltip = document.createElement('div')
            tooltip.innerHTML = this.title
            tooltip.classList.add('tips')
            document.body.appendChild(tooltip)
            this.tooltip = tooltip
        }
        return this.tooltip
    }
}

Tooltip.bind('a[title]')