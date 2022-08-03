class GoodsController {
    async upload(ctx,next) {
        ctx.body = "上传文件"
    }
}
module.exports = new GoodsController()