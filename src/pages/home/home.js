import React from 'react';
import { connect } from 'react-redux';
import mysql from 'mysql';

const mapStateToProps = (state) => {
	return { user: state.user };
};

const pool = mysql.createConnection({
	host: '34.87.225.110',
	user: 'root',
	password: 'KqkHF1vlithp5GBa',
	database: 'development',
	socketPath: '/cloudsql/uran-28-12-98:australia-southeast1:uran-db',
});

console.log(pool);

pool.connect(function (err) {
	// if (err) throw err;
	// con.query('SELECT * FROM TEST', function (err, result, fields) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });
});

const Home = (props) => {
	console.log(props.user);
	return (
		<div>
			<h1>Hello,</h1>
			<p>KHAIRRI JOHARI</p>
		</div>
	);
};

export default connect(mapStateToProps)(Home);
