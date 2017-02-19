import {Map,fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store' , () => {

	it(' is a redux store configured with the correct reducer' , () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type : 'SET_ENTRIES',
			entries : ['Abcd','good']
		});

		expect(store.getState()).to.equal(fromJs({
			entries : ['Abcd', 'good'];
		}))

	})
})