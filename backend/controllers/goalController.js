const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//description: get goals
// route: GET /api/goals
// access: Private
const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    if(!req.body.text){
        res.status(400).json({message: 'please add text field'})
    }
    res.status(200).json(goals)
})


//description: set goals
// route: POST /api/goals/:id
const postGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
  
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    })
  
    res.status(200).json(goal)
  })

//description: update goals
// route: PUT /api/goals
// access: Private
const putGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
  
    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }

//check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateGoal)
})


//description: delete goals
// route: DELETE /api/goals/:id
// access: Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goals) {
        res.status(400)
        throw new Error('Goal not found')
    }

    
    //check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }
        //make sure the logged in user matches the goal user
        if(goal.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
    await goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoal,
    putGoal,
    postGoal,
    deleteGoal
}