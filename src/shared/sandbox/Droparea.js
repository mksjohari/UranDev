import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { Formik } from "formik";


import styles from '../../modules/dropzone.module.scss';
import logo from '../../images/logo.png';
import { style } from 'd3';

const Droparea = (props) => {

  const [files, setFiles] = useState([]);
  const filetype = /image/g;
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 10,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: (file.type.match(filetype) ? URL.createObjectURL(file): logo)
      })));
      console.log(acceptedFiles);
    }
  });
  
  const thumbs = files.map(file => (
    <div className={styles.thumbsWrapper}>
      <div className={styles.thumb} key={file.name}>
        <div className={styles.thumbInner}>
          <img
            src={file.preview}
            className={styles.thumbImg}
          />
        </div>
      </div>
      <div className={styles.fileName}>
        {file.name.length > 14 ? 
          file.name.substr(0, 5) + ' . . . ' + file.name.substr(file.name.length - 7, 7)
          : file.name }
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className={styles.container}>
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
