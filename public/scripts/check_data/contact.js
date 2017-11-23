//新增-確認欄位是否正確！
function chkcontact()
{	
	// alert($("form#sendForm #from_name option[selected=selected]").val());
	//from	
	if( ($("form#sendForm #from_name option[selected=selected]").val() == "") || (typeof($("form#sendForm #from_name option[selected=selected]").val()) == "undefined") ){
        alert("please select From！");
        $("form#sendForm #from_name").focus();
        return false;
    }
    //to
	if(  ($("form#sendForm #to_name option[selected=selected]").val() == "") || (typeof($("form#sendForm #to_name option[selected=selected]").val()) == "undefined")  ){
        alert("please select To！");
        $("form#sendForm #to_name").focus();
        return false;
    }
    //Box Dimenssion
	if( ($("form#sendForm #box_dimenssion option[selected=selected]").val() == "") || (typeof($("form#sendForm #box_dimenssion option[selected=selected]").val()) == "undefined") ){
        alert("please select Box Dimenssion！");
        $("form#sendForm #box_dimenssion").focus();
        return false;
    }	
    //Boxes
	if( ($("form#sendForm #boxes option[selected=selected]").val() == "") || (typeof($("form#sendForm #boxes option[selected=selected]").val()) == "undefined") ){
        alert("please select Boxes！");
        $("form#sendForm #boxes").focus();
        return false;
    }
    //Delivery Date
	if( $("form#sendForm #delivery_date").val() == "" ){
        alert("please select Delivery Date！");
        $("form#sendForm #delivery_date").focus();
        return false;
    }
    //E-mail
	if( $("form#sendForm #email").val() == "" ){		
			alert("please input email！");
			$("form#sendForm #email").focus();
			return false;
	}else{
		var strEmail = $("form#sendForm #email").val();
		if(!checkEmail(strEmail)){
			alert("email format error！");
			$("form#sendForm #email").focus();
			return false;
		}
	}
	//contact Number
   	if($("form#sendForm #contact_number").val() != ""){
		var number = $("form#sendForm #contact_number").val();
		if(!checkNumber(number)){	
			alert("Contact Number只能填寫數字！");
        	$("form#sendForm #contact_number").focus();
			return false;	
		}
	}

	return true;
}
//下載
function download_excel(){		
	if(chkcontact()){			
		var from_name= $("form#sendForm #from_name option[selected=selected]").val();	
		var to_name= $("form#sendForm #to_name").val();	
		var box_dimenssion = $("form#sendForm #box_dimenssion").val();	
		var boxes= $("form#sendForm #boxes").val();
		var delivery_date= $("form#sendForm #delivery_date").val();
		var first_name= $("form#sendForm #first_name").val();
		var last_name= $("form#sendForm #last_name").val();
		var email= $("form#sendForm #email").val();
		var contact_number= $("form#sendForm #contact_number").val();
		var coupon_code= $("form#sendForm #coupon_code").val();
		var package_details= $("form#sendForm #package_details").val();
		var q_price= $("form#sendForm #price").val();		
		window.open('download.php?from_name='+from_name+'&to_name='+to_name+'&box_dimenssion='+box_dimenssion+'&boxes='+boxes+'&delivery_date='+delivery_date+'&package_details='+package_details+'&first_name='+first_name+'&last_name='+last_name+'&email='+email+'&contact_number='+contact_number+'&coupon_code='+coupon_code+'&price='+q_price);
	}
	return false;
}
//送出表單
function gosubmit(){
	
	if(chkcontact()){			
		var from_name= $("form#sendForm #str_from").val();	
		var to_name= $("form#sendForm #str_to").val();	
		var box_dimenssion = $("form#sendForm #str_dimension").val();	
		var boxes= $("form#sendForm #boxes").val();
		var delivery_date= $("form#sendForm #delivery_date").val();
		var first_name= $("form#sendForm #first_name").val();
		var last_name= $("form#sendForm #last_name").val();
		var email= $("form#sendForm #email").val();
		var contact_number= $("form#sendForm #contact_number").val();
		var coupon_code= $("form#sendForm #coupon_code").val();
		var package_details= $("form#sendForm #package_details").val();
		var q_price= $("form#sendForm #price").val();		
		
		window.location.href ="mailto:support@shiip.tw?subject=SHiip&body=From:"+from_name+"%0ATo:"+to_name+"%0ABox Dimenssion:"+box_dimenssion+"%0ABoxes:"+boxes+"%0ADelivery_Date:"+delivery_date+"%0AFirst Name:"+first_name+"%0ALast Name:"+last_name+"%0AE-mail:"+email+"%0AContact Number:"+contact_number+"%0ACoupon Code:"+coupon_code+"%0APackage Details:"+package_details+"%0APrice:"+q_price;
	}	

	
}

//計算金額Step1 判斷coupon 有沒有填 並且判斷有沒有用
function calc_price(){
	if(chkcontact()){
		var coupon_code = $("form#sendForm #coupon_code").val();
		$.ajax({
			type: 'POST',
			url: 'ajax/coupon_check.php',
			data: {'coupon_code':coupon_code},
			cache: false,
			dataType:'json',
		})
		.done(function(data) {		
			if(data['status'] == "N" ){
				alert("Coupon Code error！");
			}else{													
				calc_price2(true,data['coupon_price'],data['coupon_type']);
			}
		});		
	}	
}
//搜尋價格表
function calc_price2(status,coupon_price,coupon_type){
	if(status==true){	
		var from_name = $("form#sendForm #from_name option[selected=selected]").val();
		var to_name = $("form#sendForm #to_name").val();
		var box_dimenssion = $("form#sendForm #box_dimenssion").val();
		var boxes = $("form#sendForm #boxes").val();

		var delivery_date= $("form#sendForm #delivery_date").val();
		var first_name= $("form#sendForm #first_name").val();
		var last_name= $("form#sendForm #last_name").val();
		var email= $("form#sendForm #email").val();
		var contact_number= $("form#sendForm #contact_number").val();
		var coupon_code= $("form#sendForm #coupon_code").val();
		var package_details= $("form#sendForm #package_details").val();		
		$.ajax({
			type: 'POST',
			url: 'ajax/price_check.php',
			data: {				
				'from_name':from_name,
				'to_name':to_name,
				'box_dimension':box_dimenssion,
				'boxes':boxes,
				'coupon_price':coupon_price,
				'coupon_type' : coupon_type,
				'delivery_date':delivery_date,
				'first_name':first_name,
				'last_name':last_name,
				'email':email,
				'contact_number':contact_number,
				'coupon_code':coupon_code,
				'package_details':package_details,
				},
			cache: false,
			dataType:'json',
		})
		.done(function(data) {		
			if(data['status'] == "N" ){
				alert("price error！");
			}else{					
				$("form#sendForm #show_price").text("$"+data['price']);
				$("form#sendForm #price").val(data['price']);
				$("form#sendForm #str_from").val(data['str_from']);
				$("form#sendForm #str_to").val(data['str_to']);
				$("form#sendForm #str_dimension").val(data['str_dimension']);
				$("form#sendForm #quote_now").css('display','none');
				$("form#sendForm #gosubmit").css('display','');	
				$("form#sendForm #reset").css('display','');			
				$("form#sendForm #coupon_code").prop('disabled',"disabled");				
				$("form#sendForm #download_excel").css("display","");	
				$("form#sendForm #select1").removeClass('f_item_select');	
				$("form#sendForm #select2").removeClass('f_item_select');	
				$("form#sendForm #select3").removeClass('f_item_select');	
				$("form#sendForm #select4").removeClass('f_item_select');	


			}
		});
	}
}

// function reset(){
// 	alert("HI");	
// 	// var from_name= $("form#sendForm #from_name").val();	
// 	// var to_name= $("form#sendForm #to_name").val();	
// 	// var box_dimenssion = $("form#sendForm #box_dimenssion").val();	
// 	// var boxes= $("form#sendForm #boxes").val();
// 	$("form#sendForm #delivery_date").prop('value',"");
// 	$("form#sendForm #first_name").prop('value',"").removeClass('fi_focus');	
// 	$("form#sendForm #last_name").prop('value',"").removeClass('fi_focus');
// 	$("form#sendForm #email").prop('value',"");
// 	$("form#sendForm #contact_number").prop('value',"");
// 	$("form#sendForm #contact_number").removeClass('fi_focus');
// 	$("form#sendForm #coupon_code").prop('value',"").prop('disabled',"").removeClass('fi_focus');	
// 	$("form#sendForm #package_details").prop('value',"");
// 	$("form#sendForm #package_details").removeClass('fi_focus');
// 	$("form#sendForm #price").prop('value',"");
// 	$("form#sendForm #str_from").prop('value',"");
// 	$("form#sendForm #str_to").prop('value',"");
// 	$("form#sendForm #str_dimension").prop('value',"");
// 	$("form#sendForm #quote_now").css('display','');
// 	$("form#sendForm #show_price").text("$0.00");	
// 	$("form#sendForm #gosubmit").css('display','none');	
// 	$("form#sendForm #reset").css('display','none');
// 	$("form#sendForm #download_excel").css("display","none");
// 	$("form#sendForm #select1").addClass('f_item_select');	
// 	$("form#sendForm #select2").addClass('f_item_select');	
// 	$("form#sendForm #select3").addClass('f_item_select');	
// 	$("form#sendForm #select4").addClass('f_item_select');	
// }