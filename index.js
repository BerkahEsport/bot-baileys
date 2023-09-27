
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import { platform } from "os"
import { watchFile, unwatchFile } from "fs"
import express from 'express'
import fetch from 'node-fetch'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 8080
// let __path = process.cwd()
var app = express(); 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})
app.listen(PORT, () => {
        console.log('App listened on port', PORT)
        keepAlive()
    })


function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        fetch(url).catch(console.error)
    }, 5 * 1000 * 60)
}

var isRunning = false
function start(file) {
   if (isRunning) return
   isRunning = true
   console.log("Starting . . .")
   let args = [path.join(__dirname, file), ...process.argv.slice(2)]
   let p = spawn(process.argv[0], args, { stdio: ["inherit", "inherit", "inherit", "ipc"] })
   .on("message", (data) => {
      console.log("[RECEIVED]", data)
      switch (data) {
         case "reset":
            platform() === "win32" ? p.kill("SIGINT") : p.kill()
            isRunning = false
            start.apply(this, arguments)
            break
         case "uptime":
            p.send(process.uptime())
            break
      }
   })
   .on("exit", (code) => {
      isRunning = false
      console.error("Exited with code:", code)
      if (code === 0) return
      watchFile(args[0], () => {
         unwatchFile(args[0])
         start(file)
      })
   })
}
start("conn.js")