
$(function() {
	
	/* hashids logo effect */
	
	var startTimer = 10000,
		hashids = new Hashids(':)', 7),
		timeouts = [2000, 1700, 1400, 1100, 750, 750, 500, 400, 300, 300, 300, 200, 150, 130, 120, 110, 100, 100, 100, 100, 80, 70, 60, 50, 40, 30],
		logo = function(isOriginal) {
			
			var id,
				$logo = $('.header h2 a');
			
			if (isOriginal) {
				$logo.text('hashids');
			} else {
				id = hashids.encrypt(Math.floor(Math.random() * 1000));
				$logo.text(id);
			}
			
		},
		loopLogo = function(i) {
			
			i = i || 0;
			if (timeouts[i]) {
				
				logo();
				setTimeout(function() {
					loopLogo(++i);
				}, timeouts[i]);
				
			} else {
				logo(true);
				setTimeout(loopLogo, startTimer);
			}
			
		};
	
	setTimeout(loopLogo, startTimer);
	
	/* the mad h4x0r effect for links */
	
	$('a:not(.no-effect)').hover(function(event) {
		
		var newText,
			$el = $(this),
			text = $el.text();
		
		$.data($el.get(0), 'text', text);
		
		newText = text
			.replace(/o/gi, '0')
			.replace(/l/g, '1')
			.replace(/\+/i, '-')
			.replace(/s/gi, '5')
			.replace(/t/gi, '7')
			.replace(/i/gi, '1')
			.replace(/a/gi, '4')
			.replace(/e/gi, '3');
		
		$el.text(newText);
		
	}, function(event) {
		
		var $el = $(this),
			text = $.data($el.get(0), 'text');
		
		$el.text(text);
		
	});
	
	/* highlight code */
	
	hljs.initHighlightingOnLoad();
	
	/* slider thingy for use cases */
	
	$('.in-use').flexslider({
		animation: 'slide',
		animationLoop: true,
		itemWidth: 400,
		itemMargin: 1,
		animationSpeed: 750
	});
	
	/* read more button -- how does it work section */
	
	$('.read-more').click(function(event) {
		
		var $el = $(this),
			$target = $('.'+$el.data('target'));
		
		$el.remove();
		$target.removeClass('hidden');
		
	});
	
});
