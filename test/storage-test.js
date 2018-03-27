var unit = require('steal-qunit');
var domData = require('../can-dom-data');

var foo = {};
var bar = {};

unit.module('can-dom-data: storage', {
	beforeEach: function () {
		domData.delete();
	}
});

unit.test('should set and get data', function () {
	domData.set('foo', foo);
	unit.equal(domData.get('foo'), foo);
});

unit.test('set() should return the store', function () {
	var foo = {};
	unit.deepEqual(
		domData.set.call(foo, 'hammer', 'time'),
		{hammer: 'time'},
		'should set the store and return it'
	);
	domData.delete.call(foo);
});

unit.test('get() should return the whole store', function () {
	var foo = {};
	unit.equal(domData.get.call(foo), undefined, 'should have no store initially');

	domData.set.call(foo, 'bar', 'baz');
	unit.deepEqual(domData.get.call(foo), {bar: 'baz'}, 'should return set store');

	domData.delete.call(foo);
	unit.equal(domData.get.call(foo), undefined, 'should have no store finally');
});

unit.test('should delete node', function () {
	domData.set('foo', foo);
	domData.set('bar', bar);
	unit.equal(domData.get('foo'), foo);
	unit.equal(domData.get('bar'), bar);
	domData.delete();
	unit.equal(domData._data['1'], undefined);
});

unit.test('should delete all data of node', function () {
	domData.set('foo', foo);
	domData.set('bar', bar);
	unit.equal(domData.get('foo'), foo);
	unit.equal(domData.get('bar'), bar);
	domData.clean('foo');
	domData.clean('bar');
	unit.equal(domData.get('foo'), undefined);
	unit.equal(domData.get('bar'), undefined);
	unit.equal(domData._data['1'], undefined);
});
