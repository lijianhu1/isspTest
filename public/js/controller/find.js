$(function(){
    // $("form").submit(function(e){
    //     e.preventDefault();
    //     var data={};
    //     data.email=$('#form input[name="email"]').val();
    //     data.code=$('#form input[name="code"]').val();
    //     $.ajax({
    //         type:"post",
    //         url:"http://localhost:8888/findpw",
    //         data:data,
    //         success:function(){
    //             console.info("成功！");
    //         },
    //         error: function(request) {
    //             console.info(request);
    //         }
    //     })
    // })
    $('#next').on("click",function(){
        $("form").submit(function(e){
            // e.preventDefault();
            // console.info('123');
        })
    })
});