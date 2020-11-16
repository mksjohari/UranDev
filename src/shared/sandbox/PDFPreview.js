import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Button from '../sandbox/Button';
import styles from '../../modules/pdfPreview.module.scss';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PDFPreview = (props) => {
  /* 
  ***
  if you want to load all pages of the pdf at once (and use a scrollbar)
  then uncomment this
  ***
  */

  // const [numPages, setNumPages] = useState(null);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  // return (
  //  <div className={styles.pdfContainerScroll}>
  //    <center>
  //      <Document
  //        file={props.file}
  //        onLoadSuccess={onDocumentLoadSuccess}
  //      >
  //        {Array.from(
  //          new Array(numPages),
  //            (el, index) => (
  //              <Page
  //              key={`page_${index + 1}`}
  //              pageNumber={index + 1}
  //            />
  //          ),
  //        )}
  //      </Document>
  //    </center>
  //  </div>
  // );

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className={styles.pdfContainer}>
        <div className={styles.pageNum}>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
        </div>
        <div className={styles.btnsRow}>
            {pageNumber <= 1 ? ('') :
              (<Button
                type='button'
                colour='blue'
                className={styles.prevBtn}
                disabled={pageNumber <= 1}
                onClick={previousPage}
                text='<'
              />)
            }
            {pageNumber >= numPages ? ('') :
              (<Button
                type='button'
                colour='blue'
                className={styles.nextBtn}
                disabled={pageNumber >= numPages}
                onClick={nextPage}          
                text='>'
              />)
            }
          </div>
        <center>
          <Document
            file={props.file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page width={700} pageNumber={pageNumber} />
          </Document>
        </center>
      </div>
      
    </>
  );
}


export default PDFPreview;
