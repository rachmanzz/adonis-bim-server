const Query = require('./query.min')
const { fReturn, iString } = require('bimn')
class BimServer extends Query{
    constructor (Model) {
        super()
        this.loadModel(Model)
        this.oprator = { sq: '<=', s: '<', bq: '>=', b: '>', n: '!=' }
    }
    bimRequest(request) {
        const req = request.get()
        this._req = fReturn(req, [ 'paginate', 'first' ])
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
        return this
    }

    finally () {
        const req = this._req
        if (iString(req.paginate)) {
            if (/^[0-9]+$/.test(req.paginate)) {
                return this.model.paginate(parseInt(req.paginate))
            } else if (/^[0-9]+\|[0-9]+$/.test(req.paginate)) {
                const m = req.paginate.match(/(^[0-9]+)\|([0-9]+)$/)
                let key = parseInt(m[1])
                let val = parseInt(m[2])
                return this.model.paginate(val, key)
            }
        } else if (iString(req.first) && req.first === 'true') return this.model.first()
        else return this.model.fetch()
    }
}

module.exports = BimServer