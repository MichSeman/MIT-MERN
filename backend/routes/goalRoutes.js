const express    = require('express');
const router     = express.Router();


const {protect} = require('../middleware/authMiddleware')

router.get('/', (req, res, protect) => {
    res.status(200).json({message: 'get goals'})
})

router.post('/', (req,res, protect) => {
    res.status(200).json({message: 'set goals'})
})

router.put('/:id', (req,res, protect) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
})

router.delete('/:id', (req,res, protect) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
})

module.exports = router