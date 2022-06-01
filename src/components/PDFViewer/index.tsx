import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "../../pdf-worker";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import styles from './styles.module.scss';

const PDFViewer = () => {
  return (
    <Document
      file={"sample.pdf"}
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
