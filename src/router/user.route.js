const Router = require('koa-router')

const router = new Router({prefix: '/users'})
const {userValidator,verifyUser,cryptPassword,verifyLogin} = require('../middleware/user.middleware')

const {register} = require('../controller/user.controller')

const {login} = require('../controller/user.controller')

const {changePassword} = require('../controller/user.controller')

const {auth} = require('../middleware/auth.middleware')

//注册接口
router.post('/register',userValidator,verifyUser,cryptPassword,register)
//登录接口
router.post('/login',userValidator,verifyLogin,login)
//修改密码
router.patch('/',auth,cryptPassword,changePassword)

module.exports = router