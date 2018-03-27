var cid = require('can-cid');
var unit = require('steal-qunit');
var domData = require('../can-dom-data');
var domMutate = require('can-dom-mutate');

unit.module('can-dom-data: memory');

unit.test('should clean up data when a node is removed from the document', function (assert) {
	var done = assert.async();
	var node = document.createElement('div');
	var slot = document.getElementById('qunit-fixture');
	domData.set.call(node, 'foo', 'bar');

	slot.appendChild(node);

	var dispose = domMutate.onNodeRemoval(node, function () {
		dispose();
		setTimeout(function () {
			assert.equal(domData.get(node), undefined, 'Data should be empty');

			domData.delete.call(node);
			done();
		}, 26); // MAGIC: must be after safeguard setTimeout
	});

	slot.removeChild(node);
});

unit.test('should not setup cleanup for non-Node objects', function (assert) {
	var notNode = {};
	domData.set.call(notNode, 'foo', 'bar');
	assert.deepEqual(domData._removalDisposalMap, {}, 'should have no disposals');

	domData.delete.call(notNode);
});

unit.test('should dispose of the subscription when all data is removed from a node', function (assert) {
	var node = document.createElement('div');
	domData.set.call(node, 'foo', 'bar');
	domData.clean.call(node, 'foo');
	assert.deepEqual(domData._removalDisposalMap, {}, 'should have no disposals');

	domData.delete.call(node);
});
