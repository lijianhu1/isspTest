$(function(){
    $('#form').on("click",'#sub',function(e){
        var data={};
        data.username=$('#form input[name="username"]').val();
        data.password=$('#form input[name="password"]').val();
        $.ajax({
            type:"post",
            url:"/html/login",
            data:data,
            success:function(req){
                console.info("成功！");
                console.info(req);
                if(req.errno=='2'){
                    $('#password-error').show().text(req.msg);
                }else {
                    window.location.href='/index';
                }
            },
            error: function(req) {
                console.info(req);
            }
        })
        e.preventDefault();
    })
});