/**
 * Created by Administrator on 2015/3/19.
 */

var img = {
    imgArray: [],
    numArray: []
};

var clickTime = 2;
var x,y;

$(function () {
    $(".container").html("");
    layout();
    $("#restart").bind("click", function () {
        $(".container").html("");
        clickTime = 2;
        img.imgArray = [];
        img.numArray = [];
        layout();
    })

});

function layout(){
    var html = "";
    /*
     *获取图片
     */
    for (var i = 0; i < powFun(4)/2; i++) {
        img.imgArray.push(randomFun(21)+1);  //图片号
        img.numArray.push(2);
    }
    /*
     *随机摆放图片
     */
    for (var j = 0; j < 4; j++){
        html += '<div class="row">';
        for(var i = 0; i < 4; i++){
            var index = randomFun(powFun(4)/2);
            while(img.numArray[index]==0){
                index = randomFun(powFun(4)/2);
            }
            img.numArray[index] -= 1;
            var id = String(i) + String(j);
            html += '<div class="block" id=' + id + '>'+
                '<div class="cover"></div>'+
                '<img src="image/p'+img.imgArray[index]+'.png"/></div>';
        }
        html += "</div>";
    }
    $(".container").html(html);
    bindFun();
}

function bindFun(){
    for (var j = 0; j < 4; j++){
        for(var i = 0; i < 4; i++){
            var id = '#' +String(j) + String(i);
            removeCoverAndViewImg(id);
        }
    }
}

function removeCoverAndViewImg(id) {
    $(id).bind("click",function() {
        openImage(this);
        removeBindClick(id);
        CheckOrNot(id);
    })
}

function removeBindClick(id) {
    $(id).unbind("click")
}

function CheckOrNot(id) {
    clickTime = clickTime - 1;

    if (clickTime == 1) {
        x = id;
    }

    if (clickTime == 0) {
        y = id;
        clickTime = 2;
        check(x, y);
    }
}

function check(x ,y) {
    var theOneImage = $("img", $(x)).attr("src");
    var theAnotherImage = $("img", $(y)).attr("src");
    if (theOneImage != theAnotherImage) {
        removeCoverAndViewImg(x);
        removeCoverAndViewImg(y);
        closeImage($(x));
        closeImage($(y));
    }
}

function openImage(self) {
    $(".cover",self).animate({
        width: 0,
        left: "70%"
    },200);

    $('img',self).animate({
        width: "100%",
        left: 0
    },300);
}

function closeImage(self) {
    $(".cover",self).animate({
        width: "100%",
        left: 0
    },300);

    $('img',self).animate({
        width: 0
    },200);
}

/*
 随机函数
 */
function randomFun(num){
    var result = Math.floor(Math.random()*num);  //random() 0~1  随机数 floor()向下取整
    return result;
}
/*
 平方函数
 */
function powFun(num){
    var result = Math.pow(num,2);
    return result;
}