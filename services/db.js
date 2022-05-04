const mongoose=require('mongoose')
mongoose.connect('mongoose:/localhost:27017/bankserver',{
    useNewUrlParser:true
})
const User=mongoose.model('user',{
    acno:Number,
    uname:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}