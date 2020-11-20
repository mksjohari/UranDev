import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
} from 'react-places-autocomplete';
import styles from '../../modules/locationdropdown.module.scss';
import '../../styles/index.scss';

export default function LocationDropdown(props) {
	const [address, setAddress] = useState('');
	useEffect(() => {
		setAddress(props.data.location);
	}, [props.data.location]);
	const handleChange = (address) => {
		setAddress(address);
	};

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		props.setStepTwo({
			...props.data,
			location: results[0].formatted_address,
		});
		setAddress(results[0].formatted_address);
	};
	return (
		<PlacesAutocomplete
			style={{ width: '50%' }}
			value={address}
			onChange={handleChange}
			onSelect={handleSelect}
		>
			{({
				getInputProps,
				suggestions,
				getSuggestionItemProps,
				loading,
			}) => (
				<div>
					<input
						{...getInputProps({
							placeholder: 'Location',
							className: styles.location_input,
						})}
					/>
					<div className={styles.location_dropdown}>
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion, index) => {
							const className = suggestion.active
								? styles.location_active
								: styles.location;
							const style = suggestion.active
								? {
										backgroundColor: '#faf6f1',
										cursor: 'pointer',
								  }
								: {
										backgroundColor: '#ffffff',
										cursor: 'pointer',
								  };
							return (
								<div
									key={index}
									{...getSuggestionItemProps(suggestion, {
										className,
										style,
									})}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
}
