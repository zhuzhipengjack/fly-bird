(function (fb) {
    var Bird = function (ctx, birdImg) {
        this.ctx = ctx;
        this.birdImg = birdImg;
        /*起始位置*/
        this.x = 100;
        this.y = 100;
        /*设置小鸟尺寸*/
        this.birdWidth = this.birdImg.width / 3;
        this.birdHeight = this.birdImg.height;
        /*做动画的索引*/
        this.index = 0;
        /*运动相关参数*/
        this.acc = 0.0005;
        this.v0 = 0;
        this.startTime = Date.now();
        /*坠落相关参数*/
        this.maxSpeed = 0.5;
        this.maxAngle = Math.PI/4;

        this.initFly();
    }
    Bird.prototype.draw = function () {
        /*保存正常的坐标*/
        this.ctx.save();

        /*2.自由落体*/
        var currentTime = Date.now();
        var deltaTime = currentTime - this.startTime;
        //记录当前时间 下一次开始时间
        this.startTime = currentTime;
        /*路程的计算 下落高度*/
        var h = this.v0 * deltaTime + this.acc * deltaTime * deltaTime / 2;
        this.y += h;
        //记录当前速度 下一次起始速度
        this.v0 += this.acc * deltaTime;
        this.ctx.translate(this.x, this.y);
        /*3.坠落旋转*/
        var angle = this.v0/this.maxSpeed * this.maxAngle;
        if(angle > this.maxAngle){
            angle = this.maxAngle;
        }
        this.ctx.rotate(angle);
        /*1.绘制动画*/
        this.ctx.drawImage(
            this.birdImg,
            this.index * this.birdWidth,
            0,
            this.birdWidth,
            this.birdHeight,
            -this.birdWidth / 2,
            -this.birdHeight / 2,
            this.birdWidth,
            this.birdHeight
        );
        this.index++;
        if (this.index > 2) {
            this.index = 0;
        }

        /*恢复正常的坐标*/
        this.ctx.restore();
    }
    /*初始化飞行功能*/
    Bird.prototype.initFly = function () {
        var that = this;
        this.ctx.canvas.onclick = function () {
            that.v0 = - 0.3;
        }
    }
    fb.Bird = Bird;
})(FB);