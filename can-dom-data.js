'use strict';
var namespace = require('can-namespace');

var isEmptyObject = function(obj){
	/* jshint -W098 */
	for(var prop in obj) {
		return false;
	}
	return true;
};

var data = new WeakMap();

// delete this node's `data`
// returns true if the node was deleted.
var deleteNode = function() {
	var nodeDeleted = false;
	if (data.has(this)) {
		nodeDeleted = true;
		data.delete(this);
	}
	return nodeDeleted;
};

var setData = function(name, value) {
	var store = data.get(this);
	if (store === undefined) {
		store = {};
		data.set(this, store);
	}
	if (name !== undefined) {
		store[name] = value;
	}
	return store;
};

/*
 * Core of domData that does not depend on mutationDocument
 * This is separated in order to prevent circular dependencies
 */
var domData = {
	_data: data,

	get: function(key) {
		var store = data.get(this);
		return key === undefined ? store : store && store[key];
	},

	set: setData,

	clean: function(prop) {
		var itemData = data.get(this);
		if (itemData && itemData[prop]) {
			delete itemData[prop];
		}
		if (isEmptyObject(itemData)) {
			deleteNode.call(this);
		}
	},

	delete: deleteNode
};

if (namespace.domData) {
	throw new Error("You can't have two versions of can-dom-data, check your dependencies");
} else {
	module.exports = namespace.domData = domData;
}
