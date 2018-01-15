
var p=1;
//翻页
var pageTotal=0;//总页数
var rowTotal=0;//总行数
var currentPage=0;//当前页数
var startRow=0;//页开始行数
var endRow=0;//页结束行数
var pageSize=5;//每页行数
var comHTML = function (param) {
    let link=param.link,
        img = param.img,
        dt = param.dt,
        dd = param.dd,
        time = param.time,
        htm = '';
    htm += `<div class="newsItem clearfix">
    <a class="ItemLink" href="${link}">
        <img class="imgNew" src="${img}" alt=""/>
        <dl class="articleNew">
            <dt class="articleTitle">${dt}</dt>
            <dd class="articleCon hidden-xs">${dd}</dd>
            <span class="articleTime">${time}</span>
        </dl>
    </a>
</div>`
    $("#newsList").append(htm);
}

/*//调用的话
comHTML({
 link:'',
    img:'',
    dt:'',
    dd:'',
    time:''
})*/
//新闻标题换页
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
                for (var i = 0; i < pageSize; i++) {
                    //调用comHTML
                    comHTML({
                        link:item[i].URL,
                        img:item[i].imageUrl,
                        dt:item[i].ArtTitle ,
                        dd:item[i].ArtCon ,
                        time:item[i].ArtTime
                    })
                    textMath();
                }
                pageBtn(0);
            }else{
                $("#page_ul").empty();
                for (var i = 0; i < pageSize; i++) {
                    comHTML({
                        link:item[i].URL,
                        img:item[i].imageUrl,
                        dt:item[i].ArtTitle ,
                        dd:item[i].ArtCon ,
                        time:item[i].ArtTime
                    })
                    textMath();
                }
                //动态生成页码
                for(var i=1;i<pageTotal+1;i++){
                    $("#page_ul").append(
                        $("<li><a href='javaScript:void(0);'>"+i+"</a></li>")
                    );
                }
                //数字键换页
                $("#page_ul li").on("click",function(){
                    var pageNum=$(this).text();
                    gotoPage(pageNum,p);
                });
                pageBtn(0);
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
            for (var i=startRow;i<endRow;i++) {
                comHTML({
                    link:item[i].URL,
                    img:item[i].imageUrl,
                    dt:item[i].ArtTitle,
                    dd:item[i].ArtCon,
                    time:item[i].ArtTime
                })
                textMath();
            }

        },
        error:function(){
            alert("ajax error");
        }
    });
}
//换页按钮效果
function pageBtn(cuPage) {
    $("#page_ul li").eq(cuPage).addClass('activeBtn').siblings().removeClass('activeBtn');
}
//新闻列表内容简介字符限制
function textMath(){
    var articleCon=$(".articleCon");
    articleCon.each(function(){
        var strCon = $(this).text().substr(0,80) + " ...";
        $(this).text(strCon);
    })
}

$(function(){
    page(1);
    $("#page_prev li").on("click",function(){
        if(currentPage==1){

        }else{
            gotoPage(--currentPage);
            pageBtn(--currentPage);
        }
    });
    $("#page_next li").on("click",function(){
        if(currentPage==pageTotal){

        }else{
            pageBtn(currentPage);
            gotoPage(++currentPage);
        }
    })

})
