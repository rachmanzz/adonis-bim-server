const bimServer = require('adonis-bim-server')

class BimTraits {
    register (Model, options) {
        Model.queryMacro('bimRequest', function (req) {
            new bimServer(this).bimRequest(req)
            return this
        })
    }
}

module.exports = BimTraits