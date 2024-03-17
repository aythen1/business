const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/err/errors')

const fs = require('fs').promises
const path = require('path')

const ID = 'test/test'



const fetchsDep = async (req, res) => {

    const { user } = req
    const { type, query } = req.body

    // console.log('===', query)

    let results
    if (type == 'npm') {
        results = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}`)
            .then(response => response.json());
        return res.status(200).send(results.objects)
    } else {
        results = await fetch(`https://pypi.org/pypi/${query}/json`)
        results = await results.json();

        return res.send({
            type: 'pip',
            data: results.info
        })

        // results = await results.json();

        // .then(response => response.json());
    }


    console.log('results', results)


    return res.status(200).send(results)
    // return data
}

const installDep = (req, res) => {

}

const unInstallDep = (req, res) => {

}







module.exports = {
    fetchsDep: catchedAsync(fetchsDep),
    installDep: catchedAsync(installDep),
    unInstallDep: catchedAsync(unInstallDep),
}