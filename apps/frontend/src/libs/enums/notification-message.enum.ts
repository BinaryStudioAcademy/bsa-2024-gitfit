const NotificationMessage = {
	ACCESS_DENIED:
		"You don't have access to any pages for now. Please contact an admin to enable access for you.",
	GROUP_CREATE_SUCCESS: "Group was successfully created.",
	GROUP_DELETE_SUCCESS: "Group was successfully deleted.",
	GROUP_UPDATE_SUCCESS: "Group was successfully updated.",
	PROFILE_UPDATE_SUCCESS: "Your profile has been successfully updated.",
	PROJECT_API_KEY_CREATE_SUCCESS: "Project API key was successfully generated.",
	PROJECT_CREATE_SUCCESS: "Project was successfully created.",
	PROJECT_DELETE_SUCCESS: "Project was successfully deleted.",
	PROJECT_UPDATE_SUCCESS: "Project was successfully updated.",
	USER_DELETE_SUCCESS: "User deleted successfully.",
} as const;

export { NotificationMessage };
