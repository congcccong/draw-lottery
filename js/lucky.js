$(function () {
    /*
     luckyNumΪÿ�γ鼸��
     luckyResultΪ�齱����ļ��ϣ����飩
     luckyNumΪ5��ôluckyResult��lengthҲΪ5
     */
    var Obj = {};
    Obj.luckyResult = [];
    Obj.luckyPrize = '';
    Obj.luckyNum = $(".select_lucky_number").val();
    /*
     һ�γ鼸�˸ı��¼�
     */
    $(".select_lucky_number").bind('change', function () {
        Obj.luckyNum = $(this).val();
    })
    /*
     ͼƬԤ����
     */
    function loadImage(arr, callback) {
        var loadImageLen = 1;
        var arrLen = arr.length;
        $('.all_number').html("/" + arrLen);
        for (var i = 0; i < arrLen; i++) {
            var img = new Image(); //����һ��Image����ʵ��ͼƬ��Ԥ����
            img.onload = function () {
                img.onload = null;
                ++loadImageLen;
                $(".current_number").html(loadImageLen);
                if (loadImageLen == arrLen) {
                    callback(img); //����ͼƬ���سɹ��ص���
                }
                ;
            }
            img.src = arr[i].image;
        }
    }

    /*
     ��3D������ʼ�����ȴ�ִ��
     personArrayΪ������������
     */
    Obj.M = $('.container').lucky({
        row: 5, //ÿ����ʾ����  ����Ϊ����
        col: 3,//ÿ����ʾ����  ����Ϊ����
        depth: 5, //�����
        iconW: 30, //ͼƬ�Ŀ�
        iconH: 30, //ͼƬ�ĸ�
        iconRadius: 8, //ͼƬ��Բ��
        data: personArray, //���ݵĵ�ַ����
    });
    /*
    ִ��ͼƬԤ���ز��رռ�����ͼ
    */
    loadImage(personArray, function (img) {
        $('.loader_file').hide();
    });
    /*
     ��Ϊajax����ִ����δ���
     ��ΪΪajax����;
     $.get('index.php',function(data){
         if(data.res == 1){
             personArray = data.data; //��Ϊ����

             //ִ��ͼƬԤ���ز��رռ�����ͼ
             loadImage(personArray, function (img) {
                $('.loader_file').hide();
             })
             Obj.M = $('.container').lucky({
             row : 7, //ÿ����ʾ����  ����Ϊ����
             col : 7, //ÿ����ʾ����  ����Ϊ����
             depth : 6, //�����
             iconW : 30, //ͼƬ�Ŀ�
             iconH : 30, //ͼƬ�ĸ�
             iconRadius : 8, //ͼƬ��Բ��
             data : personArray, //���ݵĵ�ַ����
         });
         }
     })
     */

    /*
     �н���ԱչʾЧ��
     ���뵱ǰ�н������е�����key
     */
    function showLuckyPeople(num) {
        setTimeout(function () {
            var $luckyEle = $('<img class="lucky_icon" />');
            var $userName = $('<p class="lucky_userName"></p>');
            var $fragEle = $('<div class="lucky_userInfo"></div>');
            $fragEle.append($luckyEle, $userName);
            $('.mask').append($fragEle);
            $(".mask").fadeIn(200);
            $luckyEle.attr('src', personArray[Obj.luckyResult[num]].image);
            $userName.text(personArray[Obj.luckyResult[num]].name)
            $fragEle.animate({
                'left': '50%',
                'top': '50%',
                'height': '200px',
                'width': '200px',
                'margin-left': '-100px',
                'margin-top': '-100px',
            }, 1000, function () {
                setTimeout(function () {
                    $fragEle.animate({
                        'height': '100px',
                        'width': '100px',
                        'margin-left': '100px',
                        'margin-top': '-50px',
                    }, 400, function () {
                        $(".mask").fadeOut(0);
                        $luckyEle.attr('class', 'lpl_userImage').attr('style', '');
                        $userName.attr('class', 'lpl_userName').attr('style', '');
                        $fragEle.attr('class', 'lpl_userInfo').attr('style', '');
                        $('.lpl_list.active').append($fragEle);
                    })
                }, 1000)
                personArray.splice(num, 1)
            })
        }, num * 2500)
        setTimeout(function () {
            $('.lucky_list').show();
        }, 2500)
    }

    /*
     ֹͣ��ť�¼�����
     */
    $('#stop').click(function () {
        Obj.M.stop();
        $(".container").hide();
        $(this).hide();
        var i = 0;
        for (; i < Obj.luckyResult.length; i++) {
            showLuckyPeople(i);
        }

    })
    /*
     ��ʼ��ť�¼�����
     */
    $('#open').click(function () {
        if (!(Obj.luckyNum && personArray.length)) {
            return
        }
        $('.lucky_list').hide();
        $(".container").show();
        Obj.M.open();
        //��Ϊajax����񽱽��
        //$.get('luckyNum.php',{luckyNum : Obj.luckyNum,luckyPrize:Obj.luckyPrize},function(data){
        //	  if(data.res == 1){
        //		  Obj.luckyResult = data.luckyResult;
        //        $("#stop").show(500);
        //	  }
        //})
        //ajax�񽱽������

        //��Ϊ�˹�д��񽱽��
        randomLuckyArr();
        setTimeout(function () {
            $("#stop").show(500);
        }, 1000)
        //�˹��񽱽������
    })

    /*
     ǰ��д�н������
     */
    function randomLuckyArr() {
        Obj.luckyResult = [];
        for (var i = 0; i < Obj.luckyNum && i < personArray.length; i++) {
            var random = Math.floor(Math.random() * personArray.length);
            if (Obj.luckyResult.indexOf(random) == -1) {
                Obj.luckyResult.push(random)
            } else {
                i--;
            }
        }
    }

    /*
     �л���Ʒ�����
     */
    function tabPrize() {
        var luckyDefalut = $(".lucky_prize_picture").attr('data-default');
        var index = luckyDefalut ? luckyDefalut : 1;
        tabSport(index);
        var lucky_prize_number = $('.lucky_prize_show').length;
        $('.lucky_prize_left').click(function () {
            $('.lucky_prize_right').addClass('active');
            index <= 1 ? 1 : --index;
            tabSport(index, lucky_prize_number);
        })
        $('.lucky_prize_right').click(function () {
            $('.lucky_prize_left').addClass('active');
            index >= lucky_prize_number ? lucky_prize_number : ++index;
            tabSport(index, lucky_prize_number);
        })

    }

    /*
     �л���Ʒ���Ұ�ť����ģ��
     */
    function tabSport(i, lucky_prize_number) {
        if (i >= lucky_prize_number) {
            $('.lucky_prize_right').removeClass('active');
        }
        if (i <= 1) {
            $('.lucky_prize_left').removeClass('active');
        }
        Obj.luckyPrize = i;
        $('.lucky_prize_show').hide().eq(i - 1).show();
        $(".lucky_prize_title").html($('.lucky_prize_show').eq(i - 1).attr('alt'));
        $('.lpl_list').removeClass('active').hide().eq(i - 1).show().addClass('active');
    }
    tabPrize();
})