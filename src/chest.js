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
			this._locks = {};
		},

		lock: function(key) {
			this._locks[key]++;
		},

		unlock: function(key) {
			this._locks[key]--;
		},

		lockCount: function(key) {
			if(_.has(this._locks, key)) {
				return this._locks[key];
			}

			return false;
		},

		isLocked: function(key) {
			var lockCount = this.lockCount(key);

			if(_.isNumber(lockCount)) {
				return lockCount <= 0;
			}

			return false;
		},

		findUnlocked: function(data) {
			var keys = [];

			_.forOwn(data, function(_item, key) {
				if(this.isLocked(key) === false) {
					keys.push(key);
				}
			}, this);

			return keys;
		},

		pillage: function(data, adaptor) {
			_.each(this.findUnlocked(), function(key) {
				if(_.isFunction(adaptor)) {
					adaptor(key);
				} else {
					delete data[key];
				}
			}, this);
		}
	});
}));