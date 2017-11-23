var resetBannerTimeout;
$(document).ready(function(){
	createBannerDot();
	setBanner();
});

$(window).load(function(){
	autoBannerCenter();
});

$(window).resize(function(){
	//寬度不定,隨時調整
	clearTimeout(resetBannerTimeout);
	resetBannerTimeout=setTimeout(function(){
		autoBannerCenter();
	}, 200);
});
function setBanner(){
	$('#slick_banner').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		fade: false,
		cssEase: 'linear',
	});
	
	$('#slick_banner').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.b_bar.text_c span.active').removeClass('active');
		$('.b_bar.text_c span:eq('+nextSlide+')').addClass('active');
	});
	autoBannerCenter();
}

function autoBannerCenter(){
	if( window.innerWidth < 768 ){
		var bannerNum=$('#slick_banner .slick-list .slick-track').children('div').length;
		var bannerNumWidth=0;
		
		for(var i=0;i<=bannerNum;i++){
			bannerNumWidth=$('#slick_banner .slick-list .slick-track div:eq('+i+') img').width()-window.innerWidth;
			if( bannerNumWidth>0 ){
				$('#slick_banner .slick-list .slick-track div:eq('+i+') img').css('margin-left', '-'+(bannerNumWidth/2)+'px' );
			}else{
				$('#slick_banner .slick-list .slick-track div:eq('+i+') img').css('margin-left', '' );
			}
		}
	}else{
		$('#slick_banner .slick-list .slick-track div img').css('margin-left', '');
	}
}

//建立Custom Dot
function createBannerDot(){
	var bannerNum=$('.bannerimg').length;
	
	if( 0<bannerNum ){
		for(var i=0;i<bannerNum;i++){
			if(0==i){
				$('.b_bar.text_c').append( $('<span>').addClass('active').attr('onClick', 'changeBannerAndDot('+i+');') );
			}else{
				$('.b_bar.text_c').append( $('<span>').attr('onClick', 'changeBannerAndDot('+i+');') );
			}
		}
	}
}

//Banner Change
function changeBannerAndDot(itemNum){
	$('#slick_banner').slick('slickGoTo', itemNum);
	$('.b_bar.text_c span.active').removeClass('active');
	$('.b_bar.text_c span:eq('+itemNum+')').addClass('active');
}

