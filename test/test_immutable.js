import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutable test', () => {

	describe('a number function', () => {
		function increment(currentState) {
			return currentState + 1;
		}
	

		it(' is immutable ' , () =>{
			let state = 42;
			let nextState = increment(state);
			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});
	})


	//list  test
	describe('A list', ()=>{
		function addMovie(currentState, movie){
			return currentState.push(movie);
		}

		it('is Immutable ', ()=> {
			let state = List.of('Abcd', 'good');
			let nextState = addMovie(state,'1234');
			expect(nextState).to.equal(List.of('Abcd','good','1234'));
			expect(state).to.equal(List.of('Abcd','good'));
		});
	});


	//Map
	describe('A tree', () =>{
		function addMovie(currentState, movie){
			// return currentState.set('movies', currentState.get('movies').push(movie));
			//easier syntax.. movlist name can be anything...
			return currentState.update('movies',movlist => movlist.push(movie));
		}


		it('is immutable ', ()=>{
			let state = Map({movies: List.of('Abcd','good')});
			let nextState = addMovie(state,'1234');
			expect(state).to.equal(Map({movies: List.of('Abcd','good')}));
			expect(nextState).to.equal(Map({movies: List.of('Abcd','good','1234')}));
		})
	})

});

