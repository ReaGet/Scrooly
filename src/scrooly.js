;(function() {
	function Scrooly() {
		var _self = this;
		var keys = [];
		var pointKeys = [];
		this.trigger = null;
		this.keydown = function(e) {
			keys[e.keyCode] = true;
			// CTRL + ALT
			// if (!keys[17] || !keys[18] || e.keyCode == 17 || e.keyCode == 18) return;

			if (!keys[_self.trigger] || e.keyCode == _self.trigger) return;

			e.preventDefault ? e.preventDefault() : (e.returnValue = false);

			if (!pointKeys[e.keyCode]) {
				pointKeys[e.keyCode] = {
					offset: window.scrollY || document.documentElement.scrollTop
				}
				appendPoint(pointKeys[e.keyCode].offset, e);
			} else {
				jumpTo(pointKeys[e.keyCode].offset);
			}

		};
		this.keyup = function(e) {
			keys[e.keyCode] = false;
		};
		var jumpTo = function(y) {
			window.scrollTo(0, y);
		};
		var appendPoint = function(y, e) {
			var point = document.createElement('div');
			point.innerText = e.key;
			point.className = 'scrooly';
			point.setAttribute('scrooly-key', e.keyCode)
			point.style.top = y + (window.innerHeight / 2) + 'px';
			point.addEventListener('mouseup', removePoint);
			document.body.appendChild(point);
		};
		var removePoint = function(e) {
			if (e.button != 0) return;
			var key = e.target.getAttribute('scrooly-key');
			delete pointKeys[key];
			// console.log(pointKeys)
			document.body.removeChild(e.target);
		};
	}

	Scrooly.prototype.init = function(opts) {
		var options = {};
			options.trigger = 18;
			options = opts || options;

		this.trigger = options.trigger;

		window.addEventListener('keydown', this.keydown);
		window.addEventListener('keyup', this.keyup);
	}

	new Scrooly().init({
		trigger: 18 // ALT
	});
})();