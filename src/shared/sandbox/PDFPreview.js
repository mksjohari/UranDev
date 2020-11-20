import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { close, lockBg } from '../sandbox/Popup';
import Button from '../sandbox/Button';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from '../../modules/pdfPreview.module.scss';
import popup from '../../modules/popup.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFPreview = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}
	return (
		<div className={styles.pdfContainer}>
			{props.preview ? (
				<>
					<Button
						id={'showPreview'}
						colour="blue"
						onClick={lockBg}
						text="Open PDF Viewer"
					/>
					<div
						className={popup.popupContainer}
						id={'showPreview_popContent'}
					>
						<PDFScroll file={props.file} />
					</div>
				</>
			) : (
				''
			)}
			<div className={styles.btn_row}>
				<div className={`${styles.arrowBtn}`} onClick={previousPage}>
					{pageNumber <= 1 ? null : (
						<i className={`fas fa-angle-left fa-2x`}></i>
					)}
				</div>

				<div className={styles.pageNum}>
					<p>
						Page {pageNumber || (numPages ? 1 : '--')} of{' '}
						{numPages || '--'}
					</p>
				</div>
				<div className={`${styles.arrowBtn}`} onClick={nextPage}>
					{pageNumber >= numPages ? null : (
						<i className={`fas fa-angle-right fa-2x`}></i>
					)}
				</div>
			</div>
			<center>
				<Document
					file={props.file}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page width={700} pageNumber={pageNumber} />
				</Document>
				{props.file.name}
			</center>
		</div>
	);
};
export default PDFPreview;

const PDFScroll = (props) => {
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div
			className={`${popup.contentContainer} ${styles.preview_container}`}
		>
			<Button
				id={'showPreview_confirm'}
				colour="blue"
				className={styles.nextBtn}
				onClick={(e) => close(e, '_confirm')}
				text="Close PDF Viewer"
			/>
			<div className={styles.pdfContainerScroll}>
				<center>
					<Document
						file={props.file}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						{console.log(props.file)}
						{Array.from(new Array(numPages), (el, index) => (
							<Page
								key={`page_${index + 1}`}
								pageNumber={index + 1}
								style={{ width: '500px' }}
							/>
						))}
					</Document>
					{props.file.name}
				</center>
			</div>
		</div>
	);
};
