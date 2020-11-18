import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';

import Thumbs from './Thumbs';
import styles from '../../modules/dropzone.module.scss';
import logo from '../../images/logo.svg';

function Droparea(props) {
	const [, meta, helpers] = useField(props.name);

	const { value } = meta;
	const { setValue } = helpers;

	const filetype = /image/g;
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 10,
		onDrop: (acceptedFiles) => {
			setValue(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: file.type.match(filetype)
							? URL.createObjectURL(file)
							: logo,
					})
				)
			);
			console.log(acceptedFiles);
		},
	});

	// useEffect(
	// 	() => () => {
	// 		// Make sure to revoke the data uris to avoid memory leaks
	// 		value.forEach((file) => {
	// 			URL.revokeObjectURL(file.preview);
	// 		});
	// 	},
	// 	[value]
	// );

	return (
		<section className={styles.container}>
			<div
				{...getRootProps({
					className: `${props.className + ' ' + styles.droparea}`,
				})}
			>
				<input {...getInputProps()} />
				<div>
					Drag and drop your files here, or click to select files
				</div>
				<i className="fas fa-file-alt"></i>
			</div>
			<aside className={styles.thumbsContainer}>
				{value.length ? <Thumbs files={value} /> : ""}
			</aside>
		</section>
	);
}

export default Droparea;

// var state = useState({});

// const onDrop = (acceptedFiles) => {
//   // do nothing if no files
//   if (acceptedFiles.length === 0) {
//     return;
//   }

//   // on drop we add to the existing files
//   const newState = Object.assign(state, acceptedFiles);
//   console.log(acceptedFiles);
//   state = (newState);
// }
// const {getRootProps, getInputProps} = useDropzone({onDrop});

// return (
//   <div {...getRootProps({className: `${props.className + ' ' + styles.droparea}`} )} >
//     <input {...getInputProps()} />
//     <div>Drag 'n' drop some files here, or click to select files</div>
//     <img
//       className={styles.filePreview}
//       src=""
//       alt="file"
//     />
//     <i className="fas fa-file-alt" ></i>

//   </div>
// )

// }
