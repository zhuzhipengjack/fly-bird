(function (fb) {
    var Sky = function (ctx,skyImg,x) {
        this.ctx = ctx;
        /*确定绘制的位置*/
        this.x = x || 0;
        this.y = 0;
        /*图片*/
        this.img = skyImg;
        /*速度*/
        this.speed = 3;
    };
    Sky.prototype.draw = function () {
        this.ctx.drawImage(this.img,this.x,this.y);
        this.x -= this.speed;
        if(this.x < - this.ctx.canvas.width){
            /*不能直接定位在800位置*/
            this.x += 2 * this.ctx.canvas.width;
        }
    }
    fb.Sky = Sky;
})(FB);