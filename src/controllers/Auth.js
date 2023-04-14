const User = require('../models/UserModels')
const argon2 = require('argon2');

exports.login = async (req, res) => {
    //kenapa gak masang atribut di bagian sini karena kita membutuhkan paswaordnya
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak di temukan' })
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: 'password salah' })
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ uuid, name, email, role });
}

exports.me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "mohon login ke akun anda" })
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak di temukan' })
    res.status(200).json(user)
}

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "tidak dapat logout" });
        res.status(200).json({ msg: 'anda telah logout' })
    })
}