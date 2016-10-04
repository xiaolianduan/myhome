$(function () {
	var clientW=document.documentElement.clientWidth;
	var clientH=document.documentElement.clientHeight;
	$(".home").css({width:clientW,height:clientH})

    //楼层跳转
    var headerLis=$(".header .nav li")
    var sections=$("section")
    var dds=$(".list dd")

	$(window).resize(function(){
		clientW=document.documentElement.clientWidth;
		clientH=document.documentElement.clientHeight;	
		$(".home").css({width:clientW,height:clientH})	
        $(".aboutMe").css({width:clientW,height:clientH}) 
	})
    $(window).resize()

	// 去除浏览器默认行为
    document.onmousedown=function (e) {
        var ev=e||window.event;
        ev.preventDefault()
        document.onmousemove=function (e) {
            var ev=e||window.event;
            ev.preventDefault()
        }
    };

    // 手机下拉菜单实现
    var flag=true;
    $(".movie").click(function () {
        if(flag){
            flag=false;
            $(".movie .list").slideDown(1000)
        }else{
        	flag=true;
            $(".movie .list").slideUp(1000);
        }
    });

    var obj=document.body.scrollTop?document.body:document.documentElement;
    var topflag1=true;
    var topflag2=true;
    var num=0;
    // 滚动条滚动事件
    document.onscroll=function(){
        var tops=document.documentElement.scrollTop||document.body.scrollTop;
        clientW=document.documentElement.clientWidth;
        if(tops>500){
            if(topflag1){
                topflag1=false
                topflag2=true
                $("header").css({height:"70px",background:"rgba(255, 255, 255, 0.9)"})
                $(".nav li").css({lineHeight:"70px"})
                $(".logo img").attr({src:"images/logo-2.png"}) 
                $(window).resize(function(){
                    if(clientW>900){
                        $(".logo img").attr({src:"images/logo-2.png"})                 
                    }else{
                        $(".logo img").attr({src:"images/logo.png"})
                    }
                })
                $(".nav li a").css({color:"#333"})
            }
        }else{
            if(topflag2){
                topflag2=false
                topflag1=true
                $("header").css({height:"130px",background:"rgba(0,0,0,0)"})
                $(".nav li").css({lineHeight:"130px"})
                $(".logo img").attr({src:"images/logo.png"})
                $(".nav li a").css({color:"white"}) 
            }         
        }
        $(".nav li a.checked").css({color:"#FFA21E"})


        //楼层跳转

        for (var i = 0; i < sections.length; i++) {
            if(tops>=sections[i].offsetTop){
                for (var j = 0; j < headerLis.length; j++) {  
                    if(tops>=500){
                        headerLis[j].getElementsByTagName("a")[0].style.color="#333";
                    }else{
                        headerLis[j].getElementsByTagName("a")[0].style.color="";
                    }  
                    dds[j].getElementsByTagName("a")[0].className="";                 
                };
                headerLis[i].getElementsByTagName("a")[0].style.color="#FFA21E";   
                dds[i].getElementsByTagName("a")[0].className="checked";  

                var bottoms=this.getElementsByClassName("bottom");
                for (var k = 0; k < bottoms.length; k++) {
                    bottoms[k].style.transform="translate(0,0)";
                };
                var lefts=this.getElementsByClassName("lefts");
                for (var k = 0; k < lefts.length; k++) {
                    lefts[k].style.transform="translate(0,0)";
                };   
                var rights=this.getElementsByClassName("rights");
                for (var k = 0; k < rights.length; k++) {
                    rights[k].style.transform="translate(0,0)";
                };                             
            }
        };

        //导航字体颜色问题
        for (var j = 0; j < headerLis.length; j++) {
            headerLis[j].index=j;
            headerLis[j].onmouseover=function(){
                headerLis[this.index].getElementsByTagName("a")[0].style.color="#FFA21E";
            };
            headerLis[j].onmouseout=function(){
                if (this.index!=num) {
                    if(tops>500){
                        headerLis[this.index].getElementsByTagName("a")[0].style.color="#333";
                    }else{
                        headerLis[this.index].getElementsByTagName("a")[0].style.color="";
                    }  
                };
            };
        }
  
    }



    for (var i = 0; i < headerLis.length; i++) {
        headerLis[i].index=i;
        headerLis[i].onclick=function(){
            var offsetTop=sections[this.index].offsetTop;
            animate(obj,{scrollTop:offsetTop})
            num=this.index;
        }
    }

    // sec3导航 大屏+
    var sec3maxbtn=$(".sec3-btnbox")[0]
    var sec3maxbtnLis=sec3maxbtn.getElementsByTagName('li')


    for (var i = 0; i < sec3maxbtnLis.length; i++) {    
        sec3maxbtnLis[i].index=i;
        sec3maxbtnLis[i].onclick=function(){
            for (var j = 0; j < sec3maxbtnLis.length; j++) {
                sec3maxbtnLis[j].style.background="#BBB"
            }
            var marginL=-this.index*100+"%"
            this.style.background="#EEE"
            $(".sec3-skillcontain").css({
                marginLeft:marginL
            })
        }
    }


    //sec4展示
    var sec4navLis=$(".sec4-nav li")
    var sec4imgLis=$(".sec4-img li")

    for (var i = 0; i < sec4navLis.length; i++) {
        sec4navLis[i].index=i;
        sec4navLis[i].onclick=function(){
            for (var j = 0; j < sec4imgLis.length; j++) {
                sec4imgLis[j].style.display="none"
                if (this.innerHTML==sec4imgLis[j].className) {
                    sec4imgLis[j].style.display="block"  
                };    
                if(this.innerHTML=="show all"){
                    sec4imgLis[j].style.display="block"
                }                                      
            };   
            for (var k = 0; k < sec4navLis.length; k++) {
                    sec4navLis[k].className=""
            }; 
            this.className="checked"    
        }
    };

    //add more
    var addmore=$(".sec4-more-button")
    addmore.click(function(){
        $(".hidden").css({display:"block"})
        location.href="https://github.com/xiaolianduan"
    })

    //欢迎界面
    function welcome(){
        $(".jinru").css({opacity:1})
        $(".range").animate({width:"100%"},2000,function(){
            $(".huanying").animate({opacity:0},function(){
                $(".huanying").css({display:"none"})
            })
        })     
        setInterval(function(){
            var baifenbi=Math.round(parseInt($(".range").css("width"))/5)+"%"
            $(".baifen").html(baifenbi)
        },60) 
    }
    welcome()
}) 