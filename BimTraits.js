const bimServer = require('adonis-bim-server')

class BimTraits {
    register (Model, parent) {
        Model.queryMacro('bimRequest', function (req) {
            return new bimServer(this).bimRequest(req).finally()
        })
    }
}

module.exports = BimTraits