const Product = require("../models/ProductModel.js");
const Users = require("../models/UserModels.js");
const { Op } = require("sequelize");


exports.getProducts = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Product.findAll({
                //atribut untuk memperlihatkan outputnya
                attributes: ['uuid', 'name', 'price'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    //hatihati dalam userid harus sama dengan colomnya ya
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}

exports.getProductsById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "data tidak di temukan" })
        let response;
        if (req.role === "admin") {
            response = await Product.findOne({
                //atribut untuk memperlihatkan outputnya
                attributes: ['uuid', 'name', 'price'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    //hatihati dalam userid harus sama dengan colomnya ya
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}

exports.createProducts = async (req, res) => {
    const { name, price } = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            userId: req.userId
        })
        res.status(201).json({ msg: "produk di buat sukses" })
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}

exports.updateProducts = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "data tidak di temukan" })
        const { name, price } = req.body;
        if (req.role === "admin") {
            await Product.update({ name, price }, {
                where: {
                    id: product.id
                }
            })
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "akses terlarang" })
            await Product.update({ name, price }, {
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            })
        }
        res.status(200).json({ msg: "Product updatad successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "data tidak di temukan" })
        const { name, price } = req.body;
        if (req.role === "admin") {
            await Product.destroy({
                where: {
                    id: product.id
                }
            })
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "akses terlarang" })
            await Product.destroy({
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            })
        }
        res.status(200).json({ msg: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}