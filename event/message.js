
import config from "../config.js"
import Func from "../lib/function.js"
import fs from "fs"
import chalk from "chalk"
import axios from "axios"
import path from "path"
import { getBinaryNodeChildren } from "@whiskeysockets/baileys"
import cp, { exec } from "child_process"
import { format } from "util"
import { fileURLToPath } from "url"
import { createRequire } from "module"
import { promisify } from 'util'
const api = async (name, options = {}) => new (await import("./lib/api.js")).default(name, options)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __filename = Func.__filename(import.meta.url)
const require = createRequire(import.meta.url)
import didyoumean from "didyoumean"

export default async function Message(conn, m) {
    try {
        if (!m) return
        if (!config.options.public && !m.isOwner) return
        if (m.from && db.groups[m.from]?.mute && !m.isOwner) return
        if (m.isBaileys) return
        (await import("../lib/loadDatabase.js")).default(m)
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
            if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
            if ( global.db.users[m.sender].limit > 4) {
                global.db.users[m.sender].limit -= 4
                m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
            }
            if (!m.arg[1]) return m.reply("Silahkan balas pesan, masukkan angka dan tipe! \nContoh: 1 mp3 ")
            if (m.arg[1] == "mp3" || m.arg[1] == "audio") {
                await m.reply("wait")
            let data = await (await fetch(`https://api-be.berkahesport.repl.co/api/yutub/audio?url=${conn.yts[m.from][1][Number(m.arg[0])].url}&apikey=berkahesport`)).json()
            m.reply(data.link)
        }
          if (m.arg[1] == "mp4" || m.arg[1] == "video") {
            if ( global.db.users[m.sender].limit < 5) return m.reply("limit")
            if ( global.db.users[m.sender].limit > 5) {
                global.db.users[m.sender].limit -= 5
                m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 5, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
            }
            await m.reply("wait")
            let data = await (await fetch(`https://api-be.berkahesport.repl.co/api/yutub/video?url=${conn.yts[m.from][1][Number(m.arg[0])].url}&apikey=berkahesport`)).json()
            m.reply(data.link)
        }
        }
    }
}
        const prefix = m.prefix
        const isCmd = m.body.startsWith(prefix)
        const command = isCmd ? m.command.toLowerCase() : ""
        const quoted = m.hasQuotedMsg ? m.quoted : m
        
        // LOG Chat
        if (m.message && !m.isBaileys) {
            console.log(chalk.black(chalk.bgWhite("- FROM")), chalk.black(chalk.bgGreen(m.pushName)), chalk.black(chalk.yellow(m.sender)) + "\n" + chalk.black(chalk.bgWhite("- IN")), chalk.black(chalk.bgGreen(m.isGroup ? m.metadata.subject : "Private Chat", m.from)) + "\n" + chalk.black(chalk.bgWhite("- MESSAGE")), chalk.black(chalk.bgGreen(m.body || m.type)))
        }

        switch (command) {
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
    }).join('\n\n')
                text += `
┏━━〔 ${config.options.bot} 〕━▣
┃❒ ʙᴏᴛ ꜰᴜʟʟ ꜰɪᴛᴜʀ: 
┃❒ _https://wa.me/62857821922892?text=.daftar%20UserBE.20_
┗━━━━━━▣\n`.trimStart()
                return conn.sendMessage(m.from, {
                    text, contextInfo: {
                        mentionedJid: conn.parseMention(text),
                        externalAdReply: {
                            title: conn?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: fs.readFileSync("./tmp/qrbe.jpg"),
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m })
            }
            case "yts":  {
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 1) {
                    global.db.users[m.sender].limit -= 1
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                if (!m.args[0]) return m.reply(`Masukkan pencarian youtube!`)
                let data = await (await fetch(`https://api-be.berkahesport.repl.co/api/yutub/search?text=${m.text}&apikey=berkahesport`)).json()
                let hasil = data.map((v,i) => `\n*${i+1}*. *Judul:* ${v?.title}\n▸ *Durasi:* ${v?.timestamp}\n▸ *Link:* ${v?.url}\n\n`)
                let id = await m.reply("*★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★*\n\n"+hasil+"\nᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!")
                conn.yts = conn.yts ? conn.yts : {}
                conn.yts[m.from] = [{id: id.key.id}, data, setTimeout(() => {
                    delete conn.yts[m.from]
                    data = null},  120000)]
            }
            break
            case "yta":  {
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                if (!m.args[0]) return m.reply(`Masukkan link youtube!`)
                m.reply("wait")
                let datayta = await (await fetch(`https://api-be.berkahesport.repl.co/api/yutub/audio?url=${m.text}&apikey=berkahesport`)).json()
                await m.reply(datayta.link)
            }
            break
            case "ytv":  {
                if ( global.db.users[m.sender].limit < 5) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 5) {
                    global.db.users[m.sender].limit -= 5
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 5, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                if (!m.args[0]) return m.reply(`Masukkan link youtube!`)
                m.reply("wait")
                let dataytv = await (await fetch(`https://api-be.berkahesport.repl.co/api/yutub/video?url=${m.text}&apikey=berkahesport`)).json()
                await m.reply(dataytv.link)
            }
            break
            case "ig":  {
                if (!m.args[0]) return m.reply(`Masukkan link instagram!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                m.reply("wait")
                let dataig = await (await fetch(`https://api-be.berkahesport.repl.co/api/igdl?url=${m.text}&apikey=berkahesport`)).json()
                await m.reply(dataig.medias[0].url)
            }
            break
            case "tt":  {
                if (!m.args[0]) return m.reply(`Masukkan link tiktok!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                m.reply("wait")
                let datatt = await (await fetch(`https://api-be.berkahesport.repl.co/api/ttdl?url=${m.text}&apikey=berkahesport`)).json()
                await m.reply(datatt.video.no_watermark_hd)
            }
            break
            case "fb":  {
                if (!m.args[0]) return m.reply(`Masukkan link facebook!`)
                if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 4) {
                    global.db.users[m.sender].limit -= 4
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                m.reply("wait")
                let datafb = await (await fetch(`https://api-be.berkahesport.repl.co/api/fbdl?url=${m.text}&apikey=berkahesport`)).json()
                await m.reply(datafb.result[0].url)
            }
            break
            case "speed":  {
                        m.reply('*ꜱᴇᴅᴀɴɢ ᴘʀᴏꜱᴇꜱ ᴋᴇᴄᴇᴘᴀᴛᴀɴ ɪɴᴛᴇʀɴᴇᴛ...*')
                        let exec = promisify(cp.exec).bind(cp)
                      let o
                      try {
                      o = await exec('python speed.py')
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
                if ( global.db.users[m.sender].limit < 3) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 3) {
                    global.db.users[m.sender].limit -= 3
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 3, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
            let ai = 'ᴏᴘᴇɴ ᴀɪ'
              try {
            await m.reply("wait")
              let rres = await(await fetch(`https://vihangayt.me/tools/chatgpt4?q=${m.text}`)).json()
  
m.reply(`${'❖=『 '+ai+' 』=❖'}
    
ᴀɴᴅᴀ: ${m.text}

<==========>
ʀᴇꜱᴘᴏɴ ᴀɪ: 
${rres.data}`.trim())
        }  catch (err) {
                console.log(`OpenAI => ${err}`)
                m.reply('ᴀɪ ᴛɪᴅᴀᴋ ᴍᴇɴɢᴇʀᴛɪ ᴄᴏʙᴀ ᴛᴀɴʏᴀᴋᴀɴ ʏᴀɴɢ ʟᴀɪɴ!')
                }
            }
            break
            case "owner": {
                conn.sendContact(m.from, config.options.owner, m)
            }
            break
            case "ping": {
                const moment = (await import("moment-timezone")).default
                const calculatePing = function (timestamp, now) {
                    return moment.duration(now - moment(timestamp * 1000)).asSeconds();
                }
                m.reply(`*Ping :* *_${calculatePing(m.timestamp, Date.now())} second(s)_*`)
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
                    m.reply('Switch Bot To Self Mode')
                } else {
                    config.options.public = true
                    m.reply('Switch Bot To Public Mode')
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
                const media = await quoted.download()
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
                if (/image|video|webp/i.test(quoted.mime)) {
                    if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                    if ( global.db.users[m.sender].limit > 1) {
                        global.db.users[m.sender].limit -= 1
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }
                    m.reply("wait")
                    const buffer = await quoted.download()
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
                    if ( global.db.users[m.sender].limit < 2) return m.reply("limit")
                    if ( global.db.users[m.sender].limit > 2) {
                        global.db.users[m.sender].limit -= 2
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 2, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }
                    m.reply("wait")
                    let url = await conn.profilePictureUrl(m.mentionedJid[0], "image");
                    m.reply(url, { asSticker: true, ...config.Exif })
                } else if (/(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(m.text)) {
                    if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                    if ( global.db.users[m.sender].limit > 1) {
                        global.db.users[m.sender].limit -= 1
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }
                    m.reply("wait")
                    m.reply(Func.isUrl(m.text)[0], { asSticker: true, ...config.Exif })
                } else {
                    m.reply(`Method Not Support`)
                }
            }
            break
            case "toimg": {
                if ( global.db.users[m.sender].limit < 2) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 2) {
                    global.db.users[m.sender].limit -= 2
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 2, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                let { webp2mp4File } = (await import("../lib/sticker.js"))
                if (!/webp/i.test(quoted.mime)) return m.reply(`Reply Sticker with command ${prefix + command}`)
                if (quoted.isAnimated) {
                    let media = await webp2mp4File((await quoted.download()))
                    await m.reply(media)
                }
                let media = await quoted.download()
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
                let users = m.mentionedJid.length !== 0 ? m.mentionedJid.slice(0, 2) : m.hasQuotedMsg ? [m.quoted.sender] : m.text.split(",").map(v => v.replace(/[^0-9]/g, '') + "@s.whatsapp.net").slice(0, 2)
                if (users.length == 0) return m.reply('Fuck You 🖕')
                await conn.groupParticipantsUpdate(m.from, users, "add")
                    .then(async (res) => {
                        for (let i of res) {
                            if (i.status == 403) {
                                let node = getBinaryNodeChildren(i.content, "add_request")
                                await m.reply(`Can't add @${i.jid.split('@')[0]}, send invitation...`)
                                let url = await conn.profilePictureUrl(m.from, "image").catch(_ => "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu")
                                await conn.sendGroupV4Invite(i.jid, m.from, node[0]?.attrs?.code || node.attrs.code, node[0]?.attrs?.expiration || node.attrs.expiration, m.metadata.subject, url, "Invitation to join my WhatsApp Group")
                            }
                            else if (i.status == 409) return m.reply(`@${i.jid?.split('@')[0]} already in this group`)
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
                    if ( global.db.users[m.sender].limit < 4) return m.reply("limit")
                    if ( global.db.users[m.sender].limit > 4) {
                        global.db.users[m.sender].limit -= 4
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 4, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }
                    let fileName = /filename/i.test(res.headers?.get("content-disposition")) ? res.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["';]/g, '') : ''
                    return m.reply(res.data, { fileName, mimetype: mime.lookup(fileName) })
                }
                let text = res?.data?.toString() || res?.data
                text = format(text)
                try {
                    if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                    if ( global.db.users[m.sender].limit > 1) {
                        global.db.users[m.sender].limit -= 1
                        m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                    }
                    m.reply(text.slice(0, 65536) + '')
                } catch (e) {
                    m.reply(format(e))
                }
            }
            break
            case "rvo": {
                if (!quoted.msg.viewOnce) return m.reply(`Reply view once with command ${prefix + command}`)
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if ( global.db.users[m.sender].limit > 1) {
                    global.db.users[m.sender].limit -= 1
                    m.reply(`ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʀᴘᴀᴋᴀɪ 1, ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ!!!`)
                }
                quoted.msg.viewOnce = false
                await conn.sendMessage(m.from, { forward: quoted }, { quoted: m })
            }
            break
            case "kisahnabi": {
if (!m.args[0]) return conn.reply(m.from, `ʜᴀʀᴀᴘ ᴍᴀꜱᴜᴋᴀɴ ɴᴀᴍᴀ ɴᴀʙɪ\n\nᴄᴏɴᴛᴏʜ: .kisahnabi ᴍᴜʜᴀᴍᴍᴀᴅ`,m);
let data = [ 'Adam', 'Idris', 'Nuh', 'Hud', 'Sholeh',
'Ibrahim', 'Ismail', 'Luth', 'Ishaq', 'Yaqub',
'Yusuf', "Syu'aib", 'Ayyub', 'Dzulkifli', 'Musa',
'Harun', 'Daud','Sulaiman','Ilyas', 'Ilyasa',
'Yunus', 'Zakariya','Yahya', 'Isa', 'Muhammad']
let mirip = didyoumean(`${m.args[0].replace(/[^a-zA-Z]/g, '')}`, data)
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
    if (!m.args[0]) return conn.reply("ᴍᴀꜱᴜᴋᴋᴀɴ ɴᴀᴍᴀ ᴅᴏᴀɴʏᴀ ᴀᴘᴀ?")
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
            default:
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
                if (/^bot/i.test(m.body)) {
                    m.reply(`ɪʏᴀ "${m.pushName}" ᴀᴅᴀ ᴀᴘᴀ?`)
                }
        }
    } catch (e) {
        m.reply(format(e))
    }
}
