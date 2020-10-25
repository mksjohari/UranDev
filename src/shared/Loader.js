import React from "react";
import styles from "../modules/loader.module.scss";
import "../modules/loginform.scss";

const Loader = (props) => {
    return(
        <div style={props.style}>
            <svg id={styles.loader} version="1.1" xmlns="http://www.w3.org/2000/svg" width="60px" height="67.2px" viewBox="0 0 60 67.2">
                <path className={styles.st0} d="M41,50.9V21.3c0-2.7-2.2-4.9-4.9-4.9H6.4c-2.7,0-4.9,2.2-4.9,4.9v39.5c0,2.7,2.2,4.9,4.9,4.9h19.7L41,50.9z"/>
                <polyline className={styles.st0} points="41,50.9 26.2,50.9 26.2,65.7 "/>
                <line className={styles.st0} id={styles.line1} x1="11.4" y1="38.6" x2="31.1" y2="38.6"/>
                <line className={styles.st0} id={styles.line2} x1="11.4" y1="28.7" x2="31.1" y2="28.7"/>
                <polyline className={styles.st1} id={styles.line3} points="11.4,48.5 13.8,48.5 16.3,48.5 "/>
                <path className={styles.st2} id={styles.pencil} d="M52,2.6c1.5-1.5,3.9-1.5,5.5,0c1.5,1.5,1.5,3.9,0,5.5L39,26.5l-7.5,2l2-7.5L52,2.6z"/>
                <line className={styles.st2} id={styles.pencil} x1="49.6" y1="5" x2="55.1" y2="10.4"/>
            </svg>
            <br />
            <p className={styles.loading}>{props.loadMessage}&nbsp;
                <div id={styles.dot1}></div>
                <div id={styles.dot2}></div>
                <div id={styles.dot3}></div>
            </p>
        </div>
    )
}

export default Loader;