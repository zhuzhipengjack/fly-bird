(function (fb) {
    var Pipe = function (ctx,topImg,botImg,x) {
        this.ctx = ctx;
        this.topImg = topImg;
        this.botImg = botImg;
        /*上下管道的距离*/
        this.space = 200;
        /*管道尺寸*/
        this.pipeWidth = this.topImg.width;
        this.pipeHeight = this.topImg.height;
        /*管道定位*/
        /*空出运行路线*/
        this.x = x + 400;
        /*速度*/
        this.speed = 3;
        /*初始化Y坐标  定位管道的*/
        this.initY();
    }
    Pipe.prototype.draw = function () {
        /*绘制管道*/
        this.ctx.drawImage(this.topImg,this.x,this.topY);
        this.ctx.drawImage(this.botImg,this.x,this.botY);
        /*绘制和管道一样大小的路径*/
        this.ctx.rect(this.x,this.topY,this.pipeWidth,this.pipeHeight);
        this.ctx.rect(this.x,this.botY,this.pipeWidth,this.pipeHeight);
        //this.ctx.stroke();


        this.x -= this.speed;
        /*衔接*/
        if(this.x < - this.topImg.width){
            this.x += 6*3*this.topImg.width;
        }
    }
    Pipe.prototype.initY = function () {
        var randomH = 80 * Math.random();
        var minH = 140;
        var topH = minH + randomH; /*140-220*/
        /*上面图片定位 Y轴*/
        this.topY = -this.pipeHeight + topH;
        /*下面图片定位 Y轴*/
        this.botY = topH + this.space;
    }
    fb.Pipe = Pipe;
})(FB);