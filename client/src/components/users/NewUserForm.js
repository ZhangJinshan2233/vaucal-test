import Card from '../card/Card'
import classes from './NewUserForm.module.css';
import Axios from "axios";
import React, { useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
const NewUserForm = (props) => {
    const history = useHistory();
    const match = useRouteMatch();
    let isAdminAdd = match.url.split('/').includes('add');
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const isAdminInputRef = useRef();
    const [isChecked, setIsChecked] = useState(0);
    const handleOnChange = () => {
        setIsChecked(1);
    };
    function submitHandler(event) {
        event.preventDefault();
        let enteredEmail = emailInputRef.current.value;
        let enteredPassword = passwordInputRef.current.value;
        let enteredFirstName = firstNameInputRef.current.value;
        let enteredLastName = lastNameInputRef.current.value;
        let enteredIsAdmin = isAdminInputRef.current.value;
        let user = {
            email: enteredEmail,
            password: enteredPassword,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            isAdmin: enteredIsAdmin
        }

        Axios.post('/api/v0/users', user)
            .then(res => {
                if (res.data.message) {
                    if (isAdminAdd) {
                        history.push('/users')
                    } else {
                        history.push('/')
                    }

                }

            })
    }
    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' required id='email' ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' required id='firstName' ref={firstNameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input id='lastName' ref={lastNameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' required id='password' ref={passwordInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='isAdmin'>Is Admin</label>
                    <input type='checkbox' id='isAdmin'
                        value={isChecked}
                        onChange={handleOnChange}
                        ref={isAdminInputRef} />
                </div>
                <div className={classes.actions} >
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </Card>
    )
}

export default NewUserForm