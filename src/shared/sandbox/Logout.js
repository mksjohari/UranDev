import React, { useEffect, useState, useRef } from "react";
import styles from "../../modules/logout.module.scss";
import { Settings, LogOut, ChevronDown } from "react-feather";

function Logout(props) {
	const node = useRef();
	const [open, setOpen] = useState(false);
	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			//handle click
			return;
		}
		setOpen(false);
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);
	return (
		<div ref={node} className={styles.logout}>
			<div className={styles.logout_btn} onClick={() => setOpen(!open)}>
				<div className={styles.profile_pic} />
				<p className={styles.name}>LOooooooooooooooong nameeeeee</p>
				<ChevronDown size='20px' />
			</div>
			<div
				className={open ? styles.menu_show : styles.menu_hide}
				onClick={() => setOpen(false)}
			>
				<p className={styles.option}>
					<Settings className={styles.settings_icon} />
					Account settings
				</p>
				<p className={styles.option}>
					<LogOut className={styles.logout_icon} />
					Log out
				</p>
			</div>
		</div>
	);
}

export default Logout;
