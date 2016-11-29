(function(){
	var w, d, s;
	setTimeout(function () {
		w = window;
		d = w.document;
		s = d.createElement('script');
		s.src = 'http://localhost:8080/dist/bundle.js';
		d.head.appendChild(s);
	}, 0);
}());