const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const auth = async (ctx,next)=>{
    const {authorization} = ctx.request.header
    const token = authorization.replace('Bearer ','')
    // console.log(token);
   try {
    //user包含payload信息
    const user = jwt.verify(token,JWT_SECRET)
    // console.log(user);
    ctx.state.user = user
   } catch (error) {
    switch(error.name){
        case 'TokenExpiredError':
            console.error('token已过期',error);
            ctx.body = {
                code: '10101',
                message: 'token过期',
                result:''
            }
            return 
        case 'jsonWebTokenError':
            console.error('无效token',error);
            ctx.body = {
                code: '10102',
                message: '无效的token',
                result:''
            }
            return
    }
   }
    await next()
}
module.exports = {auth}