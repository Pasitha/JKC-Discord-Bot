module.exports.run = (bot, args) => {
    if (!args[0])
        return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * 100)) + 1} ค่ะ`)
    else if (!args[1] && !isNaN(args[0]))
        return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * parseInt(args[0]))) + 1} ค่ะ`)
    else if (!isNaN(args[1]))
        return JKCJrBot.chat(`เลขที่ออกคือเลข ${Math.floor((Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1))) + parseInt(args[0])} ค่ะ`)
    else
        return JKCJrBot.chat(`คือ หนูจะบอกว่าที่คุณใส่มาน่ะมันไม่ใช่ตัวเลขอะค่ะ ช่วยใส่ให้หนูใหม่ได้มั้ยคะ`);
}

module.exports.name = ['random', 'roll'];