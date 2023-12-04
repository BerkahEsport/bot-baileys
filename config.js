
// setting your list menu on here
const menu = {
   main: ["menu", "simi", "profile", "speed", "owner", "ping", "quoted"],
   islam: ["alquran", "doa", "kisahnabi"],
   owner: ["cleartmp", "getfile", "eval", "exec", "mute", "public", "setprofile", "setname"],
   convert: ["sticker", "toimage", "qc"],
   group: ["hidetag", "add", "welcome", "leaving", "setprofile", "setname", "linkgroup"],
   tool: ["fetch", "rvo", "ai"],
   download: ["yts", "ytv", "yta", "ig", "tt", "fb"]
}

export default {
   menu,
   APIs: {
      apibe: {
         baseURL: "https://api-be.berkahesport.repl.co/", // Rest API BerkahEsport.ID
         Key: "beta" // Mau beli apikey di wa.me/62895375950107
      }
   },
   options: {
      bot: "ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ",
      author: "★彡[ᴍᴏᴇxᴛɪ]彡★",
      public: true,
      antiCall: true, // reject call
      database: "database.json", // End .json when using JSON database or use Mongo URI
      owner: ["62895375950107"], // set owner number on here
      sessionName: "session", // for name session
      prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i,
      pairingNumber: "6289654279897", // Example Input : 62xxx
      mybot: "6289649672623", // Buat cadangan BOT kalian
      group: "https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5",
      info: "Ini bot simpel ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ. \nBot full fitur chat di https://wa.me/6289649672623?text=.menu" // Buat info aja...
   },
   Exif: {
      packId: "https://moexti.jw.lt/",
      packName: `Sticker Ini Dibuat Oleh :`,
      packPublish: "ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ",
      packEmail: "berkahesport@gmail.com",
      packWebsite: "https://bot-baileys.berkahesport.repl.co/",
      androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
      iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
      emojis: [],
      isAvatar: 0,
   },
   msg: {
      owner: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝕆𝕎ℕ𝔼ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ",
      group: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔾ℝ𝕆𝕌ℙ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ",
      private: "*𝕂ℍ𝕌𝕊𝕌𝕊 ℂℍ𝔸𝕋 ℙℝ𝕀𝔹𝔸𝔻𝕀* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ",
      admin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
      botAdmin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔹𝕆𝕋 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴇᴛɪᴋᴀ ʙᴏᴛ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ",
      bot: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔹𝕆𝕋* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ʙᴏᴛ",
      media: "ᴿᵉᵖˡʸ ᵐᵉᵈⁱᵃ...",
      query: "ᴹᵃˢᵘᵏᵏᵃⁿ ᵗᵉᵏˢ...",
      error: "'```404 error```'",
      quoted: "ᴿᵉᵖˡʸ ᵖᵉˢᵃⁿ...",
      wait: "```「▰▰▰▰▱▱▱▱▱▱」Loading...```",
      urlInvalid: "ᵁʳˡ ˢᵃˡᵃʰ...",
      notFound: "ᴴᵃˢⁱˡ ᵗⁱᵈᵃᵏ ᵈⁱᵗᵉᵐᵘᵏᵃⁿ...",
      premium: "ᴷʰᵘˢᵘˢ ᵖᵉⁿᵍᵍᵘⁿᵃ ᴾᴿᴱᴹᴵᵁᴹ...",
      vip: "ᴷʰᵘˢᵘˢ ᵖᵉⁿᵍᵍᵘⁿᵃ ⱽᴵᴾ...",
      limit: "ᴹᵃᵃᶠ ˡⁱᵐⁱᵗ ᵃⁿᵈᵃ ᵗⁱᵈᵃᵏ ᶜᵘᵏᵘᵖ, ˢⁱˡᵃʰᵏᵃⁿ ᵐᵉⁿᵘⁿᵍᵍᵘ ᵇᵉˢᵘᵏ ᵏᵉᵐᵇᵃˡⁱ ᵏᵃʳᵉⁿᵃ ˡⁱᵐⁱᵗ ᵈⁱʳᵉˢᵉᵗ ²⁴ʲᵃᵐ.",
   }
}