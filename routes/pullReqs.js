const express = require('express')
const router = express.Router()
const PullReq = require('../models/pullReq')

// Getting all
router.get('/', async (req, res) => {
    try {
        const pullReqs = await PullReq.find()
        res.json(pullReqs)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getPullReq, (req, res) => {
    res.json(res.pullReq)
})

// Creating One
router.post('/', async (req, res) => {
    const pullReq = new PullReq()
    try {
        const newPullReq = await pullReq.save()
        res.status(201).json(newPullReq)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getPullReq, async (req, res) => {
    if (req.body.name != null) {
        res.pullReq.name =req.body.name
    }
    if (req.body.subToChannel != null) {
        res.pullReq.subToChannel =req.body.subToChannel
    }
    try {
        const updatePullReq = await res.pullReq.save()
        res.json(updatePullReq)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete One
router.delete('/:id', getPullReq, async (req, res) => {
    try{
        await res.pullReq.remove()
        res.json({ message: 'deleted req' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getPullReq(req, res, next) {
    let pullReq
    try {
        pullReq = await PullReq.findById(req.params.id)
        if(pullReq == null) {
            return res.status(404).json({ message: 'Cannot Find Req' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.pullReq = pullReq
    next()
}

module.exports = router