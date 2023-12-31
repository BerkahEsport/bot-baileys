import config from "../config.js";
import Func from "../lib/function.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import axios from "axios";
import { getBinaryNodeChildren } from "@whiskeysockets/baileys";
import cp, { exec } from "child_process";
import { format } from "util";
import { promisify } from "util";
import cron from "node-cron"
import didyoumean from "didyoumean";
import { cpus as _cpus, totalmem, freemem } from "os";
import os from "os";
import { performance } from "perf_hooks";
import { sizeFormatter } from "human-readable";
import upload from "../lib/upload.js";
export default async function Message(conn, m, message) {
    try {
        if (!m) return
        if (!config.options.public && !m.isOwner) return
        if (m.from && db.groups[m.from]?.mute && !m.isOwner) return
        if (m.isBot) return

        (await import("../lib/loadDatabase.js")).default(m)

        const prefix = m.prefix
        const isCmd = m.body.startsWith(prefix)
        const command = isCmd ? m.command.toLowerCase() : ""
        const quoted = m.hasQuotedMsg ? m.quoted : m
        const allMenuItems = [].concat(...Object.values(config.menu));
        //  <----- Fungsi Limit Reset ----->
        cron.schedule("0 6 * * *", async () => {
          global.db.users[m.sender].limit = 15
        });

      let sender = global.db.users[m.sender]
      if (sender.simi && !sender.banned ) {
        async function simtalk(text) {
            const params = new URLSearchParams();
            params.append("text", text);
            params.append("lc", "id");
            const { data } = await axios({
              method: "POST",
              url: "https://api.simsimi.vn/v2/simtalk",
              data: params,
            });
            return data;
          }
          setTimeout(() => {
            if (sender.simi == true) m.reply("Waktu auto Simi telah berakhir! >_<");
              sender.simi = false
              }, (10 * 60000));
          if (!m.text) return
          try {
              let api = await simtalk(m.text);
              m.reply(`${api.message} \n\n_Ketik *out* untuk mematikan fitur auto simi!_`);
            } catch(e) {
              console.log(e)
              m.reply("Simi tidak mengerti, coba tanyakan yang lainya. 🙁")
            }
      }
      if (/out|Out/i.test(m.text)) {
        sender.simi = false
        return m.reply("Fitur auto simi berhasil dimatikan.")
    }
// QURAN
conn.quran = conn.quran ? conn.quran : {}
if (m.from in conn.quran) {
    if (m.hasQuotedMsg) {
          if (conn.quran[m.from][0].id === m.quoted.id) {
              for (const item of conn.quran[m.from][0].isi) {
                  if (conn.quran[m.from][0].isi.length > Number(m.arg[0] - 1)) {
                    let result = conn.quran[m.from][0].isi[Number(m.arg[0] - 1)]
                    await conn.reply(m.from, `
ꜱᴜʀᴀᴛ : ${result.asma}
ʟᴀᴛɪɴ : *${result.nama}*
ᴀʀᴛɪ : ${result.arti}
ᴊᴜᴍʟᴀʜ ᴀʏᴀᴛ : ${result.ayat}
ᴅɪᴛᴜʀᴜɴᴋᴀɴ ᴅɪ : ${result.type}
ᴋᴇᴛᴇʀᴀɴɢᴀɴ: _${result.keterangan}_`.trim(), m)
m.reply(result[0].audio, {asDocument: true, fileName: result.nama})
                  } break
              }
          }
        } }
// DOA
    conn.doa = conn.doa ? conn.doa : {}
    if (m.from in conn.doa) {
        if (m.hasQuotedMsg) {
              if (conn.doa[m.from][0].id === m.quoted.id) {
      if (conn.doa[m.from][0].isi.length > Number(m.arg[0] - 1)) {
let hasildoa = conn.doa[m.from][0].isi[Number(m.arg[0] - 1)]
    m.reply(`*${hasildoa.title}*
    
    ${hasildoa.arabic}
    _${hasildoa.latin}_
    
    ${hasildoa.translation}`.trim()) 
      }
    }
  }
}
// YT
conn.yts = conn.yts ? conn.yts : {}
if (m.from in conn.yts) {
    if (m.hasQuotedMsg) {
          if (conn.yts[m.from][0].id === m.quoted.id) {
            if (!m.arg[1]) return m.reply("Silahkan balas pesan, masukkan angka dan tipe! \nContoh: 1 mp3 ")
            if (Number(m.arg[0]) > conn.yts[m.from][1].length) return m.reply("Pilihan angka tidak ada! \nContoh: 1 mp3 ")
            if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
            if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                if ( global.db.users[m.sender].limit > 4) {
                global.db.users[m.sender].limit -= 4
                m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
            }}
            if (m.arg[1] == "mp3" || m.arg[1] == "audio") {
                await m.reply("wait")
            let data = (await (await fetch(`${config.APIs.apibe.baseURL}/api/yutub/audio?url=${conn.yts[m.from][1][Number(m.arg[0])].url}&apikey=${config.APIs.apibe.Key}`)).json()).result
            let datas = await Func.getFiles(data.link, true)
            m.reply(datas.res, {asDocument: true, fileName: data.title})
        }
          if (m.arg[1] == "mp4" || m.arg[1] == "video") {
            if ( global.db.users[m.sender].limit < 5) return m.reply("limit")
            if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                if ( global.db.users[m.sender].limit > 5) {
                global.db.users[m.sender].limit -= 5
                m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 5, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
            }}
            await m.reply("wait")
            let data = (await (await fetch(`${config.APIs.apibe.baseURL}/api/yutub/video?url=${conn.yts[m.from][1][Number(m.arg[0])].url}&apikey=${config.APIs.apibe.Key}`)).json()).result
            let datas = await Func.getFiles(data.link, true)
            m.reply(datas.res, {asDocument: true, fileName: data.title})
        }
        }
    }
}
        // LOG Chat
        if (m.message && !m.isBot) {
            console.log(chalk.black(chalk.bgWhite("- FROM")), chalk.black(chalk.bgGreen(m.pushname)), chalk.black(chalk.yellow(m.sender)) + "\n" + chalk.black(chalk.bgWhite("- IN")), chalk.black(chalk.bgGreen(m.isGroup ? m.metadata.subject : "Private Chat", m.from)) + "\n" + chalk.black(chalk.bgWhite("- MESSAGE")), chalk.black(chalk.bgGreen(m.body || m.type)))
        }
        if (isCmd && allMenuItems.includes(command)) {
            m.react("⏳")
            m.error = false
    }
        switch (command) {
            case "simi": {
                global.db.users[m.sender].simi = true
                m.reply("Fitur simi diaktifkan!")
            }
            break
            case "menu": {
                let text = `
┏━━〔 ${config.options.bot} 〕━▣
┃❒ *Hai, @${m.sender.split`@`[0]}!*
┃❒ *Total CMD :* ${Object.values(config.menu).map(a => a.length).reduce((total, num) => total + num, 0)}
┗━━━━━━▣\n`.trimStart()
    Object.entries(config.menu).map(([type, command]) => {
        text += `╔═  *ᴍᴇɴᴜ ${Func.toUpper(type)}*\n`
        text += `┃\n`
        text += `┃➠ ${command.map(a => `_${prefix + a}_`).join("\n│➠ ")}\n`
        text += `┃\n`
        text += `╚══════▣\n`
    }).join("\n\n")
                text += `
┏━━〔 ${config.options.bot} 〕━▣
┃❒ ʙᴏᴛ ꜰᴜʟʟ ꜰɪᴛᴜʀ: 
┃❒ _https://wa.me/${config.options.mybot}?text=.daftar%20UserBE.20_
┗━━━━━━▣\n`.trimStart()
                return conn.sendMessage(m.from, {
                    text, contextInfo: {
                        mentionedJid: conn.parseMention(text),
                        externalAdReply: {
                            title: conn?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: fs.readFileSync("./qrbe.jpg"),
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m })
            }
            case "profile": {
                let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
                let pp = await conn.profilePictureUrl(who, "image").catch(() => fs.readFileSync("./qrbe.jpg"))
                let sender = global.db.users[who]
                let text = `
┏━━〔 ${config.options.bot} 〕━▣
┃❒ *ɴᴀᴍᴀ:* ${"@"+m.sender.split`@`[0] || sender.name}
┃❒ *ʟɪᴍɪᴛ:* ${sender.limit}
┃❒ *ᴘʀᴇᴍɪᴜᴍ:* ${sender.premium ? "ɪʏᴀ" : "ᴛɪᴅᴀᴋ"}
┃❒ *ᴠɪᴘ:* ${sender.VIP ? "ɪʏᴀ" : "ᴛɪᴅᴀᴋ"}
┃❒ *ʙᴀɴɴᴇᴅ:* ${sender.banned ? "ɪʏᴀ" : "ᴛɪᴅᴀᴋ"}
┗━━━━━━▣

┏━━〔 ${config.options.author} 〕━▣
┃❒ ʙᴏᴛ ꜰᴜʟʟ ꜰɪᴛᴜʀ: 
┃❒ _https://wa.me/${config.options.mybot}?text=.daftar%20UserBE.20_
┗━━━━━━▣\n`.trimStart()
                conn.sendMessage(m.from, {
                    text, contextInfo: {
                        mentionedJid: conn.parseMention(text),
                        externalAdReply: {
                            title: conn?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: (await Func.getFile(pp)).data,
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m })
            }
            break
            case "yts": case "play": {
                if (!m.args[0]) return m.reply(`Masukkan pencarian youtube!`)
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 1) {
                    global.db.users[m.sender].limit -= 1
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                let data = (await (await fetch(`${config.APIs.apibe.baseURL}/api/yutub/search?text=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                let hasil = data.map((v,i) => `\n*${i+1}*. *Judul:* ${v?.title}\n▸ *Durasi:* ${v?.timestamp}\n▸ *Link:* ${v?.url}\n\n`)
                let id = await m.reply("*★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★*\n\n"+hasil+"\nᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!")
                conn.yts = conn.yts ? conn.yts : {}
                conn.yts[m.from] = [{id: id.key.id}, data, setTimeout(() => {
                    delete conn.yts[m.from]
                    data = null},  120000)]
            }
            break
            case "yta": case "ytmp3": {
                if (!m.args[0]) return m.reply(`Masukkan link youtube!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                m.reply("wait")
                let datayta = (await (await fetch(`${config.APIs.apibe.baseURL}/api/yutub/audio?url=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                let datas = await Func.getFiles(datayta.link, true)
            m.reply(datas.res, {asDocument: true, fileName: datayta.title})
            }
            break
            case "ytv": case "ytmp4": {
                if (!m.args[0]) return m.reply(`Masukkan link youtube!`)
                if ( global.db.users[m.sender].limit < 5) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 5) {
                    global.db.users[m.sender].limit -= 5
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 5, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                m.reply("wait")
                let dataytv = (await (await fetch(`${config.APIs.apibe.baseURL}/api/yutub/video?url=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                let datas = await Func.getFiles(dataytv.link, true)
            m.reply(datas.res, {asDocument: true, fileName: dataytv.title})
            }
            break
            case "ig":  {
                if (!m.args[0]) return m.reply(`Masukkan link instagram!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                m.reply("wait")
                let dataig = (await (await fetch(`${config.APIs.apibe.baseURL}/api/igdl?url=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                await m.reply(dataig.medias[0].url)
            }
            break
            case "tt":  {
                if (!m.args[0]) return m.reply(`Masukkan link tiktok!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                m.reply("wait")
                let datatt = (await (await fetch(`${config.APIs.apibe.baseURL}/api/ttdl?url=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                await m.reply(datatt.video.no_watermark_hd)
            }
            break
            case "fb":  {
                if (!m.args[0]) return m.reply(`Masukkan link facebook!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                m.reply("wait")
                let datafb = (await (await fetch(`${config.APIs.apibe.baseURL}/api/fbdl?url=${m.text}&apikey=${config.APIs.apibe.Key}`)).json()).result
                await m.reply(datafb.result[0].url)
            }
            break
            case "speed":  {
                        m.reply("*ꜱᴇᴅᴀɴɢ ᴘʀᴏꜱᴇꜱ ᴋᴇᴄᴇᴘᴀᴛᴀɴ ɪɴᴛᴇʀɴᴇᴛ...*")
                        let exec = promisify(cp.exec).bind(cp)
                      let o
                      try {
                      o = await exec("python speed.py")
                      } catch (e) {
                      o = e
                     } finally {
                    let { stdout, stderr } = o
                    if (stdout.trim()) m.reply(stdout)
                    if (stderr.trim()) m.reply(stderr)
                        }
            }
            break    
            case "ai": {
                if (!m.args[0]) return m.reply("Mau tanya apa ya? Contoh: .ai Halo siapa kamu?")
                if ( global.db.users[m.sender].limit < 3) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 3) {
                    global.db.users[m.sender].limit -= 3
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 3, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
            let ai = "ᴏᴘᴇɴ ᴀɪ"
              try {
            await m.reply("wait")
              let rres = await(await fetch(`https://vihangayt.me/tools/chatgpt4?q=${m.text}`)).json()
  
m.reply(`${"❖=『 "+ai+" 』=❖"}
    
ᴀɴᴅᴀ: ${m.text}

<==========>
ʀᴇꜱᴘᴏɴ ᴀɪ: 
${rres.data}`.trim())
        }  catch (err) {
                console.log(`OpenAI => ${err}`)
                m.reply("ᴀɪ ᴛɪᴅᴀᴋ ᴍᴇɴɢᴇʀᴛɪ ᴄᴏʙᴀ ᴛᴀɴʏᴀᴋᴀɴ ʏᴀɴɢ ʟᴀɪɴ!")
                }
            }
            break
            case "owner": {
                conn.sendContact(m.from, config.options.owner, m)
            }
            break
            case "ping": {
                const more = String.fromCharCode(8206)
                const readMore = more.repeat(4001)
                function clockString(ms) {
                  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000)
                  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
                  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
                  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
                  return [d, " *Days ☀️*\n ", h, " *Hours 🕐*\n ", m, " *Minute ⏰*\n ", s, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("")
                }
                let format = sizeFormatter({
                  std: "JEDEC", // "SI" (default) | "IEC" | "JEDEC"
                  decimalPlaces: 2,
                  keepTrailingZeroes: false,
                  render: (literal, symbol) => `${literal} ${symbol}B`,
                })
                    let _muptime
                    if (process.send) {
                      process.send("uptime")
                      _muptime = await new Promise(resolve => {
                        process.once("message", resolve)
                        setTimeout(resolve, 1000)
                      }) * 1000
                    }
                    let muptime = clockString(_muptime)
                  const used = process.memoryUsage()
                  const cpus = _cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                    return cpu
                  })
                  const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                  }, {
                    speed: 0,
                    total: 0,
                    times: {
                      user: 0,
                      nice: 0,
                      sys: 0,
                      idle: 0,
                      irq: 0
                    }
                  })
                
                  let old = performance.now()
                  await m.reply(`*T e s t i n g. . .*`)
                  let neww = performance.now()
                  let speed = neww - old
                  await conn.reply(m.from,`*𝐒 𝐏 𝐄 𝐄 𝐃*
${Math.round(neww - old)} ms
${speed} ms

*ʀ ᴜ ɴ ᴛ ɪ ᴍ ᴇ*
${muptime}
${readMore}

*ꜱᴇʀᴠᴇʀ*
*🛑 ʀᴀᴍ:* ${format(totalmem() - freemem())} / ${format(totalmem())}
*🔵 ꜰʀᴇᴇʀᴀᴍ:* ${format(freemem())}

*💻 ᴘʟᴀᴛꜰᴏʀᴍ:* ${os.platform()}
*🧿 ꜱᴇʀᴠᴇʀ:* ${os.hostname()}
${readMore}
*ɴᴏᴅᴇ-ᴊꜱ ᴍᴇᴍᴏʀʏ ᴜꜱᴀɢᴇ*
${"```" + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), " ")}: ${format(used[key])}`).join("\n") + "```"}

${cpus[0] ? `_ᴛᴏᴛᴀʟ ᴄᴘᴜ ᴜꜱᴀɢᴇ_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + "*").padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join("\n")}

_ᴄᴘᴜ ᴄᴏʀᴇ(ꜱ) ᴜꜱᴀɢᴇ (${cpus.length} ᴄᴏʀᴇ ᴄᴘᴜ)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + "*").padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join("\n")}`).join("\n\n")}` : ""}
`, m)
                }
            break
            case "quoted": case "q": {
                const { Serialize } = (await import("../lib/serialize.js"))
                if (!m.hasQuotedMsg) m.reply("quoted")
                try {
                    const message = await Serialize(conn, (await conn.loadMessage(m.from, m.quoted.id)))
                    if (!message.hasQuotedMsg) return m.reply("Quoted Not Found 🙄")
                    conn.sendMessage(m.from, { forward: message.quoted })
                } catch {
                    m.reply("Quoted Not Found 🙄")
                }
            }
            break
            case "public": {
                if (!m.isOwner) return m.reply("owner")
                if (config.options.public) {
                    config.options.public = false
                    m.reply("Switch Bot To Self Mode")
                } else {
                    config.options.public = true
                    m.reply("Switch Bot To Public Mode")
                }
            }
            break
            case "mute": {
                if (!m.isOwner) return m.reply("owner")
                let db = global.db.groups[m.from]
                if (db.mute) {
                    db.mute = false
                    m.reply("Succes Unmute This Group")
                } else if (!db.mute) {
                    db.mute = true
                    m.reply("Succes Mute This Group")
                }
            }
            break
            case "setpp": case "setprofile": case "seticon": {
                const media = await quoted.downloadMedia()
                if (m.isOwner && !m.isGroup) {
                    if (/full/i.test(m.text)) await conn.setProfilePicture(conn?.user?.id, media, "full")
                    else if (/(de(l)?(ete)?|remove)/i.test(m.text)) await conn.removeProfilePicture(conn.decodeJid(conn?.user?.id))
                    else await conn.setProfilePicture(conn?.user?.id, media, "normal")
                } else if (m.isGroup && m.isAdmin && m.isBotAdmin) {
                    if (/full/i.test(m.text)) await conn.setProfilePicture(m.from, media, "full")
                    else if (/(de(l)?(ete)?|remove)/i.test(m.text)) await conn.removeProfilePicture(m.from)
                    else await conn.setProfilePicture(m.from, media, "normal")
                }
            }
            break
            case "setname": {
                if (m.isOwner && !m.isGroup) {
                    await conn.updateProfileName(m.hasQuotedMsg ? quoted.body : quoted.text)
                } else if (m.isGroup && m.isAdmin && m.isBotAdmin) {
                    await conn.groupUpdateSubject(m.from, m.hasQuotedMsg ? quoted.body : quoted.text)
                }
            }
            break
            case "sticker": case "s": case "stiker": {
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 1) {
                    global.db.users[m.sender].limit -= 1
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                if (/image|video|webp/i.test(quoted.mime)) {
                    m.reply("wait")
                    const buffer = await quoted.downloadMedia()
                    if (quoted?.msg?.seconds > 10) return m.reply(`Max video 9 second`)
                    let exif
                    if (m.text) {
                        let [packname, author] = m.text.split("|")
                        exif = { packName: packname ? packname : "", packPublish: author ? author : "" }
                    } else {
                        exif = { ...config.Exif }
                    }
                    m.reply(buffer, { asSticker: true, ...exif })
                } else if (m.mentionedJid[0]) {
                    m.reply("wait")
                    let url = await conn.profilePictureUrl(m.mentionedJid[0], "image");
                    m.reply(url, { asSticker: true, ...config.Exif })
                } else if (/(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(m.text)) {
                    m.reply("wait")
                    m.reply(Func.isUrl(m.text)[0], { asSticker: true, ...config.Exif })
                } else {
                    m.reply(`Metode salah, balas pesan gambar ketik .s atau kirim gambar caption .s !!!`)
                }
            }
            break
            case "toimg": {
                if ( global.db.users[m.sender].limit < 2) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 2) {
                    global.db.users[m.sender].limit -= 2
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 2, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                let { webp2mp4File } = (await import("../lib/sticker.js"))
                if (!/webp/i.test(quoted.mime)) return m.reply(`Reply Sticker with command ${prefix + command}`)
                if (quoted.isAnimated) {
                    let media = await webp2mp4File((await quoted.downloadMedia()))
                    await m.reply(media)
                }
                let media = await quoted.downloadMedia()
                await m.reply(media, { mimetype: "image/png" })
            }
            break
            case "hidetag": case "h": {
                if (!m.isGroup) return m.reply("group")
                if (!m.isAdmin) return m.reply("admin")
                let mentionedJid = m.metadata.participants.map(a => a.id)
                let mod = await conn.cMod(m.from, quoted, /hidetag|tag|ht|h|totag/i.test(quoted.body.toLowerCase()) ? quoted.body.toLowerCase().replace(prefix + command, "") : quoted.body)
                conn.sendMessage(m.from, { forward: mod, mentionedJid })
            }
            break
            case "add": {
                if (!m.isGroup) return m.reply("group")
                if (!m.isAdmin) return m.reply("admin")
                if (!m.isBotAdmin) return m.reply("botAdmin")
                let users = m.mentionedJid.length !== 0 ? m.mentionedJid.slice(0, 2) : m.hasQuotedMsg ? [m.quoted.sender] : m.text.split(",").map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").slice(0, 2)
                if (users.length == 0) return m.reply("Fuck You 🖕")
                await conn.groupParticipantsUpdate(m.from, users, "add")
                    .then(async (res) => {
                        for (let i of res) {
                            if (i.status == 403) {
                                let node = getBinaryNodeChildren(i.content, "add_request")
                                await m.reply(`Can"t add @${i.jid.split("@")[0]}, send invitation...`)
                                let url = await conn.profilePictureUrl(m.from, "image").catch(_ => "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu")
                                await conn.sendGroupV4Invite(i.jid, m.from, node[0]?.attrs?.code || node.attrs.code, node[0]?.attrs?.expiration || node.attrs.expiration, m.metadata.subject, url, "Invitation to join my WhatsApp Group")
                            }
                            else if (i.status == 409) return m.reply(`@${i.jid?.split("@")[0]} already in this group`)
                            else m.reply(Func.format(i))
                        }
                    })
            }
            break
            case "welcome": {
                if (!m.isAdmin) return m.reply("admin")
                let db = global.db.groups[m.from]
                if (db.welcome) {
                    db.welcome = false
                    m.reply("Succes Deactive Welcome on This Group")
                } else if (!db.welcome) {
                    db.welcome = true
                    m.reply("Succes Activated Welcome on This Group")
                }
            }
            break
            case "leaving": {
                if (!m.isAdmin) return m.reply("admin")
                let db = global.db.groups[m.from]
                if (db.leave) {
                    db.leave = false
                    m.reply("Succes Deactive Leaving on This Group")
                } else if (!db.leave) {
                    db.leave = true
                    m.reply("Succes Activated Leaving on This Group")
                }
            }
            break
            case "linkgroup": case "linkgrup": case "linkgc": {
                if (!m.isGroup) return m.reply("group")
                if (!m.isAdmin) return m.reply("admin")
                if (!m.isBotAdmin) return m.reply("botAdmin")
                await m.reply("https://chat.whatsapp.com/" + (await conn.groupInviteCode(m.from)))
            }
            break
            case "fetch": case "get": {
                if (!/^https:\/\//i.test(m.text) && !m.args[0]) return m.reply(`No Query?\n\nExample : ${prefix + command} https://api.xfarr.com`)
                m.reply("wait")
                let mime = (await import("mime-types"))
                const res = await axios.get(Func.isUrl(m.text)[0], { responseType: "arraybuffer" })
                if (!/utf-8|json|html|plain/.test(res?.headers?.get("content-type"))) {
                    if ( global.db.users[m.sender].limit < 3) return m.reply("limit")
                    if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                        if ( global.db.users[m.sender].limit > 3) {
                        global.db.users[m.sender].limit -= 3
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 3, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }}
                    let fileName = /filename/i.test(res.headers?.get("content-disposition")) ? res.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["";]/g, "") : ""
                    return m.reply(res.data, { fileName, mimetype: mime.lookup(fileName) })
                }
                let text = res?.data?.toString() || res?.data
                text = format(text)
                try {
                    if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                    if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                        if ( global.db.users[m.sender].limit > 1) {
                        global.db.users[m.sender].limit -= 1
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }}
                    m.reply(text.slice(0, 65536) + "")
                } catch (e) {
                    m.reply(format(e))
                }
            }
            break
            case "rvo": {
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if ( !global.db.users[m.sender].premium || !global.db.users[m.sender].VIP ) { 
                    if ( global.db.users[m.sender].limit > 1) {
                    global.db.users[m.sender].limit -= 1
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }}
                if (!quoted.msg.viewOnce) return m.reply(`Reply view once with command ${prefix + command}`)
                quoted.msg.viewOnce = false
                await conn.sendMessage(m.from, { forward: quoted }, { quoted: m })
            }
            break
            case "kisahnabi": {
if (!m.args[0]) return m.reply(m.from, `ʜᴀʀᴀᴘ ᴍᴀꜱᴜᴋᴀɴ ɴᴀᴍᴀ ɴᴀʙɪ\n\nᴄᴏɴᴛᴏʜ: .kisahnabi ᴍᴜʜᴀᴍᴍᴀᴅ`,m);
let data = [ "Adam", "Idris", "Nuh", "Hud", "Sholeh",
"Ibrahim", "Ismail", "Luth", "Ishaq", "Yaqub",
"Yusuf", "Syuaib", "Ayyub", "Dzulkifli", "Musa",
"Harun", "Daud","Sulaiman","Ilyas", "Ilyasa",
"Yunus", "Zakariya","Yahya", "Isa", "Muhammad"]
let mirip = didyoumean(`${m.args[0].replace(/[^a-zA-Z]/g, "")}`, data)
let nomorjson = data.indexOf(mirip)
let res = await fetch(`https://raw.githubusercontent.com/BerkahEsport/api-be/main/data/islam/kisahnabi/${nomorjson+1}.json`);
if (!res.ok) return m.reply(await res.text());
let json = await res.json();
let more = String.fromCharCode(8206);
let readMore = more.repeat(4001);
let gmbr = `${json[0].image_url}`;
let anu = `*── 「 𝐊𝐈𝐒𝐀𝐇 𝐍𝐀𝐁𝐈 」 ──*
▢ *𝐍𝐚𝐛𝐢*: ${json[0].name}
▢ *ʟᴀʜɪʀ*: ${json[0].thn_kelahiran}
▢ *ᴜᴍᴜʀ*: ${json[0].usia} ᴛᴀʜᴜɴ.
▢ *ᴛᴇᴍᴘᴀᴛ*: ${json[0].tmp}
${readMore}
${json[0].description}`;
conn.sendMessage(m.from, {
                    text: anu, contextInfo: {
                        mentionedJid: [ m.sender],
                        externalAdReply: {
                            title: conn?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: await (await fetch(gmbr)).arrayBuffer(),
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m })
};
break
case "doa": {
    if (!m.args[0]) return m.reply("ᴍᴀꜱᴜᴋᴋᴀɴ ɴᴀᴍᴀ ᴅᴏᴀɴʏᴀ ᴀᴘᴀ?")
conn.doa = conn.doa ? conn.doa : {}
let doaseharihari = await (await fetch("https://raw.githubusercontent.com/BerkahEsport/api-be/main/data/islam/lainya/doaharian.json")).json()
let data = doaseharihari.data.map((v,i) => `\n${i+1}. ${v.title}`)
  let datas = doaseharihari.data
  let id = await conn.sendMessage(m.from, { text: `★彡[ᴅᴏᴀ]彡★

${data}

_Silahkan balas pesan ini dan ketikkan angkanya yang ingin dipilih!_`.trim()}, {quoted: m})
  conn.doa[m.from] = [{isi: datas, id: id.key.id},
  setTimeout(() => {
    delete conn.doa[m.from]
}, 120000)]
}
break
case "quran": case "surah": case "alquran": {
conn.quran = conn.quran ? conn.quran : {}
    let judul = "*꧁•⊹٭𝙳𝚊𝚏𝚝𝚊𝚛 𝙰𝚕-𝚀𝚞𝚛𝚊𝚗٭⊹•꧂*"
    let list = `${judul}
1. Al Fatihah,
2. Al Baqarah,
3. Ali Imran,
4. An Nisaa,
5. Al Maidah,
6. Al An"am,
7. Al A"raf,
8. Al Anfaal,
9. At Taubah,
10. Yunus,
11. Huud,
12. Yusuf,
13. Ar Ra"du,
14. Ibrahim,
15. Al Hijr,
16. An Nahl,
17. Al Israa",
18. Al Kahfi,
19. Maryam,
20. Thaahaa,
21. Al Anbiyaa,
22. Al Hajj,
23. Al Mu"minun,
24. An Nuur,
25. Al Furqaan,
26. Asy Syu"ara,
27. An Naml,
28. Al Qashash,
29. Al "Ankabut,
30. Ar Ruum,
31. Luqman,
32. As Sajdah,
33. Al Ahzab,
34. Saba",
35. Faathir,
36. Yaa Siin,
37. Ash Shaaffat,
38. Shaad,
39. Az Zumar,
40. Al Ghaafir,
41. Al Fushilat,
42. Asy Syuura,
43. Az Zukhruf,
44. Ad Dukhaan,
45. Al Jaatsiyah,
46. Al Ahqaaf,
47. Muhammad,
48. Al Fath,
49. Al Hujuraat,
50. Qaaf,
51. Adz Dzaariyaat,
52. Ath Thuur,
53. An Najm,
54. Al Qamar,
55. Ar Rahmaan,
56. Al Waaqi"ah,
57. Al Hadiid,
58. Al Mujaadalah,
59. Al Hasyr,
60. Al mumtahanah,
61. Ash Shaff,
62. Al Jumuah,
63. Al Munafiqun,
64. Ath Taghabun,
65. Ath Thalaaq,
66. At Tahriim,
67. Al Mulk,
68. Al Qalam,
69. Al Haaqqah,
70. Al Ma"aarij,
71. Nuh,
72. Al Jin,
73. Al Muzammil,
74. Al Muddastir,
75. Al Qiyaamah,
76. Al Insaan,
77. Al Mursalaat,
78. An Naba",
79. An Naazi"at,
80. "Abasa,
81. At Takwiir,
82. Al Infithar,
83. Al Muthaffifin,
84. Al Insyiqaq,
85. Al Buruuj,
86. Ath Thariq,
87. Al A"laa,
88. Al Ghaasyiah,
89. Al Fajr,
90. Al Balad,
91. Asy Syams,
92. Al Lail,
93. Adh Dhuhaa,
94. Asy Syarh,
95. At Tiin,
96. Al "Alaq,
97. Al Qadr,
98. Al Bayyinah,
99. Az Zalzalah,
100. Al "Aadiyah,
101. Al Qaari"ah,
102. At Takaatsur,
103. Al "Ashr,
104. Al Humazah,
105. Al Fiil,
106. Quraisy,
107. Al Maa"uun,
108. Al Kautsar,
109. Al Kafirun,
110. An Nashr,
111. Al Lahab,
112. Al Ikhlash,
113. Al Falaq,
114. An Naas`.trim()
if (!m.args[0]) return m.reply(`${list}\n\n*Contoh:* _.alquran An Naas_`)
let json = JSON.parse(fs.readFileSync("./lib/alquran.json"))
let data = json.map(v => v.nama)
let mirip = didyoumean(m.text, data)
if (mirip == null) {
  const datas = json.filter(item => item.nama.toLowerCase().match(m.text));
  if (datas.length == 0) throw ("Surat tidak ditemukan!")
  let id = await m.reply(`★彡[ʜᴀꜱɪʟ ꜱᴜʀᴀᴛ ʏᴀɴɢ ᴅɪᴛᴇᴍᴜᴋᴀɴ]彡★

${datas.map((v,i) => `\n${i+1}. ${v.nama}`)}

_Silahkan balas pesan ini dan ketikkan angkanya yang ingin dipilih!_`.trim())
  conn.quran[m.from] = [{isi: datas, id: id.key.id},
  setTimeout(() => {
    delete conn.quran[m.from] 
}, 120000)]
} else {
  const result = json.filter(item => item.nama.toLowerCase().includes(mirip.toLowerCase()));
  await conn.reply(m.from, `
ꜱᴜʀᴀᴛ : ${result[0].asma}
ʟᴀᴛɪɴ : ${result[0].nama}
ᴀʀᴛɪ : ${result[0].arti}
ᴊᴜᴍʟᴀʜ ᴀʏᴀᴛ : ${result[0].ayat}
ᴅɪᴛᴜʀᴜɴᴋᴀɴ ᴅɪ : ${result[0].type}
ᴋᴇᴛᴇʀᴀɴɢᴀɴ: _${result[0].keterangan}_`.trim(), m)
m.reply(result[0].audio, {asDocument: true, fileName: result[0].nama})
}
}
break
// <===== Category Tools =====>
case 'qc': case 'quickchat': {
    let skizo = ["doyansharing", "y6rsxtbase"]
    let who = m.hasQuotedMsg ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let text = m.hasQuotedMsg ? m.quoted.text : m.text
    var fakec
    let image = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph//file/c4044a0d3b4cc8b8dc2dd.jpg')
    let data = await conn.getFile(image, true)
    let avatar = await upload(data)
    try {
        fakec = `https://skizo.tech/api/qc?text=${encodeURIComponent(text)}&username=${name}&avatar=${avatar.url}&apikey=${skizo[0]}`
    } catch (e) {
        try {
            fakec = `https://skizo.tech/api/qc?text=${encodeURIComponent(text)}&username=${name}&avatar=${avatar.url}&apikey=${skizo[1]}`
        } catch (e) {
            await m.reply(e)
        }
    }
    m.reply(fakec, {asSticker: true})
}
break
// <===== Category Owner =====>
case 'cleartmp': {
    const directory = "./tmp";

    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    } )
      conn.reply( m.from, "✔️ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɢʜᴀᴘᴜꜱ ꜱᴇʟᴜʀᴜʜ ꜰɪʟᴇ ᴅɪ ᴅɪʀᴇᴋᴛᴏʀɪ ᴛᴍᴘ.", m )
}
break
case 'getcase': {
if (!m.isOwner) return m.reply("owner")
const getCase = (cases) => {
return "case"+`'${cases}'` + fs.readFileSync("./event/message.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}
m.reply(`${getCase(m.text)}`)
}
break
            default:
                if (["bc"].some(a => m.body?.toLowerCase()?.startsWith(a)) && m.isOwner) {
                    let ran = (Math.floor(Math.random() * 5))
                    let listbc = JSON.parse(fs.readFileSync("./lib/data/broadcast.json"))
                    let listdb = Object.keys(global.db.users)
                    let data = listbc.length == 0 ? listdb : listbc
                    let info = `<= *★彡[ʙʀᴏᴀᴅᴄᴀꜱᴛ]彡★* =>
Hai, bot *${config.options.bot}* sudah aktif...
Ketik _.menu_ untuk menampilkan fitur bot...
Terima kasih...

*ᴄʜᴀᴛ ʙᴏᴛ*
_https://wa.me/${config.options.mybot}_
*ɢʀᴏᴜᴘ ʙᴏᴛ*
_${config.options.group}_
*ᴘᴇʀɪɴɢᴀᴛᴀɴ*: 
_Jika bot tidak merespon silahkan coba lagi nanti._
~Hiraukan pesan ini jika tidak mengerti.~`.trim()
                let datas = await m.reply(`${info}`)
                  for (const user of data) {
                      await conn.sendMessage(user, { forward: datas, contextInfo: {
                              mentionedJid: user,
                              externalAdReply: {
                                  forwardingScore: data.length,
                                  title: conn.user.name,
                                  mediaType: 1,
                                  previewType: 0,
                                  renderLargerThumbnail: true,
                                  thumbnail: fs.readFileSync("./qrbe.jpg"),
                                  sourceUrl: config.options.group
                              }
                          }
                        })
                   await new Promise(resolve => setTimeout(resolve, ran * 1000));
                  }
                  await m.reply(`Mengirim ke ${data.length} kontak.`)
                }
                if (["*"].some(a => m.body?.toLowerCase()?.startsWith(a)) && m.isOwner) {
                    m.reply(format(message))
                }
                if ([">", "eval", "=>"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
                    if (!m.isOwner) return m.reply("owner")
                    let evalCmd = ""
                    try {
                        evalCmd = /await/i.test(m.text) ? eval("(async() => { " + m.text + " })()") : eval(m.text)
                    } catch (e) {
                        evalCmd = e
                    }
                    new Promise(async (resolve, reject) => {
                        try {
                            resolve(evalCmd);
                        } catch (err) {
                            reject(err)
                        }
                    })
                        ?.then((res) => m.reply(format(res)))
                        ?.catch((err) => m.reply(format(err)))
                }
                if (["$", "exec"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
                    if (!m.isOwner) return m.reply("owner")
                    try {
                        exec(m.text, async (err, stdout) => {
                            if (err) return m.reply(Func.format(err))
                            if (stdout) return m.reply(Func.format(stdout))
                        })
                    } catch (e) {
                        m.reply(Func.format(e))
                    }
                }
                if (/^bot|Bot|Boti|Botbe/i.test(m.body)) {
                    m.reply(`ɪʏᴀ "${m.pushname}" ᴀᴅᴀ ᴀᴘᴀ?\n\n${config.options.info}`)
                }
                if ( !m.fromMe && m.body.match( /(bot|berkahesport|berkahesportbot|botberkah|berkahesport.id)/gi ) ) {
                    let res = JSON.parse(fs.readFileSync('./lib/emoji.json'))
                    let em = res.emoji
                    let emot = Func.random(em)
                    m.react(`${emot}`)
                  }
        }
    } catch (e) {
        m.error = true
        m.react("❌")
        m.reply(format(e))
    } finally {
        if (m?.error == false) m.react("✅")
    }
}