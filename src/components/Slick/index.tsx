import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { CustomArrowProps } from "react-slick";

import styles from './styles.module.scss';

export const CustomPrevArrow = ({currentSlide, slideCount, className, ...props}: CustomArrowProps) => (
  <div className={`${className} ${styles['slick-prev']}`} {...props}>
    <MdNavigateBefore color='#000' size={50} />
  </div>
);

export const CustomNextArrow = ({currentSlide, slideCount, className, ...props}: CustomArrowProps) => (
  <div className={`${className} ${styles['slick-next']}`} {...props}>
    <MdNavigateNext color='#000'size={50} />
  </div>
);