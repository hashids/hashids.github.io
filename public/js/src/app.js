
$(function() {
	
	/* hashids logo effect */
	
	var $email = $('.e'),
		startTimer = 10000,
		hashids = new Hashids(':)', 7),
		timeouts = [2000, 1700, 1400, 1100, 750, 750, 500, 400, 300, 300, 300, 200, 150, 130, 120, 110, 100, 100, 100, 100, 80, 70, 60, 50, 40, 30],
		logo = function(isOriginal) {
			
			var id,
				$logo = $('.header h2 a');
			
			if (isOriginal) {
				$logo.text('hashids');
			} else {
				id = hashids.encode(Math.floor(Math.random() * 1000));
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
	
	/* replace email */
	
	$email.each(function() {
		
		var $el = $(this),
			cut = $el.data('cut').split(','),
			value = $el.text(),
			email = value.slice(0, cut[0]) + '@' + value.slice(cut[0], cut[1]) + '.' + value.slice(cut[1]);
		
		$el.replaceWith('<a href="mailto:'+email+'?subject=Hi">'+email+'</a>');
		
	});
	
	/* the mad h4x0r effect for links */
	
	$('a:not(.no-effect)').hover(function(event) {
		
		var newText, text,
			$el = $(this);
		
		if ($('h2', $el).length) {
			$el = $('h2', $el);
		}
		
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
		
		var text,
			$el = $(this);
		
		if ($('h2', $el).length) {
			$el = $('h2', $el);
		}
		
		text = $.data($el.get(0), 'text');
		$el.text(text);
		
	});
	
	/* highlight code */
	
	hljs.initHighlightingOnLoad();
	
	/* slider thingy for use cases */
	
	$('.in-use').flexslider({
		animation: 'slide',
		animationLoop: true,
		itemWidth: 480,
		itemMargin: 1,
		animationSpeed: 750
	});
	
	/* read more button -- how does it work section */
	
	$('.read-more button').click(function(event) {
		
		var $el = $(this),
			$target = $('.'+$el.data('target'));
		
		$el.remove();
		$target.removeClass('hidden');
		
	});
	
	/* set the year */
	
	$('.copyright-year').text((new Date()).getFullYear());
	
});
