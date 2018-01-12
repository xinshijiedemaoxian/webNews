
var p=1;
//翻页
var pageTotal=0;//总页数
var rowTotal=0;//总行数
var currentPage=0;//当前页数
var startRow=0;//页开始行数
var endRow=0;//页结束行数
var pageSize=2;//每页行数
$('.find_nav_list ul li').each(function(){
    $(this).click(function(){
        p=$(this).index()+1;
        page(p)
    })
})

function page(p){
    $.ajax({
        url: 'datas/new' + p + '.json',
        type: 'post',
        dataType:"json",
        timeout:1000,
        success: function (item) {
            $("#newsList").empty();
            rowTotal=item.length;
            pageTotal=Math.ceil(rowTotal/pageSize);
            currentPage=1;
            if(pageTotal==1){
                var str='';
                for (var i = 0; i < pageSize; i++) {
                    /*$("#newsList").append(
                            $('<div class="newsItem clearfix">'+
                                    '<a class="ItemLink" href="'+item[i].URL+'">'+
                                    '<img class="imgNew" src="'+item[i].imageUrl+'" alt="'+item[i].imgAlt+'">'+
                                    '<dl class="articleNew"> <dt class="articleTitle"> '+
                                    item[i].ArtTitle +
                                    '</dt><dd class="articleCon hidden-xs"> '+
                                    item[i].ArtCon +
                                    '</dd><span class="articleTime"> '+
                                    item[i].ArtTime +
                                    '</span> </dl> </a> </div>'
                            )
                    );*/
                    str+='<div class="newsItem clearfix">'+
                            '<a class="ItemLink" href="'+item[i].URL+'">'+
                            '<img class="imgNew" src="'+item[i].imageUrl+'" alt="'+item[i].imgAlt+'">'+
                            '<dl class="articleNew"> <dt class="articleTitle"> '+
                            item[i].ArtTitle +
                            '</dt><dd class="articleCon hidden-xs"> '+
                            item[i].ArtCon +
                            '</dd><span class="articleTime"> '+
                            item[i].ArtTime +
                            '</span> </dl> </a> </div>'
                }
                $("#newsList").html(str);
            }else{
                var str='';
                $("#page_ul").empty();
                for (var i = 0; i < pageSize; i++) {
                    str+='<div class="newsItem clearfix">'+
                            '<a class="ItemLink" href="'+item[i].URL+'">'+
                            '<img class="imgNew" src="'+item[i].imageUrl+'" alt="'+item[i].imgAlt+'">'+
                            '<dl class="articleNew"> <dt class="articleTitle"> '+
                            item[i].ArtTitle +
                            '</dt><dd class="articleCon hidden-xs"> '+
                            item[i].ArtCon +
                            '</dd><span class="articleTime"> '+
                            item[i].ArtTime +
                            '</span> </dl> </a> </div>'
                }
                $("#newsList").html(str);
                for(var i=1;i<pageTotal+1;i++){
                    $("#page_ul").append(
                            $("<li><a href='javaScript:void(0);'>"+i+"</a></li>")
                    );
                }
                $("#page_ul li").on("click",function(){
                    var pageNum=$(this).text();
                    gotoPage(pageNum,p);
                });
            }

        },
        error: function () {
            alert('出错了');
        }
    })
}
function gotoPage(pageNum){
    $.ajax({
        url: 'datas/new' + p + '.json',
        type:"POST",
        dataType:"json",
        timeout:1000,
        success:function(item){
            currentPage=pageNum;
            startRow=pageSize*(pageNum-1);
            endRow=startRow+pageSize;
            endRow=(rowTotal>endRow)?endRow:rowTotal;
            $("#newsList").empty();
            var str='';
            for (var i=startRow;i<endRow;i++) {
                str+='<div class="newsItem clearfix">'+
                        '<a class="ItemLink" href="'+item[i].URL+'">'+
                        '<img class="imgNew" src="'+item[i].imageUrl+'" alt="'+item[i].imgAlt+'">'+
                        '<dl class="articleNew"> <dt class="articleTitle"> '+
                        item[i].ArtTitle +
                        '</dt><dd class="articleCon hidden-xs"> '+
                        item[i].ArtCon +
                        '</dd><span class="articleTime"> '+
                        item[i].ArtTime +
                        '</span> </dl> </a> </div>'
            }
            $("#newsList").html(str);
        },
        error:function(){
            alert("ajax error");
        }
    });
}
$(function(){
    /*   $('#pageTool').Paging({pagesize:5,count:50,callback:function(page,size,count){
     console.log(arguments)
     alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
     }});*/
    page(1)
    $("#page_prev li").on("click",function(){
        if(currentPage==1){

        }else{
            gotoPage(--currentPage);
        }
    });
    $("#page_next li").on("click",function(){
        if(currentPage==pageTotal){

        }else{
            gotoPage(++currentPage);
        }
    })
})
