/**
 * Created by Administrator on 2017/4/5.
 */
window.onload=function(){
//    ��໬��
    leftSwipe();
//    �Ҳ໬��
    rightSwipe();
};
var leftSwipe=function(){
    /*
    * 1.���»��� (touch�¼� λ��)*/
    var parentBox=document.querySelector('.cate_left');   //������
    var childBox=parentBox.querySelector('ul');
    var startY=0;  //��ʼ��λ��
    //  ֵ��������number����    ���ǵ�ǰ������Χ�ڵ�ȫ�ֱ���
    var distanceY=0;

    //����ĺ��ĵ�
    var currentY=0;

    childBox.addEventListener('touchstart',function(e){
        startY= e.touches[0].clientY;
    })

    childBox.addEventListener('touchmove',function(e){
        var moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        console.log(distanceY);
        //��Ҫȥ����λ��λ��
        var translateY=currentY+distanceY;

        childBox.style.transform='translateY('+translateY+'px)';
        childBox.style.webkitTransform='translateY('+translateY+'px)';
    })

    childBox.addEventListener('touchend',function(e){
        /*�������֮���¼λ��*/
        currentY=currentY+distanceY;  //?
    })
}
var iscrollLeft=function(){
    //ʹ��iscroll
    new IScroll(document.querySelector('.cate_left'));
}

var rightSwipe =function(){
    /*
    * ʹ��iscroll
    * �ڹȸ��ģ������ʧЧ
    * ͨ����������  ʵ�����ҹ���*/
    new IScroll(document.querySelector('.cate_right'),{
        scrollX:true,
        scrollY:false
    })
}