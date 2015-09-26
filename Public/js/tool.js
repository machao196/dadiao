/*瀑布流*/
var count=0;
var curpage = 0;
$.fn.waterFlow=function(zcount,params){
    var t=this,$t=$(this),_twidth=this.width();
    var iner= $("#waterflow .dataitem");
    var shownum=10;//滚动每次加载时显示的数量
    var maxcount=40; //最大显示数量
    var lock=false,temp=0;

    var _init=function(){
        //var cid=getid("waterflow");
        ajaxLoad(0,false);
        window.onscroll=function(){
            var hid=parseInt($("#hid").val());
            if(temp<4 && hid < count) {
                if (marqueeLoad() && !lock) {
                    lock = true;
                    ajaxLoad(hid,false);
                }
            }
        }
    }

    var ajaxLoad=function(offset,isnewpage){
        var cid=document.getElementById("waterflow");
        sendAjax("api/clothes/lists",{"Offset":offset,"Rows":shownum},function(json) {
            var obj=json.data.list;
            $("#hid").val(parseInt(json.data.offset)+parseInt(json.data.rows));
            var html = innerhtml.singleList(obj,obj.length);
            if(isnewpage){
              iner.html(html);  
            }else{
              iner.append(html);  
            }
            
            setImgPos(cid, "item");
            count=json.data.count;
            lock=false;
            temp++;
           var hid =  parseInt($("#hid").val());
            if((hid<count && temp == 4) || hid >= count){
                _showPage();
            }
        });

    }
    var _showPage=function(){
        function pageSelect(page_index){
                temp=0;
                lock = true;
                curpage = page_index;
                ajaxLoad(page_index*maxcount,true);
                $(".pagination").remove();
                $("#waterflow .dataitem").css({"height":450+"px"});
        }
        var opt={"items_per_page":maxcount,current_page:curpage,callback:pageSelect};
        console.log(opt);
        console.log(count);
        $("#Pagination").pagination(count,opt);
    }
    var setImgPos=function(cid,its){
        var imgobj= cid.getElementsByClassName("item"); //获得图片对象
        var imgnum=imgobj.length; //所有图片的数量
        var iwidth=imgobj[0].offsetWidth;//图片宽度
        var num=Math.floor(_twidth/iwidth); //计算一行可以放几张图片
        var zwidth=num*iwidth,maxh;
        var fristrow=[];//存放第一行的高度
        //console.log(imgnum);
        for(var j=0;j<imgnum;j++){
           if(j<num){ //第一行
               fristrow[j]=imgobj[j].offsetHeight;
           }else{
               var minh=Math.min.apply(null,fristrow);
               maxh=Math.max.apply(null,fristrow)
               //最小高度的位置
               var minp=minPosi(fristrow,minh);
               imgobj[j].style.position="absolute";
               imgobj[j].style.top=minh+"px";
               imgobj[j].style.left=imgobj[minp].offsetLeft+"px";
               fristrow[minp]=fristrow[minp]+imgobj[j].offsetHeight;
           }
        }
        $("#waterflow .dataitem").css({"width":zwidth,"height":maxh+"px","margin":"0 auto"});
    }
    var getid=function(id){ return document.getElementById(id);}
    var minPosi=function(fristrow,minh){
        var minIndex=0;
       for(var p in fristrow){
          if(fristrow[p]==minh){
              minIndex=p;
          }
       }
       return minIndex;
    }
    /*滚动条加载*/
    var marqueeLoad=function(){
        var cid=getid("waterflow");
        var imgobj= cid.getElementsByClassName("item");
        var lastImgHeight=imgobj[imgobj.length-1].offsetTop+Math.floor(imgobj[imgobj.length-1].offsetHeight/2)+400;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var clientH=document.documentElement.clientHeight||document.body.clientHeight;
        return (clientH+scrollTop)>lastImgHeight?true:false;
    }
    _init();
}
