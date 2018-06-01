        $(document).on("click",".order-print",function(e){
            e.stopPropagation();
            console.log("打印了");
            var printObj={};
            printObj.order = $(this).data("orderNo");
            printObj.name = $(this).parents("li").find(".order-datails-name").text();
            printObj.phone = $(this).parents("li").find(".order-datails-phone").text();
            printObj.addres = $(this).parents("li").find(".order-datails-addres").text();
            printObj.doorplate = $(this).parents("li").find(".order-datails-doorplate").text();            
            printObj.startDeliverTime = $(this).parents("li").find(".order-datails-startDeliverTime").text();
            printObj.additionalServices = $(this).parents("li").find(".order-datails-additionalServices").data("additional");
            printObj.payTime = $(this).parents("li").find(".order-datails-payTime").text();
            printObj.sumPrice = $(this).parents("li").find(".order-datails-sumPrice").text();
            printObj.weight = $(this).parents("li").find(".order-datails-weight").text();
            printObj.postage = $(this).parents("li").find(".order-datails-postage").text();
            printObj.couponMoney = $(this).parents("li").find(".order-datails-couponMoney").text();
            printObj.payMoney = $(this).parents("li").find(".order-datails-payMoney").text();
            printObj.discountMoney = $(this).parents("li").find(".order-datails-discountMoney").text();
            console.log($(this).parents("li").find(".order-goods-li").length);
            printObj.goodsList = [];
            for(var i = 0;i<$(this).parents("li").find(".order-goods-li").length;i++){
                var goods = {};
                goods.name=$(this).parents("li").find(".order-goods-li").eq(i).find('.order-product-name').text();
                goods.num=$(this).parents("li").find(".order-goods-li").eq(i).find('.order-product-num').text();
                goods.price=$(this).parents("li").find(".order-goods-li").eq(i).find('.order-product-price').text();
                goods.sumPrice = parseFloat(goods.num)*parseFloat(goods.price);
                printObj.goodsList.push(goods);
            }
            console.log(printObj); 
            printOrder(printObj);
            printCount(printObj.order)       
        });

        // addres:"山东省, 潍坊市, 奎文区, 青年路, 41号  120"
        // couponMoney:"2.4"
        // doorplate:"120"
        // // goodsList:[{…}]
        // name:"韦笑笑"
        // payTime:"2018-05-11 14:05:02"
        // payMoney:"37.56"
        // phone:"18515430786"
        // postage:"0"
        // startDeliverTime:"立即配送"
        // sumPrice:"39.96"
        // weight:"0.6360"

        function printOrder(obj){
            console.log("this is obj are you ok",obj);
            var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
            LODOP.PRINT_INIT("打印插件功能演示_代码功能_名片");
            LODOP.SET_PRINT_PAGESIZE(3,500,185,"");            
            // LODOP.ADD_PRINT_RECT(10,0,171,175,0,1);
            // if(str>15){
            //     height += 10;
            //     str-15;
            // };
            // console.log("只好这样做了 也就只能这样做了 不用管他那么多 慢慢做就好了 没有什么大不了 哎");
            LODOP.ADD_PRINT_TEXTA("a",20,0,175,25,"联家超市1店收银小票");
            LODOP.SET_PRINT_STYLEA("a","Alignment","2");
            LODOP.SET_PRINT_STYLEA("a","LetterSpacing",-2);          
            LODOP.SET_PRINT_STYLEA("a","FontName","隶书");
            LODOP.SET_PRINT_STYLEA("a","FontSize",11) ;
            LODOP.ADD_PRINT_TEXTA("b",45,0,175,25,"订单号:"+obj.order);
            LODOP.ADD_PRINT_TEXTA("b",60,0,175,25,"下单时间:"+obj.payTime);
            LODOP.ADD_PRINT_TEXTA("b",75,0,175,25,"收货人:"+obj.name);
            LODOP.ADD_PRINT_TEXTA("b",90,0,175,25,"收货人电话:"+obj.phone);
            LODOP.ADD_PRINT_TEXTA("b",105,0,175,25,"配送时间:"+obj.startDeliverTime);
            LODOP.ADD_PRINT_TEXTA("b",120,0,175,25,"额外服务:"+obj.additionalServices);

            var addresStr = "地址:"+obj.addres;
            var k = 0;
            var height = 135;
            while(addresStr.length > k){
                var str = addresStr.substr(k,15);
                LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,str);
                k+=15;
                height +=15;
            }
            
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"门牌号:"+obj.doorplate);

            height += 15;
            LODOP.ADD_PRINT_LINE(height,0,height,175,2,1);

            height += 5;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"商品名称    单价   数量  小计");

            height += 15;
            for(var i =0 ;i<obj.goodsList.length;i++){
                LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,obj.goodsList[i].name);       
                // LODOP.ADD_PRINT_TEXTA("c",height+15,0,160,35,"1");
                LODOP.ADD_PRINT_TEXTA("e",height+15,75,40,15,obj.goodsList[i].price);
                LODOP.ADD_PRINT_TEXTA("e",height+15,110,30,15,obj.goodsList[i].num);
                LODOP.ADD_PRINT_TEXTA("d",height+15,0,165,35,obj.goodsList[i].sumPrice);               
                height += 30;
            }
            LODOP.ADD_PRINT_LINE(height,0,height,175,2,1);
            height += 5;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"总计(元)");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,obj.sumPrice);


            height += 15;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"重量(kg)");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,obj.weight);

            height += 15;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"配送费(元)");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,obj.postage);

            height += 15;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"折扣(元)");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,"- "+obj.discountMoney);

            height += 15;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"优惠(元)");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,"- "+obj.couponMoney);

            height += 15;
            LODOP.ADD_PRINT_LINE(height,0,height,175,2,1);

            height += 5;
            LODOP.ADD_PRINT_TEXTA("b",height,0,175,35,"实付金额");
            LODOP.ADD_PRINT_TEXTA("d",height,0,165,35,obj.payMoney);

            
            LODOP.SET_PRINT_STYLEA("c","Alignment","3");
            LODOP.SET_PRINT_STYLEA("c","FontSize",7);                          
            LODOP.SET_PRINT_STYLEA("d","Alignment","3");                 
            LODOP.SET_PRINT_STYLEA("b","FontName","宋体");
            LODOP.SET_PRINT_STYLEA("b","FontSize",8);

            

            var iCount=LODOP.GET_PRINTER_COUNT();
            var strPName = [];
            if(iCount !== 0){
                for(var i = 0;i<iCount;i++){
                    strPName.push(LODOP.GET_PRINTER_NAME(i,"PrinterName"));
                }   
            };
            console.log("打印机的信息",strPName);
            if(strPName.length != 0){
                for(var i = 0 ; i < strPName.length;i++){
                    if(strPName[i] == sessionStorage.printer){
                        LODOP.SET_PRINTER_INDEX(sessionStorage.printer);
                        LODOP.PREVIEW();
                        // LODOP.PRINT();
                        break;
                    };
                    if(i == strPName.length-1){
                        alert("未设置打印设备");
                    }
                }
            }else{
                alert("未检测到打印设备");
            }
        }
        


        //打印计数
        function printCount(orderNo){

            var obj = {};
            obj.access_token = sessionStorage.access_token;
            obj.orderNo=orderNo;
            obj.storeId = sessionStorage.storeId;
            obj.from = "web";
            obj.timestamp = parseInt(new Date().getTime()/1000);
            var newObj = srotKeyObj(obj);
            var str = objmd5(newObj);
            var newUrl = url + "order/updatePrintCount?" + str;
            $.ajax({
                url: newUrl,
                type: 'get',
                async:false,
                success: function(data){
                    console.log(data);
                },
                error:function(err){
                    console.log(err);
                }
            });

        };