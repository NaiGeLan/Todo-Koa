const bcrypt = require('bcryptjs')

const {getUserInfo} = require("../service/user.service")

const userValidator = async (ctx,next)=>{
    const { user_name,password} = ctx.request.body
     //合法性
     if(!user_name||!password){
        console.error('用户名或密码为空',ctx.request.body);
        ctx.status = 400
        ctx.body = {
            code: "10001",
            message: " 用户名或密码为空",
            result: "",
        }
        return
      }
      await next()

}
const verifyUser = async (ctx,next)=>{
    const {user_name} = ctx.request.body
      //合理性
      ctx.status = 409
      if(await getUserInfo({user_name})){
        ctx.body = {
            code: "10002",
            message: "用户已经存在",
            result: "",
        }
        return
       }
       await next()
}
const cryptPassword =async (ctx,next)=>{
    const {password} = ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    //hash保存的是密文
    const hash = bcrypt.hashSync(password,salt)

    ctx.request.body.password = hash

    await next()
}

const verifyLogin = async (ctx,next)=>{
    //判断用户是否存在（不存在报错）
    const {user_name,password} = ctx.request.body
    try {
        const res = await getUserInfo({user_name})
        if(!res){
            console.error('用户名不存在',{user_name});
            ctx.status = 409
            ctx.body = {
                code: "10004",
                message: "用户不存在",
                result: "",
            }
            return
        }
        //密码是否匹配（不匹配报错）
        if(!bcrypt.compareSync(password,res.password)){
            ctx.status = 500
            ctx.body = {
                code: "10006",
                message: "密码错误",
                result: "",
            }
            return
        }
        await next()
    }catch(err){
        console.error(err);
        ctx.status = 500
        ctx.body = {
            code: "10005",
            message: "用户登录失败",
            result: "",
        }
        return
    }
    
    

}

// const changePassword = async(ctx,next)=>{
//     //获取数据
//     const id = ctx.state.user.id
//     const password = ctx.request.body.password
//     console.log(id,password);
//     //操作数据库

//     ctx.body = 'change Password'
// }

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
    // changePassword
}
