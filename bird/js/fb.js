(function (window) {
    window.FB = {};
    var loadSource = function () {
        this.paths = ['birds','land','pipe1','pipe2','sky'];
        this.dir = 'images/';
        this.fix = '.png';
    }
    loadSource.prototype.load = function (callback) {
        var that = this;
        var imgTotal = that.paths.length;
        var loadedNum = 0;
        var imgList = {};
        this.paths.forEach(function (item) {
            var img = new Image()
            img.onload = function () {
                loadedNum ++;
                imgList[item] = img;
                if(loadedNum == imgTotal){
                    /*开始游戏了完成业务*/
                    callback && callback(imgList);
                }
            }
            img.src = that.dir + item + that.fix;
        });
    }
    FB.loadSource = loadSource;
})(window)
