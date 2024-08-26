# GitFit Specification

## 1. Introduction

### 1.1. Project Overview

The application is designed to collect and analyze developer activity in Git-based repositories, focusing on Git commits. It aims to provide insights into productivity and contributor performance.

### 1.2. Similar Applications

[Pluralsight Flow](https://www.pluralsight.com/product/flow): A productivity analytics solution that collects metrics by analyzing data from Git-based repositories.

### 1.3. Key Features

- **Project Management:** Ability to add, view, and manage project details.
- **User Groups & Permissions:** Manage user groups, define permissions, and control project access.
- **Background Statistics Script:** Script for generating and collecting project statistics, running in the background.
- **Analytics Dashboard:** Displays commit data filtered by selected parameters.
- **Contributors Management:** View and manage contributors, including options to exclude them from metrics.
- **Notifications:** Alerts for statistics update failures and significant drops in contributor performance.

## 2. Components

### 2.1. Header

**Element:** Header component.

**How to reach:** Present on all pages except for auth pages (Sign In/Sign Up).

The header component includes:

- Logo.
- “Notifications” icon: Displays a popup with an unread notifications count. When clicked, the "Notifications Popup" is shown.
- “Avatar” icon: When clicked, the "User Popup" is shown.

#### 2.1.1 User Popup

**Element:** Popup component.

**How to reach:** Opened by clicking the "Avatar" icon in the header.

The "User Popup" includes:

- "Info" block: Displays user name and email.
- “Profile” link - Navigates the user to the "Profile" page.
- “Log out” button - Logs the user out and redirects them to the "Sign In" page.

### 2.2. Sidebar

**Element:** Sidebar component.

**How to reach:** Present on all pages except for auth pages.

Provides quick access to primary application pages.

The sidebar component includes:

- "Projects" link: Navigates the user to the "Projects" page.
- "Access Management" link: Navigates the user to the "Access Management" page.
- "Contributors" link: Navigates the user to the "Contributors" page.
- "Analytics" link: Navigates the user to the "Analytics" page.

### 2.3. Auth

Provides "Sign In" and "Sign Up" pages for unauthorized or unregistered users.

Unauthorized users are redirected to the "Sign In" page when trying to access restricted pages or the base URL.

#### 2.3.1 Sign Up

**Element:** Separate page.

**How to reach:** Accessible from the "Sign In" page via the "Create new" link.

The "Sign Up" page includes:

- "Log in" link: navigates the user to the "Sign In" page.
- "Name" field.
- "Email" field.
- "Password" field.
- "Create Account" button: Submits the form and redirects the user to the "Projects" page.

#### 2.3.2 Sign In

**Element:** Separate page.

**How to reach:** Accessible from the "Sign Up" page via the "Log in" link.

The "Sign In" page includes:

- "Create new" link: Navigates the user to the "Sign Up" page.
- "Email" field.
- "Password" field.
- "Log In" button: Submits the form and redirects the user to the "Projects" page.

### 2.4 Access Management

**Element:** Separate page.

**How to reach:** Accessible from the sidebar by clicking the "Access Management" link.

Controls user group access to specific actions and projects.

The "Access Management" page includes:

- "Users” table: Displays columns for "Name", "Groups" and "Created At".
- “Groups” Table: Displays the “Create new” button and columns for "Name", "Permissions", "Created At" and an "Options" icon. When the “Create new” button is clicked, a “Create Group Modal” is opened. When the "Options" icon is clicked, a menu with the "Edit" and “Delete” options is shown. When the “Edit” option is clicked, the “Update Group Modal” is opened. When the “Delete” option is clicked, a confirmation modal is opened before deleting the group.
- “Permissions” list contains:
  - Manage User Access: See the “Access Management” page and manage groups.
  - View All Projects: See all projects.
  - Manage All Projects: Ability to view, create, edit (including project groups), and delete projects.

#### 2.4.1 Create Group Modal

**Element:** Modal component

**How to reach:** Opened by clicking the “Create new" button in the “Groups” table on the "Access Management" page.

The "Create Group Modal" includes:

- “Name” field.
- “Users” table: Includes “Checkbox”, “Name”, “Groups” and “Created At” columns.
- “Permissions” multi-select: Contains a list of permissions as options.
- “Create” button: When clicked, submits the form, closes the modal, and adds the new group to the top of the "Groups" list.
- “Close” icon: When clicked, the modal is closed.

#### 2.4.1 Update Group Modal

**Element:** Modal component

**How to reach:** Opened by clicking the “Edit" button in the “Groups” table row on the "Access Management" page.

The "Update Group Modal" includes:

- “Name” field (prefilled).
- “Users” table: Includes “Checkbox” (prefilled), “Name”, “Groups” and “Created At” columns.
- “Permissions” multi-select: Contains a list of permissions as options.
- “Update” button: When clicked, submits the form, closes the modal, and updates the group data on the page.
- “Close” icon: When clicked, the modal is closed.

### 2.5 Projects

**Element:** Separate page.

**How to reach:** Accessible from the sidebar by clicking the "Projects" link.

Allows to view, create, and edit projects.

The "Projects" page includes:

- "Search” field: Allows the user to search by project name.
- “Create New” button: When clicked, the “Create Project Modal” is opened.
- “Projects” list: Displays a list of projects, each containing:

  - Project name.
  - Last commit relative date (e.g., "15 minutes ago").
  - Activity graph: When clicked, it redirects the user to the "Analytics" page with the "Project" field preselected.
  - "Options" icon: When clicked, a menu with the "Edit" and “Delete” options is shown. When the “Edit” option is clicked, the “Update Project Modal” is opened. When the “Delete” option is clicked, a confirmation modal is opened before deleting the group.

  When an item is clicked, the user is redirected to the specific “Project” page.

#### 2.5.1 Create Project Modal

**Element:** Modal component.

**How to reach:** Opened by clicking the "Create New" button on the "Projects" page.

The "Create Project Modal" includes:

- “Name” field.
- “Description” field.
- “Create” button: When clicked, submits the form, closes the modal, and adds the new project to the top of the "Projects" list.
- “Close” icon: When clicked, the modal is closed.

### 2.6 Project

**Element:** Separate page.

**How to reach:** Accessible by clicking a project item on the "Projects" page.

Displays detailed information about a specific project.

The "Project" page includes:

- Project name and description.
- “Edit” icon: When clicked, the “Update Project Modal” is opened.
- “Setup Analytics” button: When clicked, “Setup Analytics Modal” is opened.
- "Search” field: Allows the user to search contributors by name.
- “Contributors” list: Displays a list of contributors, each containing:
  - Contributor name.
  - Last commit relative date (e.g., “15 minutes ago”).
    The time limits for color indicators are as follows:
    - Green: < 2 days
    - Yellow: < 5 days
    - Red: >= 5 days
  - Activity graph: When clicked, the user is redirected to the “Analytics page” with the "Project" and "Search" fields preselected.
  - “Edit” icon: When clicked, the “Update Contributor Modal” is opened.

#### 2.6.1 Update Project Modal

**Element:** Modal component.

**How to reach:** Opened by clicking the "Edit" icon on the "Project" page.

The "Edit" icon should be accessible only to users with the appropriate permissions.

The "Update Project Modal" includes:

- “Name” field (prefilled). The "Name" field should have a character limit between 1 and 50 characters.
- “Description” field (prefilled). The "Description" field is optional and should allow up to 1000 characters.
  A character counter should be displayed below the text area, indicating the current character count (e.g., "100/1000").
- “Update” button: When clicked, submits the form, closes the modal, and updates the project data on the page.
- “Close” icon: When clicked, the modal is closed.

#### 2.6.2 Setup Analytics Modal

**Element:** Modal component.

**How to reach:** Opened by clicking the "Setup Analytics" button on the "Project" page.

The "Setup Analytics Modal" includes:

- Instructions paragraph: Provides instructions on setting up analytics.
- “API Key” field: Automatically generated API key that stores user id and project id. There is no limit to the number of times the API key can be regenerated, and there is no time limit for its use.
- “Regenerate” button: When clicked, the “API Key” should be regenerated and the “Script” should be updated.
- “Script” field: Contains a script for setting up statistics, with the API key (prefilled) and repository path as parameters. The script runs in the background, collects repository statistics, and periodically sends them to the backend.
- “Close” icon: When clicked, the modal is closed.

### 2.7 Analytics

**Element:** Separate page.

**How to reach:** Accessible from the sidebar by clicking the "Analytics" link.

Allows to view and analyze commit data.

The "Analytics" page includes:

- "Search” field: Allows the user to search for contributors by name.
- “Project” select. Displays list of all projects.
- “Date” field: Allows the user to select a period.
  The period for viewing data is limited to a maximum of 1 month. Users can select specific months rather than a custom date range.
  The application does not allow selecting future dates for viewing data.
- “Analytics” table: Displays selected dates as columns and contributors as rows. Each cell shows the number of commits made by the contributor on that date. If there are no commits, a minus sign is displayed. When no projects are available or a project isn't chosen, the Analytics page displays a "No projects" message that covers the entire screen, without filtering options.

### 2.8 Contributors

**Element:** Separate page.

**How to reach:** Accessible from the sidebar by clicking the "Contributors" link.

Allows to manage and view contributors.

The "Contributors" page includes:

- "Search” field: Allows the user to search for contributors by name.
- “Contributors” table: Displays columns for "Name", "Git Emails", "Projects", "Is Hidden" and “Options” icon. When the “Is Hidden” column is checked, the contributor is excluded from all app metrics and pages (except for the "Contributors" page). When the "Options" icon is clicked, a menu with the "Edit" and “Merge” options is shown. When the “Edit” option is clicked, the “Update Contributor Modal” is opened. When the “Merge” option is clicked, the “Merge Contributors Modal” is opened.

#### 2.8.1 Update Contributor Modal

**Element:** Modal component

**How to reach:** Opened by clicking the "Edit" option in options menu in the "Contributors" table row.

The "Update Contributor Modal" includes:

- “Name” field (prefilled).
- “Git Emails” field (prefilled, disabled).
- “Projects” field (prefilled, disabled).
- “Is Hidden” checkbox (prefilled).
- “Update” button: When clicked, submits the form, closes the modal, and updates the contributor's data on the page.
- “Close” icon: When clicked, the modal is closed.

#### 2.8.2 Merge Contributors Modal

**Element:** Modal component

**How to reach:** Opened by clicking the “Merge” option in options menu in the "Contributors" table row.

The "Merge Contributors Modal" includes:

- “Current contributor” field (disabled): Prefilled with current contributor name and git email.
- “Contributor to merge with” select: Has contributors list as options with their git emails in the parenthesis.
- “Merge” button: When clicked, submits the form, closes the modal, and updates the contributor's data on the page. After merge, the selected contributor is deleted and his git emails are transferred to the current contributor.
- “Close” icon: When clicked, the modal is closed.

### 2.9 Profile

**Element:** Separate page.

**How to reach:** Accessible by clicking the "Profile" link in the "User Popup", after clicking avatar in the header.

The "Profile" page includes:

- "Info" block: Includes prefilled “Name” and “Email” Fields and “Update Profile” button. The “Email” field is disabled. The “Update Profile” button becomes active after the user changes fields. When clicked, profile data should be updated.
- “Password” block: Includes “Password” and “Confirm password” fields and “Update Password” button. The “Update Password” button becomes active after the user inputs something into the “Password” field. After submission user password should be updated.
- “Delete account” block: Includes “Delete your account” button. When the “Delete your account” button is clicked, a confirmation modal is opened. After confirming the action, the account should be deleted as well as data related to it.

### 2.10 Notifications

There are two main types of notifications:

- Statistics for a project were not updated for some time
- A contributor was not active in a project for several days.

#### 2.10.1 Notifications Popup

**Element:** Popup component.

**How to reach:** Accessible by clicking the "Notifications" icon in the header.

The "Notification Popup" includes:

- "Mark all as read" button.
- Notification type icon: Either notification type icon with a specific color or avatar.
- A relative time when the notification was received (e.g., “5 days ago”).
- Notification content.
