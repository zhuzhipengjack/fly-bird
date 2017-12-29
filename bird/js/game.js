(function (fb) {
    var Game = function () {
        /*获取画布*/
        this.ctx = document.querySelector('canvas').getContext('2d');
        /*定义命令*/
        this.running = true;
    }
    Game.prototype.init = function () {
        this.gameStart();
    }
    Game.prototype.gameStart = function () {
        var that = this;
        /*必须加载资源*/
        var loadSource = new fb.loadSource();
        loadSource.load(function (imgList) {
            /*完成游戏的开始*/
            var objectList = [];
            /*初始化天空对象*/
            var skyImg = imgList['sky'];
            for (var i = 0; i < 2; i++) {
                var sky = new fb.Sky(that.ctx,skyImg,i*that.ctx.canvas.width);
                objectList.push(sky);
            }
            /*初始化管道对象*/
            var pipeTopImg = imgList['pipe2'];
            var pipeBotImg = imgList['pipe1'];
            for (var i = 0; i < 6; i++) {
                var pipe = new fb.Pipe(that.ctx,pipeTopImg,pipeBotImg,i*3*pipeTopImg.width);
                objectList.push(pipe);
            }
            /*初始化陆地*/
            var landImg = imgList['land'];
            for (var i = 0; i < 4; i++) {
                var land = new fb.Land(that.ctx,landImg,i*landImg.width);
                objectList.push(land);
            }
            /*初始化鸟*/
            var bird = new fb.Bird(that.ctx,imgList['birds']);
            objectList.push(bird);

            var animation = function () {
                /*清空画布*/
                that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
                /*开启新路径*/
                that.ctx.beginPath();

                /*天空绘制*/
                /*管道绘制*/
                /*陆地绘制*/
                /*小鸟绘制*/
                objectList.forEach(function (item) {
                    item.draw();
                })

                /*游戏规则*/
                /*1.碰到地面  game over */
                if(bird.y >= that.ctx.canvas.height - landImg.height - 20){
                    /*结束游戏  停止动画*/
                    that.gameOver();
                }
                /*2.碰到天花板  game over */
                if(bird.y <= 10){
                    that.gameOver();
                }
                /*3.碰到管道  game over */
                if(that.ctx.isPointInPath(bird.x,bird.y)){
                    that.gameOver();
                }

                if(that.running){
                    requestAnimationFrame(animation);
                }
            }
            animation();
        });

    }
    Game.prototype.gameOver = function () {
        this.running = false;
    }
    fb.Game = Game;
})(FB);