/* global describe it */

import Vue from 'vue';
import AddTodo from '@/components/AddTodo';

const chai = require('chai');
const assert = chai.assert;

describe('AddTodo.vue', () => {
  it('sets the correct default data', () => {
    assert.equal(AddTodo.data().status, false);
  });
});
