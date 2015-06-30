(function (root, factory) {
	if(typeof define === 'function' && define.amd) {
		define(['lodash'], factory);
	} else if(typeof module === 'object' && module.exports) {
		module.exports = factory(require('lodash'));
	} else {
		root.Chest = factory(root._);
	}
}(this, function(_) {
	var Cls = function() {
		this.constructor.apply(this, arguments);
	};

	_.extend(Cls.prototype, {
		constructor: function() {
			this._trunk = {};
		},

		lock: function(key) {
			this._trunk[key].locks++;
		},

		unlock: function(key) {
			this._trunk[key].locks--;
		},

		findUnlocked: function() {
			var keys = [];

			_.forOwn(this._trunk, function(item, key) {
				if(item.locks <= 0) {
					keys.push(key);
				}
			});

			return keys;
		},

		pillage: function() {
			_.each(this.findUnlocked(), function(key) {
				delete this._trunk[key];
			}, this);
		},

		toArray: function() {
			var items = [];

			_.forOwn(this._trunk, function(item) {
				items.push(item.obj);
			});

			return items;
		}
	});
}));