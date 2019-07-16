const { isArray, iString, isNotUndef } = require('bimn')
class Query {
    where (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._where(subdata)
            }   
        }
        if (iString(arg)) this._where(arg)
    }
    orwhere (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._orWhere(subdata)
            }   
        }
        if (iString(arg)) this._orWhere(arg)
    }
    _where (arg) {
        if(iString(arg)) {

            // check if have 2 argument with string value
            if(/^[\w\d]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|([\w\d]+)$/)
                let key = m[1]
                let val = m[2]
                this.model.where(key, val)
            }
            // check if have 3 argument with string value
            if (/^[\w\d]+\|[\w\d]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|([\w\d]+)\|([\w\d]+)$/)
                const key = m[1]
                const val = m[2]
                const opt = m[3]
                if (isNotUndef(this.oprator[opt])) this.model.where(key, this.oprator[opt], val)
            }
            // check if have 2 argument with number value
            if (/^[\w\d]+\|\![0-9]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|\!([0-9]+)$/)
                let key = m[1]
                let val = parseInt(m[2])
                this.model.where(key, val)
            }
            // check if have 3 argument with number value
            if (/^[\w\d]+\|\![0-9]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|\!([0-9]+)\|([\w\d]+)$/)
                const key = m[1]
                const val = parseInt(m[2])
                const opt = m[3]
                if (isNotUndef(this.oprator[opt])) this.model.where(key, this.oprator[opt], val)
            }

        }
    }

    _orWhere (arg) {
        if(iString(arg)) {
            // check if have 2 argument with string value
            if(/^[\w\d]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|([\w\d]+)$/)
                let key = m[1]
                let val = m[2]
                this.model.orWhere(key, val)
            }
            // check if have 3 argument with string value
            if (/^[\w\d]+\|[\w\d]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|([\w\d]+)\|([\w\d]+)$/)
                const key = m[1]
                const val = m[2]
                const opt = m[3]
                if (isNotUndef(this.oprator[opt])) this.model.orWhere(key, this.oprator[opt], val)
            }
            // check if have 2 argument with number value
            if (/^[\w\d]+\|\![0-9]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|\!([0-9]+)$/)
                let key = m[1]
                let val = parseInt(m[2])
                this.model.orWhere(key, val)
            }
            // check if have 3 argument with number value
            if (/^[\w\d]+\|\![0-9]+\|[\w\d]+$/.test(arg)) {
                const m = arg.match(/(^[\w\d]+)\|\!([0-9]+)\|([\w\d]+)$/)
                const key = m[1]
                const val = parseInt(m[2])
                const opt = m[3]
                if (isNotUndef(this.oprator[opt])) this.model.orWhere(key, this.oprator[opt], val)
            }

        }
    }
    _between (arg) {
        if(/^[\w\d]+\|[0-9]+\-[0-9]+$/.test(arg)) {
            const m = arg.match(/(^[\w\d]+)\|([0-9]+)\-([0-9]+)$/)
            let key = m[1]
            let val = parseInt(m[2])
            let end = parseInt(m[3])
            this.model.whereBetween(key, [val, end])
        }
    }

    _whereLike (arg) {
        // check if have 3 argument with string value
        if (/^[\w\d]+\|[\w\d\,_]+\|[\w\d]+$/.test(arg)) {
            const m = arg.match(/(^[\w\d]+)\|([\w\d\,_]+)\|([\w\d]+)$/)
            let key = m[1]
            let val = m[2]
            let opt = m[3]
            if (isNotUndef(opt)) this.model.whereRaw(key + ' LIKE ?', [ this._likeGen(opt, val) ])
        }
    }

    _likeGen (arg, val) {
        var result = val
        const split = function (data) {
            if (/^[\w\d]+\,[\w\d]+$/) {
                return data.split(',')
            }
            return data
        }
        switch(arg) {
            case 'start_with':
                result = val + '%'
                break
            case 'end_with':
                result = '%' + val
                break
            case 'any_position':
                result = '%' + val + '%'
                break
            case 'start_with_end':
                const nval = split(val)
                result = isArray(nval) ? nval[0] + '%' + nval[0] : nval
                break
            default:
                result = val
        }
        return result
    }

    wherelike (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._whereLike(subdata)
            }   
        }
        if (iString(arg)) this._whereLike(arg)
    }

    between (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._between(subdata)
            }   
        }
        if (iString(arg)) this._between(arg)
    }

    groupby (arg) {
        this.model.groupBy(arg)
    }

    offset (arg) {
        this.model.offset(parseInt(arg))
    }

    limit (arg) {
        this.model.limit(parseInt(arg))
    }

    _orderBy (arg) {
        if(/^[\w\d]+\|asc$|^[\w\d]+\|desc$/.test(obj.orderby)) {
            const m = obj.orderby.match(/(^[\w\d]+)\|([\w\d]+)$/)
            const key = m[1]
            const val = m[2]
            this.model.orderBy(key, val)
        }
    }
    orderby (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._orderBy(subdata)
            }   
        }
        if (iString(arg)) this._orderBy(arg)
    }
    
    _with (arg) {
        this.model.with(arg)
    }
    with (arg) {
        if (isArray(arg)) {
            const l = arg.length
            for (let i = 0; i < l; i++) {
                let subdata = arg[i]
                this._with(subdata)
            }
        }
        if (iString(arg)) this._with(arg)
    }
}

module.exports = Query