import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ReactDims = React.createContext(null);

export const DimsProvider = (props) => {
	const domNode = useRef(null);
	const [dimensions, setDimensions] = useState({});
	const [timeoutID, newTimeoutID] = useState(null);

	useEffect(() => {
		setDimensions(domNode.current.getBoundingClientRect());
	}, []);

	useEffect(() => {
		const getNodeDimensions = () => {
			clearTimeout(timeoutID);
			newTimeoutID(
				setTimeout(() => {
					setDimensions(domNode.current.getBoundingClientRect());
				}, props.debounce)
			);
		};
		window.addEventListener('resize', getNodeDimensions);
		return () => {
			window.removeEventListener('resize', getNodeDimensions);
		};
	}, [props.debounce, timeoutID]);

	return (
		<div ref={domNode} style={{ height: '100%' }}>
			<ReactDims.Provider value={dimensions}>
				{props.children}
			</ReactDims.Provider>
		</div>
	);
};

DimsProvider.propTypes = {
	debounce: PropTypes.number,
};

DimsProvider.defaultProps = {
	debounce: 100,
};

export const withContext = (ChildComponent) => {
	return (props) => (
		<ReactDims.Consumer>
			{(incomingDims) => (
				<ChildComponent {...props} dims={incomingDims} />
			)}
		</ReactDims.Consumer>
	);
};
