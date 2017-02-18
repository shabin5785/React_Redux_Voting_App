import {List,Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';


describe('application logic' ,()=>{
	describe('setEntries' , ()=>{

		it('adds the entries to the state' ,()=>{
			const state = Map();
			const entries = ['Abcd','good'];
			const nextState = setEntries(state,entries);
			expect(nextState).to.equal(Map({entries: List.of('Abcd','good')}));
		});
	});


	describe('next' ,() =>{

		it('takes next two entries under vote ' ,() =>{
			const state = Map({
				entries: List.of('Abcd','good','1234')	
			});

			const nextState = next(state);
			expect(nextState).to.equal(Map({

				vote: Map({
					pair : List.of('Abcd','good')
				}),
				entries : List.of('1234')

			}));
		});

		it('puts winner back to entries' ,() => {
			const state = Map({
				vote: Map({
					pair : List.of('Abcd' ,'good'),
					tally : Map({
						'Abcd' : 5,
						'good' :3
					})
				}),
				entries : List.of('1234','something','haha')
			})

			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('1234','something')
				}),
				entries : List.of('haha','Abcd')
			}))

		})//end of it

		it('puts both from tie back to entries' ,() => {
			const state = Map({
				vote: Map({
					pair : List.of('Abcd' ,'good'),
					tally : Map({
						'Abcd' : 5,
						'good' :5
					})
				}),
				entries : List.of('1234','something','haha')
			})

			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('1234','something')
				}),
				entries : List.of('haha','Abcd','good')
			}))

		})//end of it


		it('marks winner when one entry left' , () =>{
			const state = Map({
				vote: Map({
					pair : List.of('Abcd','good'),
					tally : Map({
						'Abcd' :4,
						'good' : 2
					})
				}),
				entries : List()	
			})
			
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner : 'Abcd'
			}))

		})//end of it

	});


	describe('vote',() => {

		it('creates a tally for voted entry' ,()=>{

			const state = Map({
				vote : Map({
					pair :List.of('Abcd','good')
				}),
				entries : List()
			});

			const nextState = vote(state, 'Abcd');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair : List.of('Abcd','good'),
					tally : Map({
						'Abcd' : 1
					})
				}),
				entries : List()
			}))
		})//End of it

		it('adds to the tally for the voted enty' , () => {

			const state = Map({
				vote: Map({
					pair : List.of('Abcd','good'),
					tally : Map({
						'Abcd' : 3,
						'good' : 5
					})
				}),
				entries : List()
			})
			const nextState = vote(state,'Abcd');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair : List.of('Abcd', 'good'),
					tally : Map({
						'Abcd' :4,
						'good' : 5
					})
				}),
				entries : List()
			}));

		});//End of it


	});

});