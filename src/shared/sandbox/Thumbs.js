import React from "react";
import styles from "../../modules/dropzone.module.scss";

export function Thumbs(props) {
    return (
        <div className={styles.scroll}>
            {props.files.map((file) => (
                <div className={styles.thumbsWrapper}>
                    <div className={styles.thumb} key={file.name}>
                        <div className={styles.thumbInner}>
                            <img
                                alt={file.name}
                                src={file.preview}
                                className={styles.thumbImg}
                            />
                        </div>
                    </div>
                    <div className={styles.fileName}>
                        {file.name.length > 14
                            ? file.name.substr(0, 5) +
                              " . . . " +
                              file.name.substr(file.name.length - 7, 7)
                            : file.name}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Thumbs;
