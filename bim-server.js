const Query = require('./query.min')
const { fReturn, iString } = require('bimn')
class BimServer extends Query{
    constructor (Modal) {
        this.loadModal(Modal)
    }
    bimRequest(request) {
        const req = request.get()
        const mret = fReturn(req, [
                'where', 'orwhere', 'like', 'orlike', 'with', 'between',
                'groupby', 'offset', 'limit', 'orderby'
            ])
        for (let key in mret) {
            this[key](mret)
        }

        if (iString(req.paginate)) {
            if (/^[0-9]+$/.test(req.paginate)) {
                this.modal.paginate(parseInt(req.paginate))
            } else if (/^[0-9]+\|[0-9]+$/.test(req.paginate)) {
                const m = req.paginate.match(/(^[0-9]+)\|([0-9]+)$/)
                let key = parseInt(m[1])
                let val = parseInt(m[2])
                this.modal.paginate(val, key)
            }
        } else if (iString(req.first) && req.first === 'true') this.modal.first()
        else this.modal.fetch()
    }
}

module.exports = BimServer