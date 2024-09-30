const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jwt")
const validator = require("validator")

const createToken = (_id) => {
  const jwtKey = process.env.JWT_secret_key
  return jwt.sign({ _id }, jwtKey)

}
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await userModel.findOne({ email })

    if (!user) return res.status(400).json("User Already Exists");
    if (!name || !email || !password) return res.status(400).json("Incomplete data");

    if (!validator.isEmail(email)) return res.status(400).json("Email is not valid");
    if (!validator.isStrongPassword(password)) return res.status(400).json("Password is weak");


    user = new userModel({ name, email, password })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();
    const token = createToken(user._id)

    res.status(200).json({ _id: user._id, name })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)

  }
}
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })

    if (!user) return res.status(400).json("Invalid Email or Password");

    isValidPassowrd = await bcrypt.compare(password, user.password)
    if (!isValidPassowrd) return res.status(400).json("Incorrect Password");

    const token = createToken(user._id)

    res.status(200).json({ _id: user._id, name: user.name, email, token })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)

  }
}

const getUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userModel.findById(id)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)

  }
}
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)

  }
}



module.exports = { registerUser, loginUser, getUser, getUsers }