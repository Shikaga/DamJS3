import {Map, List} from 'immutable';
import {setState, addLeaf, filterLeaf, toggleLeafConfig,
		receiveMessage, addFilteredMessage, setConnectionUrl,
		setStreamLinkSet} from './core';


export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
		case 'ADD_LEAF':
			return addLeaf(state, action.state);
		case 'FILTER_LEAF':
			return filterLeaf(state, action.state);
		case 'TOGGLE_LEAF_CONFIG':
			return toggleLeafConfig(state, action.state);
		case 'RECEIVE_MESSAGE':
			return receiveMessage(state, action.state);
		case 'ADD_FILTERED_MESSAGE':
			return addFilteredMessage(state, action.state);
		case 'SET_CONNECTION_URL':
			return setConnectionUrl(state, action.state);
		case 'SET_STREAMLINK':
			return setStreamLinkSet(state, action.state);
	}
	return state;
}