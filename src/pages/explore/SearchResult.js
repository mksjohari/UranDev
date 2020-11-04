import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../../modules/searchresult.module.scss";

function SearchResult(props) {
    const history = useHistory();
    return (
        <div
            className={styles.search_result}
            onClick={() => {
                history.push(`/users/${props.uid}`, { uid: props.uid });
            }}
        >
            <div className={styles.imgContainer}>
                <img className={styles.img1} src={props.photoUrl} />
            </div>
            <div>
                <p className={styles.user_name}>{props.name}</p>
                <p className={styles.user_loc}>
                    <i className="fas fa-map-marker-alt" />
                    {props.location}
                </p>
                <p className={styles.user_loc}>
                    <i className="fas fa-briefcase" />
                    {props.occupation}
                </p>
            </div>
        </div>
    );
}

export default SearchResult;
