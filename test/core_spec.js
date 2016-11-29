import {List, Map} from 'immutable';
import {expect} from 'chai';

import {addLeaf, receiveMessage, createLeaf} from '../src/core';

describe('application logic', () => {

	describe('addLeaf', () => {
		it('adds leaves to the list', () => {
			const state = Map({leaves: Map({})});
			const leaf = {subject: "/FX/EURUSD"};
			const nextState = addLeaf(state, leaf);
			expect(nextState).to.equal(Map({
				leaves: Map({"/FX/EURUSD": Map(leaf)})
			}));
		});
	});

	describe('receiveMessage', () => {
		it('adds creates a new leaf if not present', () => {
			const state = Map({leaves: Map({
				"/FX/EURUSD": createLeaf("/FX/EURUSD")
			})});
			const leaf = {subject: "/FX/EURUSD"};
			const nextState = receiveMessage(state, {subject: "/FX/USDCAD", id: "1234",fields: Map({x: 1234})});
			expect(nextState).to.equal(Map({leaves: Map({
				"/FX/EURUSD": createLeaf("/FX/EURUSD"),
				"/FX/USDCAD": createLeaf("/FX/USDCAD").set("receivedMessages",List.of(Map({id: "1234", fields: Map({x: 1234})})))
			})}));
			expect(nextState.get("leaves").get("/FX/USDCAD").get("receivedMessages").size).to.equal(1);
		});
	});
});