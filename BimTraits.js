const bimServer = require('adonis-bim-server')

class BimTraits {
    register (Model, parent) {
        Model.queryMacro('bimRequest', function (req) {
            return new bimServer(this).bimRequest(req)
        })
    }
}

module.exports = BimTraits