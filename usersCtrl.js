const userData = require('./userData.json')

module.exports = {
    getUsers(req, res) {
        const { age, email, favorites } = req.query
        if (age) {
            const underReqAge = userData.filter(e => {
                return e.age < age
            })
            return res.status(200).send(underReqAge)
        }
        if (email) {
            const usersEmail = userData.filter(e => {
                return e.email === email
            })
            return res.status(200).send(usersEmail)
        }
        if (favorites) {
            let favArr = []
            for(let i = 0; i < userData.length; i++) {
                let user = userData[i].favorites.filter(e => {
                    return e === favorites
                })
                if (user.length > 0) {
                    favArr.push(userData[i])
                }
            }
            return res.status(200).send(favArr)
        }
        res.status(200).send(userData)
    },
    getUserById: (req, res) => {
        let {userId} = req.params
        const user = userData.filter(el => {
            return el.id === +userId
        })
        if (user.length > 0) {
            return res.status(200).send(user[0])
        } else {
            return res.status(404).send({ message: "User not found." })

        }
    },
    getAdmin: (req, res) => {
        const admins = userData.filter(e => {
            return e.type === 'admin'
        })
         res.status(200).send(admins)
    },
    getNonAdmin: (req, res) => {
        const nonAdmins = userData.filter(e => {
            return e.type !== 'admin'
        })
         res.status(200).send(nonAdmins)
    },
    getByType: (req, res) => {
        const {userType} = req.params
        const matchType = userData.filter(e => {
            return e.type === userType
        })
        res.status(200).send(matchType)
    },
    updateUser: (req, res, next) => {
        const {userId} = req.params
        const updatedArr = userData.filter(e=> {
            return e.id !== +userId
        })
        const updatedUser = req.body
        updatedUser['id'] = +userId
            updatedArr.unshift(updatedUser)
            res.status(200).send(updatedArr)
    },
    // createUser: (req, res) => {
    //     let newId = 0
    //     for(let i = 0; i <= userData.length; i ++){
    //         if(userData[i].id > newId) {
    //             newId = userData[i].id
    //         }
    //     }
    //     newId++
    //     const newUser = req.body
    //     newUser['id'] = newId
    //     userData.unshift(newUser)
    //     res.status(200).send(userData)
    // },
    createUser: (req,res) => {
        let newid = 0
        for(let i = 0; i < userData.length; i ++){
            if(userData[i].id > newid) {
                newid = userData[i].id
                console.log('userData[i].id:', userData[i].id);
            }
        }
        newid++
        console.log('newId after loop:', newid);
        const newUser = req.body
        console.log('new user from body:', newUser);
        console.log('new Id to be used:', newid);
        newUser['id'] = newid
        userData.unshift(newUser)
        res.status(200).send(userData)
        console.log('last user:', userData[userData.length-1]);
    },
    deleteUser: (req, res) => {
        const {userId} = req.params
        userData.filter((e, i) => {
            if(e.id === +userId) {
                userData.splice(i, 1)
            } 
        })
        res.status(200).send(userData)
    }
}   