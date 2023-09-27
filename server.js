import express from 'express'
import { createServer } from 'http'
import fetch from 'node-fetch'
import chalk from 'chalk'
const PORT = process.env.PORT || 8080 || 5000 || 3000
function connect() {
    let server = createServer(express())
    let __path = process.cwd()
    var router = express.Router(); 
router.get('/', (req, res) => {
    res.sendFile(__path + '/home.html')
})

    server.listen(PORT, () => {
        console.log('App listened on port', PORT)
        keepAlive()
    })
}


function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        fetch(url).catch(console.error)
    }, 5 * 1000 * 60)
}


export default connect