export default async function before(conn, m) {
try {
// DOA
    conn.doa = conn.doa ? conn.doa : {}
    if (m.chat in conn.doa) {
        if (m.hasQuotedMsg) {
              if (conn.doa[m.chat][0].id === m.quoted.id.id) {
                  for (const item of conn.doa[m.chat][0].isi) {
                      if (conn.doa[m.chat][0].isi.length > Number(m.text)) {
                        let hasildoa = conn.doa[m.chat][0].isi[(Number(m.text)-1)]
                        await m.reply(`*${hasildoa.title}*
    
    ${hasildoa.arabic}
    _${hasildoa.latin}_
    
    ${hasildoa.translation}`.trim())
                      } break
                  }
              }
            } } else return
} catch (e) {
console.log(e)
}
}