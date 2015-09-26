$.fn.myRadio=function(option){
    var opt=option.cname;
    return this.click(function(){
        $(opt).removeClass("checks");
        $(this).addClass("checks");
    });
}

$.fn.clickRadio=function(doc){
    var evTimeStamp = 0;
   return this.on('click',function(){
       var now = +new Date();
       if (now - evTimeStamp < 100) { return;}
       evTimeStamp = now;
      $(doc).val($(this).find("input").val());
   });
}
$.fn.clickCheck=function(doc){
    var evTimeStamp = 0,vas=[];
    return this.on('click',function(){
        var now = +new Date();
        if (now - evTimeStamp < 100) {return; }
        evTimeStamp = now;

        vas.push($(this).find("input").val());
        $(doc).val(vas);
    });
}

$.fn.mySelect=function(option){
    var hid=option==undefined?"":option.cname;
    return this.on('click',function(event){
        $(this).toggleClass('active');
        $(this).find("li").on('click',function(e){
            var t=$(this);
            t.parent().prev("span").html(t.html());
        });
        event.stopPropagation();
    });
}

$.fn.mySlider=function(){
      var self=$(this);
      var wrap=self.find("#lookimg");
      var lbtn=self.find("#p_left");
      var rbtn=self.find("#p_right");
      var lis=wrap.find("li");
      var zsize=lis.length;
      var width=lis.width();
      var zwidth=lis.width()*zsize;
      var curTemp=4;
      var defaultTemp=4;
      var temp=0;
      wrap.width(zwidth);
      wrap.parent().width(width*curTemp);
      return this.each(function(){
      	 rbtn.bind('click',rightMove);
         lbtn.bind('click',leftMove);
         function rightMove(){
            if(defaultTemp<zsize){
                defaultTemp++;temp++;
                var tnum=defaultTemp-curTemp;
                wrap.css("transform","translate(-"+(tnum*width)+"px, 0px)");
            } 
         }
         function leftMove(){
            if(temp>0){
                defaultTemp--;temp--;
                var tnum=curTemp-defaultTemp;
                wrap.css("transform","translate("+(tnum*width)+"px, 0px)");
            }
         }
      });
}

$.fn.myLogin=function(url){
	var t=$(this);
	var right=t.find(".login_input");
    $("#colse").bind('click',colseWin);
    $("#gologin").bind('click',gologin);
    $("#regit").bind('click',regit); //准备注册
    $("#getCode").bind("click",getCode);
    $("#code").bind("blur",phoneCode);
    right.each(function(){
       var self=$(this);
        self.blur(function(){
            var type=$(this).attr("data_val");
            var tval=$(this).val();
            validate(type,tval,$(this));
       });
    });
    $(".protol .check-wrapp").clickRadio("#status3");
    function colseWin(){
        $(".overgray").remove();
    	t.parent().hide();
    }
    function openWin(){
        t.parent().show();
        right.eq(0).focus();
    }
    function validate(type,v,th){
       var i=parseInt(type)
       switch(i){
           case 1:
              var obj= t.next();
              var phone = /^1[3,5]\d{9}$/;
              var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
              var temp=0;
              if(v==""){
                  openPop("请输入您的常用邮箱或手机.",obj,th);
              }else if(!isNaN(v)&&!phone.test(v)){
                  openPop("不是合法的手机号.",obj,th);
              }else if(isNaN(v)&&!email.test(v)){
                  openPop("不是合法的邮箱.",obj,th);
              }else{
                  $("#status1").val(1);
                  closePop("输入正确啦！",obj,th);
              }
           break;
           case 2:
               var obj= t.next().next();
              // var pwd=/^(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![0-9\W]+$)(?![a-z\W]+$)(?![a-zA-Z]+$)(?![A-Z\W]+$)[a-zA-Z0-9\W_]+$/;
               if(v==""){
                   openPop("密码不允许为空.",obj,th);
               }/*else if(!pwd.test(v)){
                   openPop("安全的密码应由6~16位字母/数字/符号组合而成。（不能包含全角字符和空格）.",obj,th);
               }*/else if((v.length<6||v.length>16)){
                   openPop("密码长度应控制在6~16.",obj,th);
               }else{
                   $("#status2").val(1);
                   closePop("输入正确啦！",obj,th);
               }
           break;
           case 3:
               var obj= t.next().next().next();
               var pwd=$("#pwd").val();
               if(v==""){
                   openPop("请再次输入密码.",obj,th);
               }else if(v!=pwd){
                   openPop("两次密码输入不一致.",obj,th);
               }else{
                   $("#status3").val(1);
                   closePop("输入正确啦！",obj,th);
               }
           break;
       }
    }
    function gologin(){
        if($("#status1").val()==1&&$("#status2").val()==1){
            var data={"Account":$("#phone").val(),"Password":$("#pwd").val(),"Remember":$("#status3").val()};;
            sendAjax(url,data,function(json){
                if(json.code==20011){
                    var obj= t.next();
                    openPop("账号不存在",obj,right.eq(0));
                }else if(json.code==20012){
                    var obj= t.next().next();
                    openPop("密码错误",obj,right.eq(1));
                }else{
                    colseWin();
                    $("#status1").val(0);
                    loadAccount(1);
                }
            });
        }
    }
    function regit(){
        if($("#status1").val()==1&&$("#status2").val()==1&&$("#status3").val()==1){
            var data={"Account":$("#phone").val(),"Password":$("#pwd").val(),"RePassword":$("#rpwd").val()};
            sendAjax("./api/regist",data,function(json){
                 $(".regits").hide(function(){
                 $("#goemail").show();
                 });
            });
        }
    }
    function openPop(txt,o,th){
        th.next().animate({right:-30,opacity:0},200);
        o.animate({right:300,opacity:1},200);
        o.find("#txt").html(txt);

    }
    function closePop(txt,o,th){
        th.next().animate({right:10,opacity:1},200);
        o.animate({right:222,opacity:0},200);
        o.find("#txt").html(txt);
    }
    function getCode(){
        var cs=$(this);
        cs.hide();
        cs.next().css("display","block");
        var count=5;
        var t=setInterval(function(){
            count--;
            cs.next().find("#time").html(count);
            if(count<=0){
                clearInterval(t);
                cs.next().hide();
                cs.show();
            }
        },1000);
    }
    function phoneCode(){
         var obj= t.next();
        if($(this).val()==""){
            openPop("激活码有误,请核实后再填",obj,$(this));
        }else{
            closePop("激活码成功",obj,$(this));
        }
    }
}

function sendAjax(url,data,callback){
    $.ajax({
        type : "post",
        url :url,
        dataType : "json",
        data:data,
        jsonp: "callback",
        success : function(json){
            callback(json);
        },
        error:function(){
            return false;
        }
    });
}
function loadAccount(index){
    sendAjax("api/user/info","",function(data){
        innerhtml.navigate(data,index);
    });
}
/*退出账号 718281962@qq.com*/
function exit(){
    sendAjax("api/login/logout","",function(data){
       if(data.code==10000){
           $("#account").html("");
           $("#btns .navBtn").show();
           window.location.href="index.html";
       }
    });
}
function LoginHi(){
    innerhtml.login();
}
function RegitHi(){
    innerhtml.regit();
}
var scale = function (option) {
    this.btn = document.getElementById(option.btn);
    this.bar = document.getElementById(option.bar);
    this.title = document.getElementById(option.val);
    this.step = this.bar.getElementsByTagName("DIV")[0];
    this.width=option.width;
    this.defval=parseInt(this.title.value);
    this.hibval=document.getElementById(option.hibval);
    this.count=option.count-1;
    this.btnposi=this.defval==0?0:this.defval*this.width+40;
    this.btn.style.left=this.btnposi+"px";
    this.step.style.width=this.btnposi+"px";
    this.ys=option.hibe;
    this.ysarry=this.ys.split(",");console.log(this.ys);
    this.init();
};
scale.prototype = {
    init: function () {
        var f = this, g = document, b = window, m = Math;
        f.btn.onmousedown = function (e) {
            var x = (e || b.event).clientX;
            var l = this.offsetLeft;
            var max = f.bar.offsetWidth - this.offsetWidth;
            g.onmousemove = function (e) {
                var thisX = (e || b.event).clientX;
                var to = m.min(max, m.max(-2, l + (thisX - x)));
                f.btn.style.left = to + 'px';
                f.ondrag(m.round(m.max(0, to / max) *parseInt(f.count)), to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup = new Function('this.onmousemove=null');
        };
    },
    ondrag: function (pos, x) {
        this.step.style.width = Math.max(0, x) + 'px';
        this.title.value =pos;
        this.hibval.value=this.ysarry[pos];

    }
}




