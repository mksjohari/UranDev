import React from 'react';

function Checkbox(props) {
	return (
		<>
			<input
				className="inp-cbx"
				id={props.id}
				type="checkbox"
				style={{ display: 'none' }}
				defaultChecked={props.checked}		// true or false
				onChange={() => props.onChange(props.id, props.setCheck)}		// id, set True
			/>
			<label className="cbx" htmlFor={props.id}>
				<span>
					<svg width="8.6px" height="7.2px" viewBox="0 0 8.6 7.2">
						<polyline points="1.06 4.36 3.22 6.52 7.54 0.76"></polyline>
					</svg>
				</span>
				<span>{props.label}</span>
			</label>
			<br></br>
		</>
	);
}

export default Checkbox;
