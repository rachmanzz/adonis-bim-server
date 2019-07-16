const Query = require('./query.min')
const { fReturn, iString } = require('bimn')
class BimServer extends Query{
    constructor (Modal) {
        super()
        this.loadModal(Modal)
    }
    bimRequest(request) {
        const req = request.get()
        const mret = fReturn(req, [
                'where', 'orwhere', 'wherelike', 'with', 'between',
                'groupby', 'offset', 'limit', 'orderby'
            ])
        for (let key in mret) {
            if (key === 'where') this.where(mret[key])
            if (key === 'orwhere') this.orwhere(mret[key])
            if (key === 'wherelike') this.wherelike(mret[key])
            if (key === 'with') this.with(mret[key])
            if (key === 'between') this.between(mret[key])
            if (key === 'groupby') this.groupby(mret[key])
            if (key === 'offset') this.offset(mret[key])
            if (key === 'limit') this.limit(mret[key])
            if (key === 'orderby') this.orderby(mret[key])
        }

        // if (iString(req.paginate)) {
        //     if (/^[0-9]+$/.test(req.paginate)) {
        //         this.modal.paginate(parseInt(req.paginate))
        //     } else if (/^[0-9]+\|[0-9]+$/.test(req.paginate)) {
        //         const m = req.paginate.match(/(^[0-9]+)\|([0-9]+)$/)
        //         let key = parseInt(m[1])
        //         let val = parseInt(m[2])
        //         this.modal.paginate(val, key)
        //     }
        // } else if (iString(req.first) && req.first === 'true') this.modal.first()
        // else this.modal.fetch()
    }
}

module.exports = BimServer