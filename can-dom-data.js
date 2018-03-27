'use strict';
var namespace = require('can-namespace');
var domMutate = require('can-dom-mutate');
var CID = require("can-cid");

var isEmptyObject = function(obj){
	/* jshint -W098 */
	for(var prop in obj) {
		return false;
	}
	return true;
};

var data = {};
var removedDisposalMap = {};

// delete this node's `data`
// returns true if the node was deleted.
var deleteNode = function() {
	var id = CID.get(this);
	var nodeDeleted = false;
	if(id && data[id]) {
		nodeDeleted = true;
		delete data[id];
	}
	if (removedDisposalMap[id]) {
		removedDisposalMap[id]();
		delete removedDisposalMap[id];
	}
	return nodeDeleted;
};

var setData = function(name, value) {
	var id = CID(this);
	var store = data[id] || (data[id] = {});
	if (name !== undefined) {
		store[name] = value;
		var isNode = !!(this && typeof this.nodeType === 'number');
		if (isNode && !removedDisposalMap[id]) {
			var target = this;
			removedDisposalMap[id] = domMutate.onNodeRemoval(target, function () {
				if (!target.ownerDocument.contains(target)) {
					setTimeout(function () {
						deleteNode(target);
					}, 13);
				}
			});
		}
	}
	return store;
};

/*
 * Core of domData that does not depend on mutationDocument
 * This is separated in order to prevent circular dependencies
 */
var domData = {
	_data: data,
	_removalDisposalMap: removedDisposalMap,

	getCid: function() {
		// TODO log warning! to use can-cid directly
		return CID.get(this);
	},

	cid: function(){
		// TODO log warning!
		return CID(this);
	},

	expando: CID.domExpando,

	get: function(key) {
		var id = CID.get(this),
			store = id && data[id];
		return key === undefined ? store : store && store[key];
	},

	set: setData,

	clean: function(prop) {
		var id = CID.get(this);
		var itemData = data[id];
		if (itemData && itemData[prop]) {
			delete itemData[prop];
		}
		if(isEmptyObject(itemData)) {
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
