import React from 'react';
import ReactDOM from 'react-dom';
import DamJS from './components/DamJS';
import meld from 'meld';

import {createStore} from 'redux';
import {Map, List} from 'immutable';
import {Provider} from 'react-redux';
import reducer from './reducer';

(function() {
	const store = createStore(reducer);
	store.dispatch({
		type: 'SET_STATE',
		state: {
			status: {
				streamLinkSet: false
			},
			leaves: {
				"/FX/EURUSD": {subject: "/FX/EURUSD", filtered: false, injected: false, showConfig: false, receivedMessages: 0},
				"/FX/USDCAD": {subject: "/FX/USDCAD", filtered: false, injected: false, showConfig: false, receivedMessages: 0}
			}
		}
	});
	//store.dispatch({
	//	type: 'ADD_FILTERED_MESSAGE',
	//	state: {
	//		subject: "/FX/EURUSD",
	//		message: Map({
	//			id: 1234,
	//			data: Map({
	//				BidRate: "1.234",
	//				AskRate: "2.345"
	//			})
	//		})
	//	}
	//});

	//store.dispatch({
	//	type: 'FILTER_LEAF',
	//	state: {subject: "/FX/EURUSD", filtered: true, injected: false}
	//});
	//setInterval(function() {
	//	store.dispatch({
	//		type: 'RECEIVE_MESSAGE',
	//		state: "/FX/???"
	//	});
	//},1000);


	var damJSContainerElement = document.createElement('div');
	window.document.body.appendChild(damJSContainerElement);
	ReactDOM.render(
			<Provider store={store}>
				<DamJS />
			</Provider>
			,
		damJSContainerElement
	);








	if (typeof caplin !== "undefined" && typeof caplin.streamlink !== "undefined") {
		meld.around(
				caplin.streamlink.impl.event.RecordType1EventImpl.prototype, '_publishSubscriptionResponse', function (joinPoint) {
					const fields = Map(joinPoint.target.getFields());
					store.dispatch({
						type: 'RECEIVE_MESSAGE',
						state: {subject: joinPoint.target.getSubject(), id: Math.random(), fields: fields}
					});
					joinPoint.proceed();
				}.bind(this));
		meld.around(
				caplin.streamlink.StreamLink.prototype, 'subscribe', function(joinPoint) {
					var streamlink = joinPoint.target;
					window.damJSStreamLink = streamlink;
					const backendUrl = window.damJSStreamLink._getStreamLinkCore()._subscriptionManager.protocolHandler.connection.connection.getURL();

					store.dispatch({
						type: 'SET_CONNECTION_URL',
						state: backendUrl
					});
					store.dispatch({
						type: 'SET_STREAMLINK',
						state: true
					});
					joinPoint.proceed();
				}.bind(this));
	}

	function Bridge() {
		setInterval(function() {
			store.dispatch({
				type: 'RECEIVE_MESSAGE',
				state: '/FX/EURUSD'
			})
		}, 1000);
	}

	//new Bridge();

	//DRAG AND DROP -- http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx

	var _startX = 0;            // mouse starting positions
	var _startY = 0;
	var _offsetX = 0;           // current element offset
	var _offsetY = 0;
	var _dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
	var _oldZIndex = 0;         // we temporarily increase the z-index during drag

	function OnMouseDown(e)
	{
		// IE is retarded and doesn't pass the event object
		if (e == null)
			e = window.event;

		// IE uses srcElement, others use target
		var target = e.target != null ? e.target : e.srcElement;

		// for IE, left click == 1
		// for Firefox, left click == 0
		if ((e.button == 1 && window.event != null ||
				e.button == 0) &&
				target.className == 'drag')
		{
			// grab the mouse position
			_startX = e.clientX;
			_startY = e.clientY;

			// grab the clicked element's position
			_offsetX = ExtractNumber(target.style.left);
			_offsetY = ExtractNumber(target.style.top);

			// bring the clicked element to the front while it is being dragged
			_oldZIndex = target.style.zIndex;
			target.style.zIndex = 10000;

			// we need to access the element in OnMouseMove
			_dragElement = target;

			// tell our code to start moving the element with the mouse
			document.onmousemove = OnMouseMove;

			// cancel out any text selections
			document.body.focus();

			// prevent text selection in IE
			document.onselectstart = function () { return false; };
			// prevent IE from trying to drag an image
			target.ondragstart = function() { return false; };

			// prevent text selection (except IE)
			return false;
		}
	}

	function OnMouseMove(e)
	{
		if (e == null)
			var e = window.event;

		// this is the actual "drag code"
		_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
		_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	}

	function OnMouseUp(e)
	{
		if (_dragElement != null)
		{
			_dragElement.style.zIndex = _oldZIndex;

			// we're done with these events until the next OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;
			_dragElement.ondragstart = null;

			// this is how we know we're not dragging
			_dragElement = null;
		}
	}

	function ExtractNumber(value)
	{
		var n = parseInt(value);

		return n == null || isNaN(n) ? 0 : n;
	}

	function InitDragDrop()
	{
		document.onmousedown = OnMouseDown;
		document.onmouseup = OnMouseUp;
	}

	InitDragDrop();


}());