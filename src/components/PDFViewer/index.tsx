import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { HiDownload } from 'react-icons/hi';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

pdfjs.GlobalWorkerOptions.workerSrc = `//${window.location.host}/pdf.worker.min.js`;

import styles from './styles.module.scss';

export interface PDFViewerProps {
  pageIndex: number
  Loading: React.FC
  fileId: string
  showDetails?: boolean
}

const PDFViewer:React.FC<PDFViewerProps> = ({ pageIndex:propPageIndex, Loading, fileId, showDetails = false }) => {
  
  const [numPages, setNumPages] = useState<number>()
  const [pageIndex, setPageIndex] = useState(propPageIndex)

  const onDocumentLoadSuccess = (numPages: number) => {
    setNumPages(numPages);
  }

  const handleDownload = () => {
    
  }

  const goToPage = (page: number) => {
    if((page + 1) > numPages! || page < 0) return
    setPageIndex(page)
  }

  const hasNextPage = numPages ? (pageIndex + 1) < numPages : false
  const hasPrevPage = pageIndex > 0
  return (
    <div className={styles['document--container']}>
      {showDetails &&
        <div className={styles['download']}>
          <HiDownload size={20} aria-label='download' onClick={handleDownload} />
        </div>
      }
      <Document
        file={`/api/pdf?id=1C1e5PfmqkOuyXgAUrrFjrfl3idoWDx8c`}
        onLoadError={(err) => console.log(err)}
        loading={<Loading />}
        error={<Loading />}
        onLoadSuccess={(e) => onDocumentLoadSuccess(e.numPages)}
        className={styles['document']}
      >
        <Page 
          pageIndex={pageIndex}
          className={styles['page']}
          renderTextLayer={false}
          loading={<Loading />}
        />
      </Document>
      {showDetails && numPages &&
        <div className={styles['pagination']}>
          <IoMdArrowDropleft
            className={`${styles['pagination--arrow']} ${styles['pagination--arrow__back']} ${!hasPrevPage ? styles['disabled'] : ''}`}
            size={25} 
            aria-label='página anterior' 
            onClick={() => goToPage(pageIndex - 1)}
          />
          <IoMdArrowDropright
            className={`${styles['pagination--arrow']} ${styles['pagination--arrow__forward']} ${!hasNextPage ? styles['disabled'] : ''}`} 
            size={25} 
            aria-label='próxima página' 
            onClick={() => goToPage(pageIndex + 1)} 
          />
          <div className={styles['pagination--count']}>
            <p>{pageIndex+1}/{numPages}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default PDFViewer
