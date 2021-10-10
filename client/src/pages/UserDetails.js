import Card from '../components/card/Card';
import classes from './UserDetails.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, } from 'react';
import myAxios from '../myAxios';
import { useHistory, useRouteMatch } from 'react-router-dom';
function UserDetailsPage() {
    const match = useRouteMatch();
    const history=useHistory();
    const emailInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    let isAdminUpdate = match.url.split('/').includes('update');
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(undefined)
    let { id } = useParams();
    useEffect(() => {   
        myAxios.get(`/users/${id}`)
            .then(res => {
                let user = res.data.user;
                setIsLoading(false);
                setUser(user);
                emailInputRef.current.value=user.email
                firstNameInputRef.current.value=user.firstName;
                lastNameInputRef.current.value=user.lastName
            })
    }, [])

    function submitHandler(event) {
        event.preventDefault();
        let enteredEmail = emailInputRef.current.value;
        let enteredFirstName = firstNameInputRef.current.value;
        let enteredLastName = lastNameInputRef.current.value;
        let user = {
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName
        }
        
        myAxios.put(`/users/${id}`,user)
        .then(res => {
            if(isAdminUpdate){
                history.push('/users')
            }
        })
    }
    if (isLoading) {
        return (
            <Card>
                <div>...Loading</div>
            </Card>
        )
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler} >
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' required id='email'  ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' required id='firstName' ref={firstNameInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input id='lastName'  ref={lastNameInputRef} />
                </div>
                <div className={classes.actions} >
                    <button type='submit'>Update</button>
                </div>

            </form>
        </Card>
    )

}

export default UserDetailsPage