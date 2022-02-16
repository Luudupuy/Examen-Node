const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = (User) => {
  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);
    res.json(response);
  };
  
  const getUserById = async (req, res) => {
    try {
      const { params } = req;
      const response = await User.findById(params.userId);
      res.json(response);
    }catch (err) {
      res.status(500).json('Error');
    }
  };
  
  const getUserByUserName = async (req, res) => {
    const {params} = req;
    const user = await User.findOne({"userName": params.userName});
    if(user===null)
    {
      res.json("User is not found");
    }
    else{
      res.json(user);
    }
  };
  
  const postUser = async (req, res) => {
    try {
      const user = new User(req.body);
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      res.json(user);
    } catch (err) {
      if (err.name === 'ValidationError') {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return res.status(400).send(errors);
      }
      res.status(500).send('Error');
    }
  };

  const putUserById = async (req, res) => {
    try {
      const { body } = req;
      const response = await User.updateOne(
        {
          _id: req.params.userId
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            password: await bcrypt.hash(body.password, 10),
            email: body.email,
            address: body.address,
            phone: body.phone,
          }
        }
      );
      res.json(response);
    }catch (err) {
      if (err.name === 'ValidationError') {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return res.status(400).send(errors);
      }
      res.status(500).send('Error');
    }
  };

  const deleteUserById = async (req, res) => {
    try {
      const id = req.params.userId;
      await User.findByIdAndDelete(id);
      res.status(202).json('User has been deleted.');
    } catch (err) {
      res.status(500).json('Error');
    }
  };

  const login = async (req, res) => {
    const { body } = req;
    var response = await User.findOne({ userName: body.userName });
    if (await bcrypt.compare(body.password, response.password)){
      const savedUser = response;
      const token = generateToken(savedUser);
      response = {message:"Ok", token};
    }
    else{
      res.status(401).json('Invalid credentials')};
  }
  
   const generateToken = savedUser =>{
    const tokenPayload={
      userName:savedUser.userName,
      firstName:savedUser.firstName,
      lastName:savedUser.lastName
    }
    return jwt.sign(tokenPayload,'secret');
  }

  return { getUsers, postUser, putUserById, deleteUserById, getUserByUserName, getUserById, login };
}

module.exports = userController;