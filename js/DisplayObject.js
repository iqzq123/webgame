var Display = function() {
	var Class = {
		initialize: function(props) {
			this.id= '';
			this.name = '';
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
			this.scaleX = 1;
			this.scaleY = 1;
			this.rotation = 0;
			this.alpha = 1;
			this.regX = 0;
			this.regY = 0;

			this.context = null;
			this.drawable = null;

			for(var prop in props) {
				if(this.hasOwnProperty(prop) || this[prop] != undefined)
					this[prop] = props[prop];
			}
		},
		_update: function() {
			this.update();
		},
		update: function() {
			return true;
		},
		_render: function(context) {
			var ctx = this.context || context;
			// 清除画布
			ctx.save();
			this.transform(ctx);
			this.render(ctx);
			ctx.restore();
		},
		render: function(context) {
			context.drawImage(this.drawable, 0 , 0);
		},
		transform: function(ctx) {
			if (this.x != 0 || this.y != 0) ctx.translate(this.x, this.y);
			if (this.regX != 0 || this.regY != 0) ctx.translate(this.regX, this.regY);
			if (this.rotation % 360 != 0) ctx.rotate(this.rotation % 360 * Math.PI / 180);
			if (this.scaleX != 1 || this.scaleY) ctx.scale(this.scaleX, this.scaleY);
			if (this.regX != 0 || this.regY != 0) ctx.translate(-this.regX, -this.regY);
			if (this.alpha > 0) ctx.globalAlpha *= this.alpha;
		},
		cache: function(toImage, type) {
			var w = this.width, h = this.height;
			var canvas = this._createDOM('canvas', {width: w, height: h});
			var context = canvas.getContext('2d');

			if (toImage) {
				var img = new Image();
				img.width = w;
				img.height = h;
				img.src = canvas.toDataURL(type || 'image/png');
				this._cache = img;	
			}
			this._cache = canvas;
		},
		_createDOM: function(type, props) {
			var dom = document.createElement(type);
			for (var p in props) {
				if (p == 'style') {
					for (var s in val) {
						dom.style[s] = val(s);
					}
				} else {
					dom[p] = val;
				}
			}
			return dom;
 		},
 		uncache: function() {
 			this._cache = null;
 		},
 		isCached: function() {
 			return !!this._cache;
 		},
 		toImage: function(type) {
 			return this.cache(true, type);
 		}
	}
	return Class;
}