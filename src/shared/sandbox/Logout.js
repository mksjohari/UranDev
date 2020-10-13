import React, { useState } from "react";
import styles from "../../modules/logout.module.scss";
import { Settings, LogOut, ChevronDown } from "react-feather";

function Logout(props) {
	const [hide, setHide] = useState(true);
	return (
		<div className={styles.logout}>
			<div className={styles.logout_btn} onClick={() => setHide(!hide)}>
				<div className={styles.profile_pic} />
				<p className={styles.name}>LOooooooooooooooong nameeeeee</p>
				<ChevronDown size='20px' />
			</div>
			<div className={hide ? styles.menu_hide : styles.menu_show} onClick={() => setHide(true)}>
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