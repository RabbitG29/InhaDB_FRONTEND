/* eslint-disable */
import Noty from 'noty'

const options = {
    layout: 'topRight',
    theme: 'light',
    timeout: 3000,
}

export default {
    install: (Vue, opts) => {
        Vue.prototype.$notice = function (data) {
            return new Noty(Object.assign(options, opts, data)).show()
        }
    }
}
