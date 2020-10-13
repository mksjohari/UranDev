export const updateInfo = (results) => (dispatch) => {
	console.log("results", results)
	dispatch({			
		type: "UPDATE_SEEKER_INFO",
		userInfo: results.userInfo
	})
	dispatch({			
		type: "UPDATE_SOCIALS",
		userSocials: results.userSocials
	})
	dispatch({			
		type: "UPDATE_EXPERTISE",
		userExpertise: results.userExpertise
	})
};
