import React, { useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
} from "react-places-autocomplete";
import styles from "../../modules/locationdropdown.module.scss";
import "../../styles/index.scss";

export default function LocationDropdown() {
	const [address, setAddress] = useState("");

	const handleChange = (address) => {
        setAddress(address);
        console.log(address);
	};

	const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        setAddress(value);
		console.log(results);
	};
	return (
		<PlacesAutocomplete
			value={address}
			onChange={handleChange}
            onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
					<input
						{...getInputProps({
							placeholder: "Location",
							className: styles.location_input,
						})}
					/>
					<div className={styles.location_dropdown}>
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion) => {
							const className = suggestion.active
								? styles.location_active
								: styles.location;
							const style = suggestion.active
								? { backgroundColor: "#faf6f1", cursor: "pointer"}
								: { backgroundColor: "#ffffff", cursor: "pointer"};
							return (
								<div
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
