const User = require('../models/UserModels');

exports.verifyUser = async (req, res, next) => {
    //untuk mengecek session
    if (!req.session.userId) {
        return res.status(401).json({ msg: "mohon login ke akun anda" })
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak di temukan' })
    req.userId = user.id;
    req.role = user.role;
    next();
}

exports.adminOnly = async (req, res, next) => {

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak di temukan' })
    if (user.role !== "admin") return res.status(403).json({ msg: "akses terlarang" })
    req.userId = user.id;
    req.role = user.role;
    next();
}