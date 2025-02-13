const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

app.use(express.json())


// Get all users
app.get('/evtg', (req, res) => {
    prisma.users.findMany().then(data => res.json(data));
})

// Gett individual user with id
app.get('/:user', ((req, res) => {
    const userProvidedId = req.params.user;

    prisma.users.findFirst({ where: { id: Number(userProvidedId) } }).then(data => { res.json(data) });
}))

// Post data in database.
app.post('/post', (async (req, res) => {
    const { name, city } = req.body;
    console.log(name, "'s details added");
    await prisma.users.create({
        data: { name, city }
    })
    res.send("Details-Added to Users Database")
}))


// Update the data
app.put('/:updateId', (req, res) => {
    const updateId = req.params.updateId;
    const { name, city } = req.body;

    prisma.users.update({ where: { id: Number(updateId) }, data: { name, city } }).then(res.send('Details updated'))
    console.log(name, "'s details updated");
})

// Delete the data
app.delete('/:deleteId', async (req, res) => {
    const deleteId = req.params.deleteId;
    prisma.users.delete({ where: { id: Number(deleteId) } }).then(res.send('user-deleted'))
})

app.listen(2002, () => {
    console.log('Server Started Successfully')
})