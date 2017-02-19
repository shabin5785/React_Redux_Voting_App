import {Map,fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it(' handles SET_ENTRIES' , () =>{
		const initialState = Map();
		const action = {type : 'SET_ENTRIES' , entries : ['Abcd']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries : ['Abcd']
		}));
	}); //end of it

	it(' handles NEXT' , () =>{
		const initialState = fromJS({
			entries :['Abcd', 'good']
		})
		const action = {type : 'NEXT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote : {
				pair : ['Abcd', 'good']
			},
			entries : []
		}));
	}); //end of it


	it(' handles VOTE' , () =>{
		const initialState = fromJS({
			vote : {
				pair: ['Abcd','good']
			},
			entries : []
		})
		const action = {type : 'VOTE' , entry :'Abcd'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote : {
				pair : ['Abcd', 'good'],
				tally : {'Abcd' : 1}
			},
			entries : []
		}));
	}); //end of it


	it(' has an initial state' , () =>{
		
		const action = {type : 'SET_ENTRIES' , entries : ['Abcd'] };
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			entries : ['Abcd']
		}));
	}); //end of it

	it(' can be used with reducer' , () => {
		const actions = [
			{type : 'SET_ENTRIES' , entries : ['Abcd','good']},
			{type: 'NEXT'},
			{type : 'VOTE' , entry :'Abcd'},
			{type : 'VOTE' , entry :'good'},
			{type : 'VOTE' , entry :'Abcd'},
			{type : 'NEXT'}
		]

		const finalState = actions.reduce(reducer,Map());

		expect(finalState).to.equal(fromJS({
			winner : 'Abcd'
		}))
	})


});