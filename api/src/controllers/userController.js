const userServices = require('../services/userServices');


exports.getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userServices.getUserInfo(userId);
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

exports.createUser = async (req, res) => {
    const user = req.body
    
    try {
        const userCreated = await userServices.createUser(user);
        res.status(201).send({msg: 'User created successfully!', data: userCreated});
    } catch (err) {
        res.status(409).send(err.message)
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    try {
        const userDeleted = await userServices.deleteUser(userId)
        res.status(200).send({message: userDeleted})
    } catch (err) {
        res.status(404).send(err.message)
    }
}