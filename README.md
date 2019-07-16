# adonis-bim-server
## Adonis Model Traits
- more efficient
- write less code
- with 1 endpoint, do more action

## Installation
- with yarn: `yarn add adonis-bim-server`
- with npm: `npm i --save adonis-bim-server`

### Clone BimTraits
- `cp ./node_modules/adonis-bim-server/BimTraits.js  ./app/Models/Traits/`

## Model Configuration

        class MyModel extends Model {
            static boot () {
                super.boot()
                this.addTrait('BimTraits')
            }
        }

## Usage
This module may just work fine for API endpoint.

    class MyActionController {
        async doingSomething ({request, response}) {
            const model = await MyModel.query().bimRequest(request)
            return response.json({ success: true, data: model })
        }
    }

## What you can do
- filter (where, wherelike, limit, and other)
- fetch, paginate, and request first colomn

All off that you can do in front-end, and request just what you need

## Front-end Module
- https://github.com/rachmanzz/bim-query