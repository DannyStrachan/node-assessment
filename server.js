require('dotenv').config()
const express = require('express')
const usersCtrl = require('./usersCtrl')
const {SERVER_PORT} = process.env || 3000
const app = express()

app.use(express.json())

app.get('/api/user', usersCtrl.getUsers)
app.get('/api/user/:userId', usersCtrl.getUserById)
app.get('/api/admin', usersCtrl.getAdmin)
app.get('/api/nonadmin', usersCtrl.getNonAdmin)
app.get('/api/type/:userType', usersCtrl.getByType)
app.put('/api/user/:userId', usersCtrl.updateUser)
app.post('/api/user', usersCtrl.createUser)
app.delete('/api/user/:userId', usersCtrl.deleteUser)

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}`))