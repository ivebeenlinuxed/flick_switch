/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Daniel LaBare                        *
*  Date:   2/4/2008                             *
************************************************/

jQuery.fn.flickSwitch = function(options) {
	
	var state = $(this).prop("checked") ? 'on' : 'off';
	
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		switch_on_container_path: 'flick_switch_container_on.png',
		switch_off_container_path: 'flick_switch_container_off.png',
		switch_path: 'flick_switch.png',
		switch_height: 27,
		switch_width: 94
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	// create the switch
	return this.each(function() {

		var container;
		var image;
		
		// make the container
		container = jQuery('<div class="flick_switch_container" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; position: relative; overflow: hidden"></div>');
		
		// make the switch image based on starting state
		image = jQuery('<img class="flick_switch" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; background-image:url('+settings.switch_path+'); background-repeat:none; background-position:'+(state == 'on' ? 0 : -53)+'px" src="'+(state == 'on' ? settings.switch_on_container_path : settings.switch_off_container_path)+'" /></div>');

		// insert into placeholder
		jQuery(this).css("display", "none");
		jQuery(this).wrap(jQuery(container).html(jQuery(image)));
		console.log($(this).parent().parent());
		$(this).parent().parent().mouseover(function(){
			jQuery(this).css("cursor", settings.mouse_over);
		});

		$(this).parent().parent().mouseout(function(){
			jQuery(this).css("background", settings.mouse_out);
		});

		// click handling
		$(this).parent().parent().click(function() {
			if(state == 'on') {
				jQuery(this).find('.flick_switch').animate({backgroundPosition: -53}, "slow", function() {
					jQuery(this).attr('src', settings.switch_off_container_path);
					jQuery("input", this).attr("checked", false);
				});
				state = 'off';
			}
			else {
				jQuery(this).find('.flick_switch').animate({backgroundPosition: 0}, "slow", function() {
					jQuery("input", this).attr("checked", true);
				});
				jQuery(this).find('.flick_switch').attr('src', settings.switch_on_container_path);
				state = 'on';
			}
		});		

	});
	
};
