import classes from './UserItem.module.css';
import Card from "../card/Card";
import { useHistory } from 'react-router-dom';
import myAxios from '../../myAxios';
function UserItem (props){
    const history = useHistory();
    let { id,firstName, lastName, email, isAdmin } = props.user
   function goToNewUserPage(){
        history.push(`/users/${id}/update`)
    }

    function deleteUser(){
        myAxios.delete(`/users/${id}`)
        .then(res=>{
            window.location.reload();
        })
    }
    return (

        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{email}</h3>
                    <p>{firstName}{lastName}</p>
                    <h5>Admin: {isAdmin?"Yes":"No"}</h5>
                </div>
                <div className={classes.actions}>
                    <button onClick={goToNewUserPage}>Update</button>
                    <button onClick={deleteUser}>Delete</button>
                </div>
            </Card>
        </li>
    )
}

export default UserItem