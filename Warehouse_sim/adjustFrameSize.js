'use strict'

p5.prototype.adjustFrameSize = function(){
    if(frameElement){
        frameElement.height = frameElement.frameBorder = 0;
        frameElement.height = this.getDocHeight() + 'px';
        frameElement.width = this.getDocWidth() +'px';
    }
};

p5.prototype.getDocWidth = function(){
    return Math.max(
        document.body.scrollWidth,document.documentElement.scrollWidth,
        document.body.offsetWidth,document.documentElement.offsetWidth,
        document.body.clientWidth,document.documentElement.clientWidth,

    )
};

p5.prototype.getDocHeight = function(){
    return Math.max(
        document.body.scrollHeight,document.documentElement.scrollHeight,
        document.body.offsetHeight,document.documentElement.offsetHeight,
        document.body.clientHeight,document.documentElement.clientHeight,

    )
}
