import { useState, useEffect } from 'react';
import UserList from "../components/users/UserList";
import myAxios from '../myAxios';
import classes from "./Users.module.css";
import { useHistory } from 'react-router-dom';
const UsersPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        myAxios.get('/users')
            .then(res => {
                let users = res.data.users;
                setIsLoading(false);
                setUsers(users);
                
            })
    }, [])

    const addNewUser=()=>{
        history.push('/users/add')
    }

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }
    return (
        <section>
            <h1>All users</h1>
            <div className={classes.actions}>
                <button onClick={addNewUser} >Add User</button>
            </div>

            <UserList users={users} />
        </section>
    )
}

export default UsersPage