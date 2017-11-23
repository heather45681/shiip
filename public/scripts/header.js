$(document).ready(function(){
	setMobileMenu();
});

function setMobileMenu(){
	$('.h_btn').on( 'click', function(){
		mobileMenuSwitch(null);
	});
	
	$(window).resize(function(){
		if( 767<window.innerWidth ){
			mobileMenuSwitch(false);
		}
	});
}

function mobileMenuSwitch(switchType){
	if(null==switchType){
		$('.h_link_sp').toggle();
	}else{
		if( switchType ){
			$('.h_link_sp').show();
		}else{
			$('.h_link_sp').hide();
		}
	}
}
