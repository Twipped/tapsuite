
var suite = require('../');
var stepper = require('stepperbox')();
var assert = require('assert');

stepper.add((method) => {
	assert.strictEqual(method, 'before');
	return Promise.resolve();
});
stepper.add((method) => {
	assert.strictEqual(method, 'beforeEach');
	return Promise.resolve();
});
stepper.add((method) => {
	assert.strictEqual(method, 'test2');
	return Promise.resolve();
});
stepper.add((method) => {
	assert.strictEqual(method, 'afterEach');
	return Promise.resolve();
});
stepper.add((method) => {
	assert.strictEqual(method, 'after');
	return Promise.resolve();
});

suite('test A', (s) => {

	s.before(stepper.as('before'));
	s.after(stepper.as('after'));
	s.beforeEach(stepper.as('beforeEach'));
	s.afterEach(stepper.as('afterEach'));

	s.test('test1', stepper.as('test1'));
	s.skip('skipped', stepper.as('skipped'));
	s.todo('todo', stepper.as('todo'));
	s.only('test2', stepper.as('test2'));
	s.test('test3', stepper.as('test3'));

})
	.then((result) => {
		assert(result);
		assert.strictEqual(stepper.getStep(), 5, 'not all steps were called');
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
