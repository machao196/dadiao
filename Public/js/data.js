var innerhtml= {
    radio: function (doc,name,data) {
        var buf = [];
        for(var i=1;i<=2;i++) {
            buf.push("<div");
            buf.push(this.attr({"class": "radiowrap"}));
            buf.push("><span");
            buf.push(this.attr({"class": "check-wrapp floatL"}));
            buf.push("><input");
            buf.push(this.attr({"class": "isnone","value":(i-1),"type":"radio","name":"sex", "id": "chee"+i,"checked":(i==1&&data==0)?true:false}));
            buf.push("><label");
            buf.push(this.attr({"class":"check-lable","for":"chee"+i}));
            buf.push("></label>");
            buf.push("</span><label>"+name[i-1]);
            buf.push("</label></div>");
        }
       $(doc).html(buf.join(""));
    },
    selectYear:function(doc){
        var buf=[];
        for(var i=1960;i<=2005;i++) {
            buf.push("<li>"+i);
            buf.push("</li>")
        }
        $(doc).html(buf.join(""));
    },
    setMonth:function(doc){
        var buf=[];
        for(var i=1;i<=12;i++) {
            if(i<10){
                i="0"+i;
            }
            buf.push("<li>"+i);
            buf.push("</li>")
        }
        $(doc).html(buf.join(""));
    },
    setDate:function(doc){
        var buf=[];
        for(var i=1;i<=31;i++) {
            if(i<10){
                i="0"+i;
            }
            buf.push("<li>"+i);
            buf.push("</li>")
        }
        $(doc).html(buf.join(""));
    },
    login_head:function(){
        var buf=[];
        buf.push("<div");
        buf.push(this.attrs({"class":"overgray"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"login_area"}));
        buf.push(">");
        buf.push("<div");
        buf.push(this.attrs({"class":"login_top"}));
        buf.push("><img");
        buf.push(this.attrs({"src":"img/bigLogo.png"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"colse","id":"colse"}));
        buf.push(">×</div>");
        buf.push("</div>");
        return buf.join("");
    },
    login_body:function(type){
        var buf=[];
        buf.push(this.login_head());
        buf.push("<div");
        buf.push(this.attrs({"class":"login_center"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"holder"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"buttons"}));
        buf.push("><a");
        buf.push(this.attrs({"href":"#","title":"微博帐号登录","class":"weibo"}));
        buf.push("></a");
        buf.push("><a");
        buf.push(this.attrs({"href":"#","title":"QQ帐号登录","class":"qzone"}));
        buf.push("></a");
        buf.push("><a");
        buf.push(this.attrs({"href":"#","title":"豆瓣帐号登录","class":"douban"}));
        buf.push("></a");
        buf.push("><a");
        buf.push(this.attrs({"href":"#","title":"人人帐号登录","class":"renren"}));
        buf.push("></a");
        buf.push("></div>");
        buf.push("<form");
        buf.push(this.attrs({"id":"login_form"}));
        if(type==1){
            var pend=this.login_form();
            buf.push(">"+pend);buf.push("</form>");
        }else if(type==2) {
            buf.push(">"+this.login_form(type));
            buf.push("</form>");
        }else{
            buf.push(">"+this.getActiCode("注册"));
            buf.push("</form>");
        }
        buf.push("</div>");
        buf.push(this.login_foot(type));
        return buf.join("");
    },
    login_foot:function(type){
        var buf=[];
        buf.push("<div");
        buf.push(this.attrs({"class":"login_bottom"}));
        if(type==1){
            buf.push("><a");
            buf.push(this.attrs({"href":"#"}));
            buf.push(">注册</a>或");
            buf.push("<a");
            buf.push(this.attrs({"href":"#"}));
            buf.push(">找回密码</a>");
        }else if(type==2){
            buf.push(">已有搭调账号，<a");
            buf.push(this.attrs({"href":"#","id":"login_go"}));
            buf.push(">直接登录</a>")
        }else if(type==3){
            buf.push(">我知道密码了，<a");
            buf.push(this.attrs({"href":"#","id":"login_go"}));
            buf.push(">立即登录</a>")
        }
        buf.push("</div>");
        buf.push("</div>");
        buf.push("</div>");
        return buf.join("");
    },
    getActiCode:function(txt){
        var buf=[];
        buf.push(this.forminput(1,["获得激活码"],["code"]));
        buf.push("<a");
        buf.push(this.attrs({"href":"#","class":"btn getcode","id":"getCode"}));
        buf.push(">获取激活码</a>");
        buf.push("<a");
        buf.push(this.attrs({"href":"#","class":"btn getcode recode"}));
        buf.push(">重新发送激活码(<label");
        buf.push(this.attr({"id":"time"}));
        buf.push(">59</label>)</a>");
        buf.push("<a");
        buf.push(this.attrs({"href":"#","class":"btn"}));
        buf.push(">"+txt+"</a>");
        return buf.join("");
   },
    login_form:function(type){
        var buf=[];
        if(type==2){
            buf.push(this.forminput(3,["邮箱/手机","输入密码","再次输入密码"],["phone","pwd","rpwd"]));
            buf.push(this.regit_form());
        }else{
            buf.push(this.forminput(2,["邮箱/手机","输入密码"],["phone","pwd"]));
            buf.push("<a");
            buf.push(this.attrs({"href": "#", "class": "btn", "id": "gologin"}));
            buf.push(">登录</a>");
            buf.push("<div");
            buf.push(this.attrs({"class": "protol"}));
            buf.push("><span");
            buf.push(this.attrs({"class": "check-wrapp floatL"}));
            buf.push("><input");
            buf.push(this.attrs({"class": "ischs", "type": "checkbox", "id": "che"}));
            buf.push("><label");
            buf.push(this.attrs({"class": "chs", "for": "che"}));
            buf.push("></label");
            buf.push("></span><span");
            buf.push(this.attrs({"class": "remember"}));
            buf.push(">记住登录状态</span>")
            buf.push("</div>");
        }
        return buf.join("");
    },
    regit_form:function(){
        var buf=[];
        buf.push("<a");
        buf.push(this.attrs({"href":"#","class":"btn","id":"goregit"}));
        buf.push(">注册</a>");
        buf.push("<div");
        buf.push(this.attrs({"class":"protol"}));
        buf.push(">注册代表同意<a");
        buf.push(this.attrs({"href":"#"}));
        buf.push(">搭调服务使用协议</a></div>");
        return buf.join("");
    },
    forminput:function(num,txtar,idar,cls){
        var buf=[];
        for(var i=0;i<num;i++){
            buf.push("<div");
            buf.push(this.attrs({"class":"inputWrap "+(cls==undefined?"":cls)}));
            buf.push("><input");
            buf.push(this.attrs({"placeholder":txtar[i],"data_val":(i+1),"class":"login_input","type":(i>0?"password":"text"),"id":idar[i]}));
            buf.push("/><i")
            buf.push(this.attrs({"class":"infoicon right"}));
            buf.push("></i>")
            buf.push("</div>");
        }
        return buf.join("");
    },
    hiderror:function(num,info){
       var buf=[];
       for(var i=0;i<num;i++) {
          buf.push("<div");
          buf.push(this.attrs({"class": "login_info "+info[i]}));
          buf.push("><em><</em>");
          buf.push("<i");
          buf.push(this.attrs({"class": "infoicon"}));
          buf.push("></i>");
          buf.push("<span");
          buf.push(this.attrs({"id": "txt"}));
          buf.push("></span>");
          buf.push("</div>");
        }
        return buf.join("");
    },
    hidinput:function(num,ids){
      var buf=[];
      for(var i=0;i<num;i++) {
          buf.push("<input");
          buf.push(this.attrs({"type": "hidden", "id":ids[i], "value": "0"}));
          buf.push("/>");
      }
      return buf.join("");
    },
    login:function(){
       var hid=this.hidinput(3,["status1","status2","status3"]);
       var lhtml=this.login_body(1); //1 登录 2注册
       var error=this.hiderror(2,["error","pwd"]);
      $("body").append(hid+lhtml+error);
      setTimeout(function(){
          $(".login_area").myLogin("./api/login");
      },300);

    },
    regit:function(){
        var lhtml=this.login_body(2);
        $("body").append(lhtml);
        setTimeout(function(){
            $(".login_area").myLogin();
        },300);
    },
    phoneActi:function(){
        var lhtml=this.login_body(3);
        $("body").append(lhtml.join(""));
    },
    goemail:function(){
        var buf=[];
        buf.push(this.login_head());
        buf.push("<div");
        buf.push(this.attrs({"class":"login_center emailcheck"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"holder"}));
        buf.push("><img");
        buf.push(this.attrs({"src":"img/email.png"}));
        buf.push("/><h3>邮箱验证</h3>");
        buf.push("<p");
        buf.push(this.attrs({"class":"etxt"}));
        buf.push(">邮箱验证已发送至你的注册邮箱：<label");
        buf.push(this.attrs({"id":"ecode"}));
        buf.push(">liuxi055@163.com</label>");
        buf.push("</br>请进入邮箱查看邮件,并点击验证链接重置您的密码。");
        buf.push("</p><a");
        buf.push(this.attrs({"href":"#","class":"login_email"}));
        buf.push(">登录邮箱</a>");
        buf.push("<p");
        buf.push(this.attrs({"class":"send"}));
        buf.push(">没有收到邮件?</br>");
        buf.push("1,请查看邮箱地址是否正确</br>");
        buf.push("2,检查您的邮件垃圾邮箱</br>");
        buf.push("3,若仍未收到确认请尝试<a");
        buf.push(this.attrs({"href":"#","class":"resend"}));
        buf.push(">重新发送</a>");
        buf.push("</p></div></div>");
        buf.push(this.login_foot(2));
        $("body").append(buf.join(""));
    },
    regitSuccess:function(){
        var buf=[];
        buf.push(this.login_head());
        buf.push("<div");
        buf.push(this.attrs({"class":"login_center emailcheck"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"holder"}));
        buf.push("><img");
        buf.push(this.attrs({"src":"img/success_email.jpg"}));
        buf.push("/><h3");
        buf.push(">注册成功</h3>");
        buf.push("<p");
        buf.push(this.attrs({"class":"etxt"}));
        buf.push(">您的账号注册成功,快去登录吧!</p>");
        buf.push("<a")
        buf.push(this.attrs({"href":"#","class":"login_email"}));
        buf.push(">登录</a>")
        buf.push("</div></div>");
        buf.push("</div></div>");
        $("body").append(buf.join(""));
    },
    findpwd:function(){
        var result=[];
        result.push(this.findPwd_head(1));
        result.push(this.forminput(1,["邮箱/手机"],["phone"]));
        result.push("<div");
        result.push(this.attr({"class":"clearfix"}));
        result.push(">");
        result.push(this.forminput(1,["输入验证码"],["checkcode"],"codeinput"));
        result.push("<div");
        result.push(this.attr({"class":"codeurl"}));
        result.push("><img");
        result.push(this.attr({"src":""}));
        result.push("/></div>");
        result.push("<a");
        result.push(this.attr({"href":"#","id":"sub","class":"btn"}));
        result.push(">提交</a></div>");
        result.push(this.findend());
        $("body").append(result.join(""));
    },
    fpwd_byphone:function(){
        var result=[];
        result.push(this.findPwd_head(2));
        result.push(this.getActiCode("提交"));
        result.push(this.findend());
        $("body").append(result.join(""));
    },
    sendemail:function(){
       this.sendCommon("mail","邮件已发出","找回密码邮件已发出,快去邮箱获取你的新密码吧~");
    },
    sendmsg:function(){
        this.sendCommon("phone","短信已发出","找回密码短信已发出,快去获取你的新密码吧~");
    },
    sendCommon:function(type,title,subti){
        var result=[];
        result.push(this.findPwd_head("email"));
        result.push("<img")
        result.push(this.attr({"src":"img/email.png"}));
        result.push("/><h3")
        result.push(">"+title+"</h3>")
        result.push("<p")
        result.push(this.attr({"class":"etxt"}));
        result.push(">"+subti+"</p>")
        if(type=="mail"){
            result.push("<a")
            result.push(this.attr({"href":"#","class":"login_email"}));
            result.push(">登录邮箱</a>");
        }
        result.push("</div></div>");
        $("body").append(result.join(""));
    },
    findPwd_head:function(num){
        var buf=[],cls;
        num=="email"?(cls="emailcheck"):cls="";
        buf.push("<div");
        buf.push(this.attrs({"class":"overgray"}));
        buf.push("><div");
        buf.push(this.attrs({"class":"login_area find_area"}));
        buf.push(">");
        buf.push("<div");
        buf.push(this.attrs({"class":"findpwd"}));
        buf.push(">");
        buf.push("<label");
        buf.push(">找回密码</label>");
        buf.push("<div");
        buf.push(this.attrs({"class":"colse","id":"colse"}));
        buf.push(">×</div>");
        if(num==1){
            buf.push("<p");
            buf.push(">使用注册邮箱（手机号）或绑定邮箱（手机号）找回密码</p>");
        }
        buf.push("</div><div");
        buf.push(this.attrs({"class":"login_center "+cls}));
        buf.push("><div");
        buf.push(this.attrs({"class":"holder"}));
        buf.push(">");
        if(num!="email"){
            buf.push("<form");
            buf.push(this.attrs({"class":"login_form"}));
            buf.push(">");
        }
        return buf.join("");

    },
    findend:function(){
        var buf=[];
        buf.push("</form></div>");
        buf.push(this.login_foot(3));
        return buf.join("");
    },
    setSlide:function(title,doc,data,defval,t,hibe){
        var buf=[],dnum=data,array1=1,t1=[],sl=[],defaultW=140,ys=hibe;
        if(data.indexOf("|")!=-1){
            dnum=data.split("|");
            ys=hibe.split("|");
            array1=dnum.length;
        }
        buf.push("<h3")
        buf.push(">"+title+"</h3>")
        if(title=="脸部数据"){
            buf.push(this.faceData());
        }else {
            for (var k = 0; k < array1; k++) {
                var st = (array1 <= 1) ? dnum : dnum[k];
                t1 = st.split("@");
                var t2 = t1[1].split(",");
                sl.push(t2.length);
                buf.push("<input");
                buf.push(this.attrs({"type": "hidden", "id": "hid-data" + k, "value": defval.split("@")[k]}));
                buf.push("/>");
                buf.push("<input");
                buf.push(this.attrs({"type": "hidden", "id": "hib-data" + k, "value":42}));
                buf.push("/>");
                buf.push("<div");
                buf.push(this.attrs({"class": "wrap"}));
                buf.push("><span");
                buf.push(this.attrs({"class": "title"}));
                buf.push(">" + t1[0] + ":</span>");
                buf.push("<div");
                buf.push(this.attrs({"class": "wrap_bar"}));
                buf.push("><div");
                buf.push(this.attrs({
                    "class": "scale",
                    "id": "bar" + k,
                    "style": "width:" + (defaultW * t2.length) + "px"
                }));
                buf.push("><div");
                buf.push("></div>");
                buf.push("<span");
                buf.push(this.attrs({"id": "btn" + k}));
                buf.push("></span></div>");
                buf.push("<label");
                buf.push(this.attrs({"class": "start"}));
                buf.push(">" + t2[0] + "</label>");
                if (t2.length - 2 > 0) {
                    for (var i = 1; i < t2.length - 1; i++) {
                        buf.push("<label");
                        buf.push(this.attrs({
                            "class": "center",
                            "style": "left:" + (defaultW * i + t2[i].length * 12) + "px"
                        }));
                        buf.push(">" + t2[i] + "</label>");
                    }
                }
                buf.push("<label");
                buf.push(this.attrs({"class": "end"}));
                buf.push(">" + t2[t2.length - 1] + "</label>");
                buf.push("</div></div>");
            }
        }
        buf.push("<div")
        buf.push(this.attrs({"class": "group_btn"}));
        buf.push("><button")
        buf.push(this.attrs({"type": "button","id":"sure"}));
        buf.push(">确定</button>")
        buf.push("<button")
        buf.push(this.attrs({"type": "button","id":"cancel"}));
        buf.push(">取消</button>")
        buf.push("</div>")
        $(doc).html(buf.join(""));
        setTimeout(function(){
            if(title=="脸部数据") {$(".face_sel").clickRadio("#hidface");}else{
                for(var j=0;j<array1;j++) {
                    var data={"btn":"btn"+j,"bar":"bar"+j,"val":"hid-data"+j,"hibval":"hib-data"+j,"count":sl[j],"width":defaultW,"hibe":array1==1?ys:ys[j]};
                    new scale(data);
                }
            }
            $("#cancel").click(function(){
                $(".popmask").css({"opacity":"0","display":"none"});
            });
            $("#sure").click(function(){
                var self= t,alls=$("#all").val();
                for(var i=0;i<array1;i++){
                    alls+=$("#hib-data"+i).val()+",";
                }
                $("#all").val(alls);
                self.find(".img1").addClass("now");
                self.find(".img2").removeClass("now");
                $(".popmask").css({"opacity":"0","display":"none"});
            });
        },200)
    },
    faceData:function(){
        var buf=[],data=["菱形脸","长脸","方形脸","鹅蛋脸","圆形脸","锥子脸"],id=[38,35,37,34,36,33];
        buf.push("<div")
        buf.push(this.attrs({"class":"face"}));
        buf.push("><div")
        buf.push(this.attrs({"class":"floatL title"}));
        buf.push(">脸型:</div>")
        for(var i=0;i<data.length;i++){
            buf.push("<label")
            buf.push(this.attrs({"class":"face_sel face"+(i+1),"for":"fr"+(i+1)}));
            buf.push("><em></em>")
            buf.push("<p")
            buf.push(this.attrs({"class":"name"}));
            buf.push(">"+data[i]+"</p>")
            buf.push("<span")
            buf.push(this.attrs({"class":"check-wrapp"}));
            buf.push("><input")
            buf.push(this.attrs({"class":"isnone","id":"fr"+(i+1),"type":"radio","value":id[i],"name":"face"}));
            buf.push("/><label")
            buf.push(this.attrs({"class":"check-lable"}));
            buf.push("></label>")
            buf.push("</span>")
            buf.push("</label>")
        }
        buf.push("</div>");
        return buf.join("");
    },
    singleList:function(data,count){
       var buf=[];
       for(var i=0;i<count;i++) {
           buf.push("<div");
           buf.push(this.attrs({"class":"item"}));
           buf.push("><div")
           buf.push(this.attrs({"class":"subitem"}));
           buf.push("><img");
           buf.push(this.attrs({"class":"img","src":data[i].picurl}));
           buf.push("><span");
           buf.push(this.attrs({"class":"mask"}));
           buf.push("><div");
           buf.push(this.attrs({"class":"heart"}));
           buf.push(">");/*<img
           buf.push(this.attrs({"src":"img/heart.png"}));
           buf.push("><label");
           buf.push(">" + data[i].score + "</label>")*/
           buf.push("</div><a")
           buf.push(this.attrs({"href":data[i].commodityurl,"class":"itemname","traget":"_blank"}));
           buf.push(">" + data[i].commodityname + "</a>")
           buf.push("<div")
           buf.push(this.attrs({"class":"ft"}));
           buf.push("><h4")
           buf.push(">" + data[i].price + "</h4>")
           buf.push("<button")
           buf.push(">查看</button>")
           buf.push("</div></span></div></div>")
       }
        return buf.join("");
    },
    rightMenu:function(doc){
        var buf=[];
        buf.push("<dl><dt");
        buf.push(this.attrs({"class":"title"}));
        buf.push(">上衣<span>TOPS</span></dt>")
        buf.push("<dd><div");
        buf.push(this.attrs({"class":"catlist"}));
        buf.push("><a");
        buf.push(this.attrs({"href":"#"}));
        buf.push(">冬季热卖</a>");
        buf.push("<a");
        buf.push(this.attrs({"href":"#"}));
        buf.push(">毛呢外套</a>");
        buf.push("<a");
        buf.push(this.attrs({"href":"#"}));
        buf.push(">针织衫</a>");
        buf.push("</dd>");
        buf.push("</dl>");
        $(doc).html(buf.join(""));
    },
    navigate:function(datas,index){
       var buf=[];
       buf.push("<nav");
       buf.push(this.attrs({"href":"menu_tool abs bottomB"}));
       buf.push("><div");
       buf.push(this.attrs({"class":"menus"}));
       buf.push("><ul");
       buf.push(this.attrs({"class":"nav_list"}));
       buf.push("><li");
       buf.push(this.attrs({"class":"logo navs"}));
       buf.push("><img");
       buf.push(this.attrs({"src":"img/logo.png"}));
       buf.push("></li>");
       buf.push("<li");
       buf.push(this.attrs({"class":"tab"}));
       buf.push("><a");
       buf.push(this.attrs({"href":"index.html","class":(index==1&&datas.code==10000?"select":"")}));
       buf.push(">首页</a>");
       if(datas.code==10000){  //没有登录
           buf.push("<a");
           buf.push(this.attrs({"href":"takeSingle.html","class":(index==2?"select":"")}));
           buf.push(">搭单品</a>");
           buf.push("<a");
           buf.push(this.attrs({"href":"takeBody.html","class":(index==3?"select":"")}));
           buf.push(">搭全品</a>");
           buf.push("<a");
           buf.push(this.attrs({"href":"mydata.html","class":(index==4?"select":"")}));
           buf.push(">我的数据</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push(this.attrs({"class":"nav_right"}));
           buf.push("><span");
           buf.push(this.attrs({"class":"mycount navBtn"}));
           buf.push("><img");
           buf.push(this.attrs({"src":datas.data.avatasmall}));
           buf.push("/><ul");
           buf.push(this.attrs({"class":"pop_count scount"}));
           buf.push("><li");
           buf.push(this.attrs({"class":"user"}));
           buf.push("><a");
           buf.push(this.attrs({"href":"#"}));
           buf.push(">"+datas.data.account+"</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push("><a");
           buf.push(this.attrs({"href":"baseInfo.html"}));
           buf.push(">基本资料</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push("><a");
           buf.push(this.attrs({"href":"bindAccount.html"}));
           buf.push(">绑定账号</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push("><a");
           buf.push(this.attrs({"href":"changepwd.html"}));
           buf.push(">修改密码</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push("><a");
           buf.push(this.attrs({"href":"myfarivote.html"}));
           buf.push(">我的收藏夹</a>");
           buf.push("</li>");
           buf.push("<li");
           buf.push(this.attrs({"class":"exit"}));
           buf.push("><a");
           buf.push(this.attrs({"href":"#","onclick":"exit()"}));
           buf.push(">退出</a>");
           buf.push("</li></ul></span>");
           buf.push("<li");
           buf.push(this.attrs({"class":"nav_right"}));
           buf.push("><a");
           buf.push(this.attrs({"class":"dialog"}));
           buf.push("></a>");
           buf.push("</li>");
        }else{
           buf.push("</li>");
           buf.push("<li");
           buf.push(this.attrs({"class":"nav_right"}));
           buf.push("><a");
           buf.push(this.attrs({"class":"dialog"}));
           buf.push("></a>");
           buf.push("<a");
           buf.push(this.attrs({"class":"regit_btn navBtn","onclick":"RegitHi()"}));
           buf.push(">注册</a>");
           buf.push("<a");
           buf.push(this.attrs({"class":"login_btn navBtn","onclick":"LoginHi()"}));
           buf.push(">登录</a>");
           buf.push("</li>");
       }
       buf.push("</ul></div></nav>");
       $("#navi").html(buf.join(""));
    },
    attr: function (rt) {
        return this.attrs.apply(rt, arguments)
    },
    attrs: function (t, e) {
        var n = [],
            r = t.terse;
        delete t.terse;
        var i = Object.keys(t),
            s = i.length;
        if (s) {
            n.push("");
            for (var o = 0; o < s; ++o) {
                var u = i[o],
                    a = t[u];
               "boolean" == typeof a || null == a ? a && (r ? n.push(u) : n.push(u + '="' + u + '"')) : "class" == u && Array.isArray(a) ? n.push(u + '="' +a.join(" ") + '"') : n.push(u + '="' + a + '"')
            }
        }
        return n.join(" ")
    }
}

