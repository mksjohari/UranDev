import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { Formik } from "formik";


import styles from '../../modules/dropzone.module.scss'

const Droparea = (props) => {

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.thumbImg}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: `${props.className + ' ' + styles.droparea}`})}>
        <input {...getInputProps()} />
        <div>Drag and drop your files here, or click to select files</div>
        <i className="fas fa-file-alt" ></i>
      </div>
      <aside className={styles.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

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




export default Droparea;
