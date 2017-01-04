
$(function(){

    $.get('/indexdata',function(data){
        //导航
        var listnav="";
        for(var i=0,len=data.navs.length; i<len; i++){
            listnav+="<li><a href='"+data.navs[i].navhref+"'>"+data.navs[i].navname+"</a></li>"
        }
        $('#nav ul').html(listnav);


        //模块
        var moduleList="";
        for(var i=0,len=data.modules.length; i<len; i++){
            moduleList+="<li><a href='"+data.modules[i].moduleHref+"'>"
                        + "<figure><img src='/images/"+data.modules[i].moduleImg+".png' alt='"+data.modules[i].moduleName+"'>"
                        +"<figcaption>"+data.modules[i].moduleName+"</figcaption></figure></a></li>"
        }
        $('.mainmodule').html(moduleList);


        //子模板
        var submodList="";
        for(var i=0,len=data.submod.length; i<len; i++){
            submodList+="<li><a href='"+data.submod[i].submodHref+"'>"
                + "<figure><img src='/images/"+data.submod[i].submodImg+".png' alt='"+data.submod[i].submodName+"'>"
                +"<figcaption>"+data.submod[i].submodName+"</figcaption></figure></a></li>"
        }
        $('.submodule').html(submodList)
    });


})