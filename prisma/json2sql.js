const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const old_db = require('../database/account.json')

Object.keys(old_db).forEach(async id => {
    let account = await prisma.user.findUnique({
        where: {
            discord_id: id
        }
    })
    if (!account) {
        account = await prisma.user.create({
            data: {
                discord_id: id,
                discord_name: old_db[id].name,
                coins: old_db[id].amount
            }
        })
    } else {
        await prisma.user.update({
            where: {
                discord_id: id
            },
            data: {
                discord_name: old_db[id].name,
                coins: old_db[id].amount
            }
        })
    }
})