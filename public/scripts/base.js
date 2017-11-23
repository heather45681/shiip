//確認是否為Email
function checkEmail(strEmail) {
	emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;	
	if(strEmail.search(emailRule)!= -1){
		return true;
	}else{
		return false; 
	}
}
//確認聯絡電話(市話)
function checkTel(strTel){	
	if (strTel.search(/^[0][1-9]{1,1}-([0-9]{5,8})+((#([0-9]){1,5}){0,1})$/)!=-1) {
		return true;
	}else {
	   return false;
	}	
}

//確認手機號碼
function checkMobile(strMobile){	
	if (strMobile.search(/^09[0-9]{8}$/)!=-1) {
		return true;
	}else {
		return false;
	}
}

function checkNumber(number) {
	a = number;
	date = a.match(/[^0-9]/g);
	if(date || !a){	
		return false;
	}else{
		return true;
	}
}

//重新取得驗證碼
function reSIImage(){
	var d1 = new Date();
	var when=d1.getTime();
	document.getElementById('siimage').src = "system_info/plugin/code/securimage_show.php?sid="+when;
}

