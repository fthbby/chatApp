const User = require('../model/user')
const bcrypt = require('bcrypt')

module.exports.register = async(req, res, next) => {

try{
    console.log('hello', req.body)

    const {username, email, password} = req.body

    const usernameCheck = await User.findOne({username})

    if (usernameCheck){
        return res.json({msg: "USERNAME already in use", status:false})
    }

    const emailCheck = await User.findOne({email})
    if (emailCheck) return res.json({msg: 'email already in use', status:false})

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, username, password: hashedPassword
    });

    delete user.password
    return res.json({status:true, user})
}
catch(err){
    console.log('error at register controller :', err)
}
}
