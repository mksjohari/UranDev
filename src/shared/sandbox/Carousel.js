import React, { useState } from "react";
import { withContext } from "../../shared/react-dims";
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
                onClick={index > 0 ? prevFile : null}
            >
                {index > 0 && <i className={`fas fa-angle-left fa-2x`}></i>}
            </div>
            <div
                className={styles.carousel}
                style={{ width: props.dims.width * 0.3 }}
            >
                <img
                    alt={file.name}
                    src={file.preview}
                    className={styles.carousel_img}
                />
                <div className={styles.fileName}>
                    {file.name.length > 14
                        ? file.name.substr(0, 5) +
                          " . . . " +
                          file.name.substr(file.name.length - 7, 7)
                        : file.name}
                </div>
            </div>
            <div
                className={`${styles.carousel_chevron}`}
                onClick={index < props.files.length - 1 ? nextFile : null}
            >
                {index < props.files.length - 1 && (
                    <i className={`fas fa-angle-right fa-2x`}></i>
                )}
            </div>
        </div>
    );
}
export default withContext(Carousel);
