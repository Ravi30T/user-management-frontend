import { useEffect, useState } from "react"
import { Hourglass } from 'react-loader-spinner'
import Popup from 'reactjs-popup'
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import Navbar from "../Navbar"
import './index.css'

const Home = () => {
    const [usersData, setUsersData] = useState([])
    const [showLoader, setLoaderStatus] = useState(false)
    const [showNoUsersDataMsg, setNoUsersDataMsgStatus] = useState(false)
    const [noUsersDataMsg, setNoUsersDataMsg] = useState('')

    const [newUserFirstName, setNewUserFirstName] = useState('')
    const [newUserLastName, setNewUserLastName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserDepartment, setNewUserDepartment] = useState('')

    const [newUserDetailsConfirmation, setNewUserDetailsConfirmationStatus] = useState(false)
    const [newUserErrStatus, setNewUserErrStatus] = useState(false)
    const [newUserErr, setNewUserErr] = useState('')
    

    const updateNewUserConfirmationStatus = () => {
        setNewUserDetailsConfirmationStatus(prev => !prev)
    }

    const getUsersData = async () => {
        setLoaderStatus(prev => !prev)
        setNewUserErrStatus(false)
        setNewUserErrStatus(false);
        setNewUserErr('');

        const API_URL = 'https://user-management-6j2w.onrender.com/users'
        const options = {
            method: 'GET'
        }

        const response = await fetch(API_URL, options)
        const data = await response.json()
        if(response.ok === true){
            setLoaderStatus(false)
            if(data.message === 'No Users Data Available'){
                setNoUsersDataMsgStatus(true)
                setNoUsersDataMsg(data.message)
            }
            else{
                setNoUsersDataMsgStatus(false)
                setUsersData(data)
            }
        }
        else{
            setLoaderStatus(false)
            setNoUsersDataMsgStatus(false)
            setNoUsersDataMsg(data.message)
        }
        
    }

    useEffect(() => {
        getUsersData()
    }, [])

    const onAddNewUser = async (e, close) => {
        e.preventDefault()
        setNewUserErrStatus(false)
        setNewUserErr('')

        if(newUserFirstName !== '' && newUserLastName !== '' && newUserEmail !== '' && newUserDepartment !== '' && newUserDetailsConfirmation === true){
            const newUser = {
                firstName: newUserFirstName,
                lastName: newUserLastName,
                email: newUserEmail,
                department: newUserDepartment 
            }

            const API_URL = 'https://user-management-6j2w.onrender.com/users'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }

            const response = await fetch(API_URL, options)
            const data = await response.json()
            if(response.ok === true){
                alert(data.message)
                setNewUserFirstName('')
                setNewUserLastName('')
                setNewUserEmail('')
                setNewUserDepartment('')
                getUsersData()
                close()
            }
            else{
                setNewUserErr(data.message)
                setNewUserErrStatus(true)
            }
            
        }
    }

    const onUpdateUser = async (e, id, close) => {
        e.preventDefault()
        setNewUserErrStatus(false);
        setNewUserErr('');

        let userData = {}
        const API_URL = `https://user-management-6j2w.onrender.com/users/${id}`
        
        if(newUserFirstName){
            userData.firstName = newUserFirstName
        }

        if(newUserLastName){
            userData.lastName = newUserLastName
        }

        if(newUserEmail){
            userData.email = newUserEmail
        }

        if(newUserDepartment){
            userData.department = newUserDepartment
        }

        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()


        if(response.ok === true){
            alert(data.message)
            setNewUserFirstName('')
            setNewUserLastName('')
            setNewUserEmail('')
            setNewUserDepartment('')
            getUsersData()
            close()
        }
        else{
            setNewUserErr(data.message)
            setNewUserErrStatus(true)
        }
    }

    const onDeleteUser = async id => {
        console.log(id)
        const API_URL = `https://user-management-6j2w.onrender.com/user/${id}`
        const options = {
            method: 'DELETE'
        }

        const response = await fetch(API_URL, options)
        const data = await response.json()

        if(response.ok === true){
            alert(data.message)
            getUsersData()
        }
        else{
            alert(data.message)
        }
    }


    return (
        <div>
            <Navbar />
            <div className="home-main-container">
                <h1 className="app-heading"> Dashboard </h1>
                <div className="add-user-btn-container">
                    <Popup
                    modal
                    trigger={
                      <button type="button" className="add-user-btn">
                        Add New User
                      </button>
                    }
                  >
                    {close => (
                      <>
                        <form className="form-main-container" onSubmit={(e) => onAddNewUser(e, close)}>
                            <div className="heading-cancel-button-container">
                                <div className="new-user-form-close-btn-container">
                                    <button type="button" onClick={() => close()} className="new-user-form-close-btn"> <IoMdCloseCircle /> </button>
                                </div>
                                <h1 className="add-new-user-heading"> Add New User </h1>
                            </div>

                            <div className="new-users-inputs-container">
                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="updatefirstname"> Firstname </label>
                                    <input type='text' id="updatefirstname" onChange={(e) => setNewUserFirstName(e.target.value)} value={newUserFirstName} className="new-user-input-box" placeholder="Enter your Firstname" required/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="updatelastname"> Lastname </label>
                                    <input type='text' id="updatelastname" onChange={(e) => setNewUserLastName(e.target.value)} value={newUserLastName} className="new-user-input-box" placeholder="Enter your Lastname" required/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="updateemail"> Email </label>
                                    <input type='text' id="updateemail" onChange={(e) => setNewUserEmail(e.target.value)} value={newUserEmail} className="new-user-input-box" placeholder="Enter your Email" required/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="updatedepartment"> Department </label>
                                    <input type='text' id="updatedepartment" onChange={(e) => setNewUserDepartment(e.target.value)} value={newUserDepartment} className="new-user-input-box" placeholder="Enter your Department" required/>
                                </div>

                                <div className="user-confirmation-message-submit-btn-container">
                                    <div className="user-confirmation-checkbox-container">
                                        <div className="new-user-confimation-msg-container">
                                            <input type="checkbox" id="confirmation-msg" onChange={updateNewUserConfirmationStatus} className="new-user-check-box" required /> 
                                            <label className="new-user-confirmation-label" htmlFor="confirmation-msg"> I accept all the provided details are correct. </label>
                                        </div>
                                    </div>
                                    {newUserErrStatus && <p className="error-msg"> {newUserErr} </p>}
                                    <button
                                        type="submit" className="new-user-form-btn">
                                        Submit
                                    </button>
                                </div>
                            </div>
                          
                            
                        </form>
                      </>
                    )}
                  </Popup>
                </div>
                {showLoader && 
                    <div className="loader-container">
                        <span className="loader"> <Hourglass /> </span>
                    </div>
                }
                {
                    showNoUsersDataMsg ?  
                        <p className="no-users-msg">{noUsersDataMsg}</p> :  
                        
                        usersData.length > 0 && 
                            <div className="users-data-container"> 
                                 <table style={{ width: "100%", borderCollapse: "collapse" }} border="1">
                                    <thead>
                                    <tr>
                                        <th className="table-user-id">ID</th>
                                        <th className="table-firstname-lastname">First Name</th>
                                        <th className="table-firstname-lastname">Last Name</th>
                                        <th className="table-email">Email</th>
                                        <th className="table-department">Department</th>
                                        <th className="table-options"> Action </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {usersData.map((user) => (
                                        <tr key={user.userId}>
                                            <td className="table-user-id-data">{user.userId}</td>
                                            <td className="table-firstname-lastname-data">{user.firstName}</td>
                                            <td className="table-firstname-lastname-data">{user.lastName}</td>
                                            <td className="table-email-data">{user.email}</td>
                                            <td className="table-department-data">{user.department}</td>
                                            <td> 
                                                <div className="action-btn-container">
                                                <Popup
                    modal
                    trigger={
                        <button type='button' className="edit-del-btn"> <MdEdit /> </button>
                    }
                  >
                    {close => (
                      <>
                        <form className="form-main-container" onSubmit={(e) => onUpdateUser(e, user.userId, close)}>
                            <div className="heading-cancel-button-container">
                                <div className="new-user-form-close-btn-container">
                                    <button type="button" onClick={() => close()} className="new-user-form-close-btn"> <IoMdCloseCircle /> </button>
                                </div>
                                <h1 className="add-new-user-heading"> Update User Details </h1>
                            </div>

                            <div className="new-users-inputs-container">
                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="userid"> User Id </label>
                                    <input type='text' id="userid" value={user.userId} className="new-user-input-box" required/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="firstname"> Firstname (Optional) </label>
                                    <input type='text' id="firstname" onChange={(e) => setNewUserFirstName(e.target.value)} value={newUserFirstName} className="new-user-input-box" placeholder="Enter your Firstname"/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="lastname"> Lastname (Optional) </label>
                                    <input type='text' id="lastname" onChange={(e) => setNewUserLastName(e.target.value)} value={newUserLastName} className="new-user-input-box" placeholder="Enter your Lastname" />
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="email"> Email (Optional) </label>
                                    <input type='text' id="email" onChange={(e) => setNewUserEmail(e.target.value)} value={newUserEmail} className="new-user-input-box" placeholder="Enter your Email"/>
                                </div>

                                <div className="firstname-lastname-email-department-input-container">
                                    <label className="new-user-labels" htmlFor="department"> Department (Optional) </label>
                                    <input type='text' id="department" onChange={(e) => setNewUserDepartment(e.target.value)} value={newUserDepartment} className="new-user-input-box" placeholder="Enter your Department" />
                                </div>

                                <div className="user-confirmation-message-submit-btn-container">
                                    <div className="user-confirmation-checkbox-container">
                                        <div className="new-user-confimation-msg-container">
                                            <input type="checkbox" id="confirmation-msg" onChange={updateNewUserConfirmationStatus} className="new-user-check-box" required /> 
                                            <label className="new-user-confirmation-label" htmlFor="confirmation-msg"> I accept all the provided details are correct. </label>
                                        </div>
                                    </div>
                                    {newUserErrStatus && <p className="error-msg"> {newUserErr} </p>}
                                    <button
                                        type="submit" className="new-user-form-btn">
                                        Update
                                    </button>
                                </div>
                            </div>
                          
                            
                        </form>
                      </>
                    )}
                  </Popup>
                  <button onClick={() => onDeleteUser(user.userId)} className="edit-del-btn"> <MdDelete /> </button>
                </div>
            </td>
                                        
        </tr>
    ))}
</tbody>
</table>
</div>
                        
}
    </div>
</div>
    )
}


export default Home
