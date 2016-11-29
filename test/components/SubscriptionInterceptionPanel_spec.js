import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import SubscriptionInterceptionPanel from '../../src/components/SubscriptionInterceptionPanel';
import {expect} from 'chai';

describe('SubscriptionInterceptionPanel', () => {

	it('displays 4x3 cells', () => {
		const data = Map({
			filtered:true,
			injected: true
		});
		const component = renderIntoDocument(
			<SubscriptionInterceptionPanel leaf={data}/>
		);

		const rows = scryRenderedDOMComponentsWithTag(component, 'tr');
		expect(rows.length).to.equal(3);

		const headerCells = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(headerCells.length).to.equal(4);

		const cells = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(cells.length).to.equal(8);
	});

	it('toggles the filter for the leaf when buttons in first column clicked', () => {
		let toggleLeafValue = null;
		const toggleFilter = (leaf) => toggleLeafValue = leaf;

		const leaf = Map({
			filtered:true,
			injected: true
		});
		const component = renderIntoDocument(
			<SubscriptionInterceptionPanel toggleFilter={toggleFilter} leaf={leaf}/>
		);
		const entries = scryRenderedDOMComponentsWithTag(component, 'td');

		Simulate.click(entries[1]);
		expect(leaf).to.equal(toggleLeafValue);

		toggleLeafValue = null;

		Simulate.click(entries[5]);
		expect(leaf).to.equal(toggleLeafValue);
	});
});