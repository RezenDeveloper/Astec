import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//${window.location.host}/pdf.worker.min.js`;;

import styles from './styles.module.scss';

const PDFViewer = () => {
  return (
    <Document
      file={`//${window.location.host}/sample.pdf`}
      onLoadError={(err) => console.log(err)}
      className={styles['document']}
    >
      <Page 
        pageNumber={1}
        className={styles['page']}
        renderTextLayer={false}
      />
    </Document>
  );
}

export default PDFViewer
