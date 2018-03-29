var unit = require('steal-qunit');
var domData = require('../can-dom-data');

var node = {};
var foo = {};
var bar = {};

unit.module('can-dom-data', {
	beforeEach: function () {
		domData.delete(node);
	}
});

unit.test('should set and get data', function () {
	domData.set(node, 'foo', foo);
	unit.equal(domData.get(node, 'foo'), foo);
});

unit.test('set() should return the store', function () {
	var foo = {};
	unit.deepEqual(
		domData.set(foo, 'hammer', 'time'),
		{hammer: 'time'},
		'should set the store and return it'
	);
	domData.delete(foo);
});

unit.test('get() should return the whole store', function () {
	var foo = {};
	unit.equal(domData.get(foo), undefined, 'should have no store initially');

	domData.set(foo, 'bar', 'baz');
	unit.deepEqual(domData.get(foo), {bar: 'baz'}, 'should return set store');

	domData.delete(foo);
	unit.equal(domData.get(foo), undefined, 'should have no store finally');
});

unit.test('should delete node', function () {
	domData.set(node, 'foo', foo);
	domData.set(node, 'bar', bar);
	unit.equal(domData.get(node, 'foo'), foo);
	unit.equal(domData.get(node, 'bar'), bar);
	domData.delete(node);
	unit.equal(domData._data.get(node), undefined);
});

unit.test('should delete all data of node', function () {
	domData.set(node, 'foo', foo);
	domData.set(node, 'bar', bar);
	unit.equal(domData.get(node, 'foo'), foo);
	unit.equal(domData.get(node, 'bar'), bar);
	domData.clean(node, 'foo');
	domData.clean(node, 'bar');
	unit.equal(domData.get(node, 'foo'), undefined);
	unit.equal(domData.get(node, 'bar'), undefined);
	unit.equal(domData._data.get(node), undefined);
});
