import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import StreamLinkStatusPanel from '../../src/components/StreamLinkStatusPanel';
import {expect} from 'chai';

describe('StreamLinkStatusPanel', () => {

	it('displays message when streamlink component is missing', () => {
		const data = Map({
			streamLinkSet: false
		})
		const component = renderIntoDocument(
			<StreamLinkStatusPanel status={data} />
		);
		const entries = scryRenderedDOMComponentsWithTag(component, 'div');

		expect(entries.length).to.equal(1);
		expect(entries[0].textContent).to.equal('Please make a subscription to get details');
	});

	it('displays the connection url when set', () => {
		const data = Map({
			streamLinkSet: true,
			connectionUrl: "google.com"
		})
		const component = renderIntoDocument(
			<StreamLinkStatusPanel status={data} />
		);

		const connectionUrlRow = scryRenderedDOMComponentsWithClass(component, 'connectionUrlTableRow');

		expect(connectionUrlRow.length).to.equal(1);
		expect(connectionUrlRow[0].getElementsByTagName('td')[1].textContent).to.equal('google.com');
	});
	//
	//it('displays FilteredMessageTable there is one', () => {
	//	const component = renderIntoDocument(
	//		<FilteredMessagesList filteredMessages={List.of(Map({data: Map({})}))} />
	//	);
	//	const entries = scryRenderedDOMComponentsWithTag(component, 'span');
	//	expect(entries.length).to.equal(0);
	//
	//	const keyValuePairTableEntries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairEditorTable');
	//	expect(keyValuePairTableEntries.length).to.equal(1);
	//});
	//
	//it('callsback with the id when field edited', () => {
	//	let  newId=null, newKey=null, newValue=null;
	//	const changeValue = (id, key, value) => {newId  = id, newKey = key, newValue = value};
	//
	//	const component = renderIntoDocument(
	//		<FilteredMessagesList onChange={changeValue} filteredMessages={List.of(Map({
	//			id: "1234",
	//			data:  Map({BidPrice: '1.2345', AskPrice: '2.3456'})
	//			}))} />
	//	);
	//
	//	const entries = scryRenderedDOMComponentsWithClass(component, 'keyValuePairEditorTableRow');
	//	const [bidField, askField] = entries.map(e => e.getElementsByTagName('input')[0]);
	//
	//	Simulate.change(bidField, { target: { value: '1.234' } });
	//	expect(newKey).to.equal('BidPrice');
	//	expect(newValue).to.equal('1.234');
	//	expect(newId).to.equal('1234');
	//});

});