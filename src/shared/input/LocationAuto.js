import React from 'react';
import { useField } from 'formik';
import PlacesAutocomplete, {
	geocodeByAddress,
} from 'react-places-autocomplete';

import styles from '../../modules/locationdropdown.module.scss';
import settings from "../../modules/settings.module.scss";
import '../../styles/index.scss';

export default function LocationAuto(props) {
	const [, meta, helpers] = useField(props.name);

	const { value } = meta;
	const { setValue } = helpers;

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		setValue(results[0].formatted_address, false)
	};


	return (
		<PlacesAutocomplete
			value={value}
			onChange={(v) => setValue(v, false)}
			onSelect={handleSelect}
		>
			{({
				getInputProps,
				suggestions,
				getSuggestionItemProps,
				loading,
			}) => (
				<>
					<input
						{...getInputProps({
							placeholder: 'Location',
							className: `inp-field ${settings.single_field}`,
						})}
					/>
					<div className={settings.single_field}>
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion,index) => {
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
								<div key={index}
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
				</>
			)}
		</PlacesAutocomplete>
	);
}
