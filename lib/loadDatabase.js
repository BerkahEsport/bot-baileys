import config from "../config.js"
export default function loadDatabase(m) {
    const isNumber = x => typeof x === "number" && !isNaN(x)
    const isBoolean = x => typeof x === "boolean" && Boolean(x)
    let user = global.db.users[m.sender]
    if (typeof user !== "object") global.db.users[m.sender] = {}
    if (user) {
        if (!isNumber(user.limit)) user.limit = 15
        if (!isBoolean(user.premium)) user.premium = false
        if (!isBoolean(user.VIP)) user.VIP = false
        if (!("lastChat" in user)) user.lastChat = new Date * 1
        if (!("name" in user)) user.name = m.pushName
        if (!isBoolean(user.banned)) user.banned = false
        if (!isBoolean(user.simi)) user.simi = false
    } else {
        global.db.users[m.sender] = {
            limit: 15,
            lastChat: new Date * 1,
            premium: false,
            VIP: false,
            name: m.pushName,
            banned: false,
            simi: false,
        }
    }

    if (m.isGroup) {
        let group = global.db.groups[m.from]
        if (typeof group !== "object") global.db.groups[m.from] = {}
        if (group) {
            if (!isBoolean(group.mute)) group.mute = false
            if (!isNumber(group.lastChat)) group.lastChat = new Date * 1
            if (!isBoolean(group.welcome)) group.welcome = true
            if (!isBoolean(group.leave)) group.leave = true
        } else {
            global.db.groups[m.from] = {
                lastChat: new Date * 1,
                mute: false,
                welcome: true,
                leave: true
            }
        }
    }
}