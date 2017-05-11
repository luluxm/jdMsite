/**
 * Created by Administrator on 2017/4/1.
 */
window.onload = function () {
//    ��ʼ��ҳ�湦��
//    ����
    search();
//    �ֲ�ͼ
    banner();
//    ����ʱ
    downTime();
}
var search = function () {
    /*
     * 1.ҳ���ʼ����ʱ��  ���붥����0�ľ����ʱ��  ͸������0
     * 2.��ҳ�������ʱ��  ����ҳ����붥���ľ�����  ͸���ȱ��
     * 3.�������ľ��볬�����ֲ�ͼ�ľ����ʱ�� ���ֲ���
     * */
    //��ȡDOMԪ��
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    //���뷶Χ
    var height = banner.offsetHeight;

    //�����¼�
    window.onscroll = function () {
        //    ��ǰҳ������ľ���
        var top = document.body.scrollTop;//�ȸ�
        var opacity = 0;
        if (top > height) {
            //    �������ľ��볬�����ֲ�ͼ�ľ����ʱ�򱣳ֲ���
            opacity = 0.85;
        } else {
            /*2.��ҳ�������ʱ��  ����ҳ����붥���ľ�����  ͸���ȱ��*/
            opacity = 0.85 * (top / height)
        }
        search.style.background = 'rgba(216,80,92,' + opacity + ')'
    }
}

var banner = function () {
    /*
     *
     1.�޷����&�޷컬�� (��ʱ�� ���� λ��)
     2.����� ��Ӧ�ı�(�ı䵱ǰ��ʽ )
     3.���Ի���(touch�¼� ��������������ı���� λ��)
     4. ���������벻����ʱ�� ������ȥ (���ɼ�λ��)
     5.���������빻�˵�ʱ�� ��ת ��һ�Ż�����һ��  (�жϷ��� ���� λ��)
     */

    /*��ȡ��Ҫ������DOMԪ��*/
    var banner = document.querySelector(".jd_banner");
    /*�ֲ�ͼ�Ŀ��*/
    var width = banner.offsetWidth;
    /*ͼƬ����*/
    //querySelector �õ�ѡ��������css���е���Чѡ����
    //ul:first ��JQ��װ��ѡ���� css��������Ч��
    var imageBox = banner.querySelector("ul:first-child");
    //������
    var pointBox = banner.querySelector("ul:last-child");
    //    ���еĵ�
    var points = pointBox.querySelectorAll("li");
    //�Ἰ�����÷���
    //�ӹ���
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s'; //����
    }
    //�����
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';/*����*/
    }
    //����λ��
    var setTranslateX = function(translateX){
        imageBox.style.transform = 'translateX('+translateX+'px)';/*���ֲ�ͼ���*/
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';/*����*/
    }


    //1.�޷����&�޷컬�� (��ʱ�� ���� λ��)
    var index = 1; //Ĭ������
    var timer = setInterval(function () {
        index++;
        /*����*/
        addTransition();
        /*λ��*/
        setTranslateX(-index * width);
    }, 3000);

    //    ��ô�������ɽ������ʱ��� ���ɽ����¼�
    imageBox.addEventListener('transitionend', function () {
        //�޷����
        if (index >= 9) {
            //˲�䶨λ��һ��
            index = 1;
            //    �������
            removeTransition();
            //    ��λ
            setTranslateX(-index * width);
        }
        //�޷컬��
        else if (index <= 0) {
            index = 8;
            //    �������
            removeTransition();
            //    ��λ
            setTranslateX(-index * width);
        }

        //    ����
        //    indexȡֵ��Χ 1-8  ��Ӧ�ĵ�0-7
        setPoint();
    });

    /*2.����Ӷ�Ӧ�ı� ���ı䵱ǰ��ʽ��*/
    var setPoint = function () {
        //    index1-8
        //ȥ������now����ʽ
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        /*����Ӧ�ļ���*/
        points[index - 1].classList.add('now');
    }

    /*3.���Ի��� ��touch�¼�  ��������������ı����  λ�ƣ�*/

    var startX = 0;/*��¼��ʼ��X����*/
    var distanceX = 0;//��¼����������ĸı��
    //Ϊ���Ͻ��ж�
    var isMove = false;

    imageBox.addEventListener('touchstart', function (e) {
        /*�����ʱ��*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /* distanceX ����0��ʱ��  ���һ���  */
        /* distanceX С��0��ʱ��  ���󻬶�  */

        /*����*/
        /*���ڵ�ǰ��λ��*/
        /*���㽫Ҫȥ����λ*/
        var translateX = -index * width + distanceX;
        /*�������*/
        removeTransition();
        /*����λ*/
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        //����ʱ�����֮�����жϵ�ǰ�����ľ���
        //��һ����Χ �����������֮һ�л�ͼƬ ��֮������ȥ��λ��ȥ
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                //4. ���������벻����ʱ�� ������ȥ (���ɼ�λ��)
                //    ����
                addTransition();
                //    λ��
                setTranslateX(-index * width);
            } else {
                //5.���������빻�˵�ʱ�� ��ת ��һ�Ż�����һ��  (�жϷ��� ���� λ��)
                if (distanceX > 0) {
                    //���һ�  ��һ��
                    index--;
                } else {
                    //��zuo��  xiaһ��
                    index++;
                }
                //�ӹ���
                addTransition();
                //    ��λ
                setTranslateX(-index * width);
            }
        }

        //    �Ӷ�ʱ��
        clearInterval(timer); //�Ͻ�����  ��ֻ֤��һ��
        timer = setInterval(function () {
            index++;
            /*����*/
            addTransition();
            /*λ��*/
            setTranslateX(-index * width);
        }, 3000);

        //    ���ò���
        startX = 0;
        distanceX = 0;
        isMove = false;
    });


}


var downTime = function () {
    /*
     * 1.ģ�⵹��ʱ��ʱ�� ��11Сʱ
     * 2.���ö�ʱ�� 1��һ�� ����չʾ�¼�*/
    var time = 60 * 60 * 11;
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');
    var timer = setInterval(function () {
        time--;
        //   ��ʽ��ʱ��
        var h = Math.floor(time / 3600); //Сʱ
        var m = Math.floor(time % 3600 / 60) //����
        var s = time % 60;  //��

        //    ����ʱ��
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        //����ʱ��
        clearInterval(timer);
    }, 1000)
}











