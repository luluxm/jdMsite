/**
 * Created by Administrator on 2017/4/5.
 */
window.onload=function(){
//    左侧滑动
    leftSwipe();
//    右侧滑动
    rightSwipe();
};
var leftSwipe=function(){
    /*
    * 1.上下滑动 (touch事件 位移)*/
    var parentBox=document.querySelector('.cate_left');   //父容器
    var childBox=parentBox.querySelector('ul');
    var startY=0;  //开始的位置
    //  值的类型是number类型    还是当前函数范围内的全局变量
    var distanceY=0;

    //程序的核心点
    var currentY=0;

    childBox.addEventListener('touchstart',function(e){
        startY= e.touches[0].clientY;
    })

    childBox.addEventListener('touchmove',function(e){
        var moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        console.log(distanceY);
        //将要去做定位的位置
        var translateY=currentY+distanceY;

        childBox.style.transform='translateY('+translateY+'px)';
        childBox.style.webkitTransform='translateY('+translateY+'px)';
    })

    childBox.addEventListener('touchend',function(e){
        /*滑动完成之后记录位置*/
        currentY=currentY+distanceY;  //?
    })
}
var iscrollLeft=function(){
    //使用iscroll
    new IScroll(document.querySelector('.cate_left'));
}

var rightSwipe =function(){
    /*
    * 使用iscroll
    * 在谷歌的模拟器下失效
    * 通过参数配置  实现左右滚动*/
    new IScroll(document.querySelector('.cate_right'),{
        scrollX:true,
        scrollY:false
    })
}