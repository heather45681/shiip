$(document).ready(function(){
	setRightNav();
	setOpicatyRightNav();
	
	setFiSelect();
	setInput();
	setPackageChecked();
	setSelectZIndex();
});

//右側顯示
function setOpicatyRightNav(){
	$('.sidemenu.thing_pci').css('opacity', 0);
	opicatyRightNav();
	$(window).scroll(function(){
		opicatyRightNav();
	});
}

function opicatyRightNav(){
	var windowTop=document.documentElement.scrollTop;
	var showHeight=$('header').height()+$('#banner').height()-($('.sidemenu.thing_pci').height()/2);
	$('.sidemenu.thing_pci').css('opacity', windowTop/showHeight);
}

//右側滑動		
function setRightNav(){
	$('.sidemenu.thing_pci a').on( 'click', function( event ){
		event.preventDefault();
		var thisTop=$( $(this).attr('href') ).offset().top-$('header').height();
		var bodyElement = $("html, body");
		bodyElement.stop().animate( {scrollTop: thisTop}, 500);
	});
}

function setSelectZIndex(){
	if( 0<$(".f_block .f_item").length ){
		var zIndexDef=100;
		for(var i=0;i<$(".f_block .f_item").length;i++){
			$('.f_block .f_item:eq('+i+')').css('z-index', zIndexDef);
			zIndexDef--;
		}
	}
	if( $('.f_item.f_note.f_item_input').length ){
		$('.f_item.f_note.f_item_input').css('z-index', zIndexDef);
	}
}

function setFiSelect(){
	//選項點選
	$(".f_item_select").on( 'click', function() {
		closeSelect( $(this).index() );
		if( !$(this).find('.fi_select').prop('className').match(/fi_focus/g) ){
			$(this).addClass('fi_focus');
			$(this).find('.fi_select').addClass('fi_focus');
		}else{
			$(this).find('.fi_select').removeClass('fi_focus');
			
			//if( !$(this).find('option[selected=true]').length ){
			if( !$(this).find('option[selected=selected]').length ){
				$(this).removeClass('fi_focus');
			}else{
				$(this).addClass('fi_focus');
			}
		}
	});
	
	//設定選項
	$('.fi_select > ').on( 'click', function(){
		$(this).parent().siblings('select').children().attr('selected', false);
		if( 1<=$(this).index() ){
			$(this).parent().siblings('select').children(':eq('+($(this).index())+')').attr('selected', true);
			
			//寫入選項文字
			//$(this).parents('.fi_select').siblings('.fia_txt').html( $(this).parent().siblings('select').children(':eq('+($(this).index()-1)+')').html() );
			$(this).parents('.fi_select').siblings('.fia_txt').html( $(this).parent().siblings('select').children(':eq('+($(this).index())+')').html() );
			//$(this).parents('.f_item_select').addClass('fi_done');
		}else{
			//移除選項文字
			$(this).parents('.fi_select').siblings('.fia_txt').html("");
			//$(this).parents('.f_item_select').removeClass('fi_done');
		}
	});
	
	//點旁邊要關閉
	$(document).click(function(event) {
		if( !$(event.target).closest(".f_item_select").length ) {
			if( 0<$('.fi_select.fi_focus').length ){
				closeSelect(null);
				$('.fi_select').removeClass('fi_focus');
			}
		}
	});
}

//確認是否關閉
function closeSelect(nowNum){
	var fiSelectNum = $('.fi_select').siblings('select').length;
	if( 0<fiSelectNum ){
		for(var i=0;i<fiSelectNum;i++){
			if(i!=nowNum){
				//if( !$('select:eq('+i+')').find('option[selected=true]').length ){
				if( !$('select:eq('+i+')').find('option[selected=selected]').length ){
					$('select:eq('+i+')').parents('.f_item_select').removeClass('fi_focus');
					//$('select:eq('+i+')').find('.fi_select').removeClass('fi_focus');
				}
				$('select:eq('+i+')').siblings('.fi_select').removeClass('fi_focus');
			}
		}
	}
}

//設定Input
function setInput(){
	//$('.f_item_input .fi_answer input').on( 'click', function(){
	$('.f_item_input .fi_answer input').focus(function(){
		closeInput();
		$(this).parents('.f_item_input').addClass('fi_focus');
	});
	
	//點旁邊要關閉
	$(document).click(function(event) {
		if( !$(event.target).closest(".f_item_input").length ) {
			closeInput();
		}
	});
}

//關閉Input
function closeInput(){
	var fiInputNum=$('.f_item_input.fi_focus').length;
	if( 0<fiInputNum ){
		for(var i=0;i<fiInputNum;i++){
			if( ""==$('.f_item_input.fi_focus:eq('+i+')').find('input').val() ){
				$('.f_item_input.fi_focus:eq('+i+')').removeClass('fi_focus');
			}
		}
	}
}

//設定Checked
function setPackageChecked(){
	$('#package').on( 'click', function(){
		if( $(this).prop('checked') ){
			$('.f_item.f_note').show()
		}else{
			$('.f_item.f_note').hide();
		}
	});
}
