const router = require('express').Router()
const rootofeqModel = require('../models/rootofeq')
const jwt = require('jsonwebtoken')

router.post('/auth_datatoken', async (req, res) => {
    try {
        const jwtResponse = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY)
        return res.status(200).send({ token: jwtResponse })
    } catch (error) {
        return res.status(404).send('token_exp')
    }
})

router.get('/randomfx/:title', async (req, res) => {
    const getRootofeq = await rootofeqModel.aggregate(
        [
            { $match: { title: req.params.title } },
            { $sample: { size: 1 } }
        ]
    )
    if(getRootofeq.length > 0) {
        const findReal = await rootofeqModel.findOne({
            _id: getRootofeq[0]._id
        })

        if(findReal){
            const token = findReal.generateAuthToken()
            return res.status(200).send({ token: token, data: findReal })
        }
    }
})

router.post('/savefx', async (req, res) => {
    const { fx, latex } = req.body
    const rootofChecking = await rootofeqModel.findOne({
        fx: fx,
        latex: latex
    })

    if(rootofChecking) res.status(409).send({ message: 'สมการนี้ถูกบันทึกอยู่ประวัติเรียบร้อยแล้ว' })
    else {
        const result = await rootofeqModel.create({
            ...req.body
        })
        return res.status(200).send(result)
    }
})

module.exports = router