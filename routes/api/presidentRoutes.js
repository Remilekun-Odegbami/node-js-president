const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/presidents/presidents')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All presidents
// localhost:3000/presidents/ 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/presidents/presidents'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/presidents', {
                title: 'All Presidents',
                name: 'President List',
                data
            })
        })
})

// single-President 
// localhost:3000/presidents/:id 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/presidents/presidents/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-president', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// localhost:3000/presidents/name
router.get('/presidents/:name', (req, res)=> {
    const name = req.params.name 
    const URL = 'https://api.sampleapis.com/presidents/presidents'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.name.length; i++) {
                if (Presidents == data.name[i]) {
                    res.render('pages/presidents', {
                        title: name,
                        name: name,
                        data
                    })
                }
            }
        })

})

module.exports = router