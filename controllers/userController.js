const { log, error } = require("console");
const Users = require("../models/userSchema.js")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const dotenv = require('dotenv').config();

const register = async(req, res)=>{
 const userData = req.body;
Users.findOne({email:userData.email})
.then(async(user)=>{
   if(user){
    res.json({message: "email already exist"})
   }else{
    bcrypt.hash(userData.password, 10)
    .then(async(hash)=>{
        const saveUser = await Users.create({
            name: userData.name, email: userData.email, password: hash, address: userData.address, phonenumber: userData.phonenumber
        });
        res.json({message:"User added successfully", data: saveUser})
    }).catch((err)=>{
        res.send(err)
    })
   
   }
}).catch((error)=>{
    res.send(`${error}`)
})
}

const login = async(req, res)=>{
    const loginData = req.body;
    Users.findOne({email: loginData.email})
    .then((valUser)=>{
     if(!valUser){
        res.statu(400).json({message: "User not available, please register yourself"})
     }else{
        bcrypt.compare(loginData.password, valUser.password, (err, data)=>{
            if(err){
                res.statu(400).json({message: `${err}`})
              }else{
                const token = jwt.sign({email: loginData.email}, process.env.jwt_secretKey, {expiresIn: '1d'})
                res.header('auth-token', token);
                res.status(200).json({message: "Logged in successfuly", data:token})  
            }
        })
     }
    }).catch((error)=>{
        res.send(`${error}`)
    })
}

const getAllUser = async(req, res)=>{
    try{
        const users = await Users.find({});
        res.json({message:"ALl User data", count:users.length, data: users})
    
    }catch{
        res.json(`${error}`)
    }
}

const getUserById = async(req, res)=>{
    try{
    const getUserById = await Users.findById({_id: req.body._id}, {password: 0});
    res.json({message:"get user details by Id", data: getUserById})
    }catch{
        res.json(`${error}`)
    }
}

const updateUser = async(req, res)=>{
try{
    const userData = req.body;
    const user = await Users.findByIdAndUpdate(userData.id, userData)
    if(!user){
      return res.json({message: "No such user avilable for that id"})
    }else{
      const getUpdatedData = await Users.findById(userData.id)
      return res.json({message: "Get user by Id", data: getUpdatedData})
    }

  }catch{
      return res.json({message: "err"})

  }

}

const deleteuser = async(req, res)=>{
    try{
        const userInput = req.body;
       const userId = await Users.findByIdAndDelete(userInput.id);
       return res.json({message: "User deleted successfully", data: userId})
    }catch{
       return res.json(`${error}`)

    }
}
    


module.exports = {register, login, getAllUser, getUserById, updateUser, deleteuser}