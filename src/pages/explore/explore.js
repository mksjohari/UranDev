import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import Checkbox from "../../shared/sandbox/Checkbox";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/explore.module.scss";
import SearchResult from "./SearchResult";
import {
    getExploreUsers,
    getExploreCount,
} from "../../shared/firebase/firebase";
import Placeholder from "../../shared/sandbox/Placeholder";
import { ChevronLeft, ChevronRight } from "react-feather";

const getAllUsers = async (setUsers, setLoading, limit, page) => {
    const results = await getExploreUsers({ limit, page });
    if (!results.data || results.data.length === 0) {
        setUsers([]);
    } else {
        setUsers(results.data);
        setLoading(false);
    }
};

const getCount = async (limit, setPageNumbers) => {
    var page = 1;
    const pageNumbers = [];
    const results = await getExploreCount();
    if (!results.data || results.data.length === 0) {
        setPageNumbers([]);
    } else {
        for (let i = 0; i < results.data; i++) {
            if (i % limit === 0) {
                pageNumbers.push(page);
                page += 1;
            }
        }
        setPageNumbers(pageNumbers);
    }
};

// const getFilterUsers = async (filter, setusers, limit, page) => {
// 	console.log('getting filtered users');
// };

const Explore = (props) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([1, 2]);
    const [limit] = useState(5);
    const [placeHolder, setPlaceHolder] = useState([]);

    useEffect(() => {
        const holder = [];
        for (var i = 0; i < limit; i++) {
            holder.push(i);
        }
        setPlaceHolder(holder);
        getCount(limit, setPageNumbers);
    }, [limit]);

    useEffect(() => {
        getAllUsers(setUsers, setLoading, limit, page);
    }, [page, limit]);
    const handleClick = (event) => {
        setPage(Number(event.target.id));
        setCurrentPage(Number(event.target.id));
    };
    const renderPageNumbers = pageNumbers.map((number) => {
        return (
            <li
                key={number}
                id={number}
                className={currentPage === number ? styles.current_page : ""}
                onClick={handleClick}
            >
                {number}
            </li>
        );
    });
    return (
        <div className={styles.grid}>
            <div id={styles.div1}>
                <Tab />
            </div>
            <div id={styles.div2}>
                <div className={styles.filter}>
                    <strong>Sort by:</strong>
                    <br />
                    <Checkbox id='1' label='Most endorsed' />
                    <Checkbox id='2' label='Most recent' />
                    <Checkbox id='3' label='Most relevant' />
                    <Checkbox id='4' label='Most projects' />
                    <Checkbox id='5' label='Most experienced' />
                </div>
            </div>
            <div className={styles.div3}>
                <h6 className={styles.h6}>Search results ({users.length})</h6>
                {loading ? (
                    placeHolder.map((page, index) => (
                        <Placeholder key={index} />
                    ))
                ) : (
                    <div>
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
                )}
                {/* {renderUsers} */}
            </div>
            <div id={styles.div4}>
                <div
                    className={
                        currentPage > 1 ? styles.btn : styles.disabled_btn
                    }
                    onClick={() =>
                        currentPage > 1
                            ? setCurrentPage(currentPage - 1)
                            : setCurrentPage(1)
                    }
                >
                    <ChevronLeft />
                </div>
                <ul id={styles.page_numbers}>{renderPageNumbers}</ul>
                <div
                    className={
                        currentPage < pageNumbers.length
                            ? styles.btn
                            : styles.disabled_btn
                    }
                    onClick={() =>
                        currentPage < pageNumbers.length
                            ? setCurrentPage(currentPage + 1)
                            : setCurrentPage(pageNumbers.length)
                    }
                >
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
};

export default Explore;
