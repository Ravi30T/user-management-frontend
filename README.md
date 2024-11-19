# User Management Dashboard

## Overview  
The **User Management Dashboard** is a web application built using **React.js**. It provides a streamlined interface for managing user information, including functionalities to view, add, edit, and delete user details. The application communicates with a backend API to handle user data efficiently.

---

## Features  

### 1. **View Users**  
Displays a list of all users with the following details:  
- First Name  
- Last Name  
- Email  
- Department  

### 2. **Add User**  
Allows users to create new entries by filling out a user-friendly form.  

### 3. **Edit User**  
Enables modifications to existing user information through an intuitive interface.  

### 4. **Delete User**  
Supports removing users from the system, with confirmation prompts for safety.  

### 5. **Error Handling**  
Displays clear and actionable error messages for failed operations such as unsuccessful API requests.  

### 6. **Loading Indicator**  
Provides a smooth user experience by displaying a loader while fetching or processing data.

---

## Tech Stack  

- **Frontend**:  
  - **React.js**: Core library for building the application UI.  
  - **React Router**: Manages navigation between the dashboard's pages (e.g., View, Add, Edit).  
  - **Fetch API**: Handles interactions with the backend API.  
  - **CSS**: Ensures a clean and responsive design for all components.  

- **Backend**: Interacts with the following API endpoints to manage user data.

---

## API Endpoints  

- **GET /users**  
  Fetches a list of all users.  

- **POST /users/add**  
  Creates a new user by submitting user details in the request body.  

- **PUT /user/{id}**  
  Updates user details identified by their `id`.  

- **DELETE /user/{id}**  
  Deletes a user specified by their `id`.  


## Installation

### Clone the repository:
```bash
git clone <repository_url>
```

### Navigate to the project directory:
```bash
cd <project_directory>
```

### Install the dependencies:
```bash
npm install
```
### Start the development server:
```bash
npm start
```
This will run the application locally at http://localhost:3000.

## Usage
- 1. **View Users:** Upon opening the dashboard, users' information is fetched and displayed.

- 2. **Add User:** Click the "Add User" button to navigate to a form for creating a new user.

- 3. **Edit User:** Click the "Edit" button next to a user's name to edit their details.

- 4. **Delete User:** Click the "Delete" button to remove a user from the system.
