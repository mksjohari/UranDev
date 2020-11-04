import React, { useState } from "react";
import styles from "../../modules/dropzone.module.scss";

export function Carousel(props) {
    const [index, setIndex] = useState(0);
    const file = props.files[index];
    const nextFile = () => setIndex(index + 1);
    const prevFile = () => setIndex(index - 1);

    return (
        <div className={styles.container_carousel}>
            <div
                className={`${styles.carousel_chevron}`}
                onClick={index > 0 && prevFile}
            >
                {index > 0 && <i className={`fas fa-angle-left fa-2x`}></i>}
            </div>
            <div className={styles.carousel}>
                <img
                    alt={props.files[index].name}
                    src={props.files[index].preview}
                    className={styles.carousel_img}
                />
                <div className={styles.fileName}>
                    {props.files[index].name.length > 14
                        ? props.files[index].name.substr(0, 5) +
                          " . . . " +
                          props.files[index].name.substr(
                              props.files[index].name.length - 7,
                              7
                          )
                        : props.files[index].name}
                </div>
            </div>
            <div
                className={`${styles.carousel_chevron}`}
                onClick={index < props.files.length - 1 && nextFile}
            >
                {index < props.files.length - 1 && (
                    <i className={`fas fa-angle-right fa-2x`}></i>
                )}
            </div>
        </div>
    );
}
export default Carousel;
