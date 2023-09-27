
// setting your list menu on here
const menu = {
   main: ["help", "speed", "owner", "ping", "quoted"],
   owner: ["eval", "exec", "mute", "public", "setprofile", "setname"],
   convert: ["sticker", "toimage"],
   group: ["hidetag", "add", "welcome", "leaving", "setprofile", "setname", "linkgroup"],
   tool: ["fetch", "rvo"]
}

const limit = {
   free: 15,
   premium: 150,
   VIP: "Infinity",
   download: {
      free: 50000000, // use byte
      premium: 350000000, // use byte
      VIP: 1130000000, // use byte
   }
}

export default {
   limit,
   menu,
   APIs: {
      xzn: {
         baseURL: 'https://xzn.wtf/',
         Key: "beta"
      }
   },
   options: {
      bot: "ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ",
      public: true,
      antiCall: true, // reject call
      database: "database.json", // End .json when using JSON database or use Mongo URI
      owner: ["62895375950107"], // set owner number on here
      sessionName: "session", // for name session
      prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i,
      pairingNumber: "6289649672623" // Example Input : 62xxx
   },
   Exif: {
      packId: "https://moexti.jw.lt/",
      packName: `Sticker Ini Dibuat Oleh :`,
      packPublish: "moexti.",
      packEmail: "berkahesport@gmail.com",
      packWebsite: "https://apibe.vercel.app",
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
      wait: '```「▰▰▰▰▱▱▱▱▱▱」Loading...```',
      urlInvalid: "ᵁʳˡ ˢᵃˡᵃʰ...",
      notFound: "ᴴᵃˢⁱˡ ᵗⁱᵈᵃᵏ ᵈⁱᵗᵉᵐᵘᵏᵃⁿ...",
      premium: "ᴷʰᵘˢᵘˢ ᵖᵉⁿᵍᵍᵘⁿᵃ ᴾᴿᴱᴹᴵᵁᴹ...",
      vip: "ᴷʰᵘˢᵘˢ ᵖᵉⁿᵍᵍᵘⁿᵃ ⱽᴵᴾ...",
      dlFree: `ꜰɪʟᴇ ᴛᴇʀʟᴀʟᴜ ʙᴇꜱᴀʀ ${formatSize(limit.download.free)} ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴘᴇɴɢɢᴜɴᴀ ᴘʀᴇᴍɪᴜᴍ`,
      dlPremium: `ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ꜰɪʟᴇ ᴛᴇʀʟᴀʟᴜ ʙᴇꜱᴀʀ ${formatSize(limit.download.premium)}`,
      dlVIP: `ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ꜰɪʟᴇ ᴛᴇʀʟᴀʟᴜ ʙᴇꜱᴀʀ ${formatSize(limit.download.VIP)}`
   }
}


function formatSize(bytes, si = true, dp = 2) {
   const thresh = si ? 1000 : 1024;

   if (Math.abs(bytes) < thresh) {
      return `${bytes} B`;
   }

   const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
   let u = -1;
   const r = 10 ** dp;

   do {
      bytes /= thresh;
      ++u;
   } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
   );

   return `${bytes.toFixed(dp)} ${units[u]}`;
}