import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import Checkbox from "../../shared/sandbox/Checkbox";
import "../../modules/signUp.module.scss";
import "react-step-progress-bar/styles.css";
import styles from "../../modules/explore.module.scss";
import SearchResult from "./SearchResult";
import { getExploreUsers } from "../../shared/firebase/firebase";
import Button from "../../shared/sandbox/Button";
import Placeholder from "../../shared/sandbox/Placeholder";

// const getAllUsers = async (setUsers, limit, page) => {
// 	const results = await getExploreUsers({ limit, page });
// 	if (!results.data || results.data.length === 0) {
// 		setUsers([]);
// 	} else {
// 		setUsers(results.data);
// 	}
// };

// const getFilterUsers = async (filter, setusers, limit, page) => {
// 	console.log("getting filtered users");
// };

const Explore = (props) => {
	const [users, setUsers] = useState([
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const usersPerPage = 5;
	// const [page, setPage] = useState(1);
	// const [limit, setLimit] = useState(2);
	// useEffect(() => {
	// 	setPage(1);
	// 	setLimit(2);
	// }, []);
	// useEffect(() => {
	// 	getAllUsers(setUsers, limit, page);
	// }, [page]);
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
	}, []);
	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
		pageNumbers.push(i);
	}
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
	const renderUsers = currentUsers.map((user, index) => {
		return <li key={index}>{user}</li>;
	});
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
				{users.length === 0 ? (
					""
				) : (
					<p className={styles.errormsg}>
						<strong>No results found.</strong>
						<br />
						Try searching again or using different filters
					</p>
				)}
				{loading ? (
					<>
						<Placeholder />
						<Placeholder />
					</>
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
				{renderUsers}
			</div>
			<div id={styles.div4}>
				{/* <Button
					iconL={<i className="fas fa-arrow-left" />}
					text='Last page'
				/> */}
				<ul id={styles.page_numbers}>{renderPageNumbers}</ul>
				{/* <Button
					iconR={<i className="fas fa-arrow-right" />}
					text='Next page'
				/> */}
			</div>
		</div>
	);
};

export default Explore;

{
	/* 
<Button
	text='pageup'
	onClick={() => {
		setPage(page + 1);
	}}
/>
Page {page} */
}
