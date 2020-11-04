import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import Checkbox from "../../shared/sandbox/Checkbox";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/explore.module.scss";
import SearchResult from "./SearchResult";
import { getExploreUsers } from "../../shared/firebase/firebase";
import Button from "../../shared/sandbox/Button";

const getUsers = async (setUsers, limit, page) => {
    console.log(limit);
    const results = await getExploreUsers({ limit, page });
    if (!results.data || results.data.length === 0) {
        setUsers([]);
    } else {
        setUsers(results.data);
    }
};

const Explore = (props) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState();
    const [limit, setLimit] = useState();
    useEffect(() => {
        setPage(1);
        setLimit(2);
    }, []);
    useEffect(() => {
        getUsers(setUsers, limit, page);
    }, [page]);
    return (
        <div>
            <Button
                text="pageup"
                onClick={() => {
                    setPage(page + 1);
                }}
            />
            Page {page}
            <Tab />
            <div className={styles.container}>
                <div className={styles.filter}>
                    <strong>Sort by:</strong>
                    <br />
                    <Checkbox id="1" label="Most endorsed" />
                    <Checkbox id="2" label="Most recent" />
                    <Checkbox id="3" label="Most relevant" />
                    <Checkbox id="4" label="Most projects" />
                    <Checkbox id="5" label="Most experienced" />
                </div>
                <div className={styles.results}>
                    <h6 className={styles.h6}>
                        Search results ({users.length})
                    </h6>
                    {users.length === 0 && (
                        <h3>Loading...(make this pretty potential)</h3>
                    )}
                    {users.map((user, index) => {
                        return (
                            <SearchResult
                                key={index}
                                uid={user.uid}
                                name={`${user.firstName} ${user.lastName}`}
                                location={user.location}
                                occupation={user.occupation}
                                photoUrl={user.photo}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Explore;
