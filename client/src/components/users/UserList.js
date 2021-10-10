import classes from './UserList.module.css';
import UserItem from './UserItem';
const UserList=(props)=>{
    const {users}=props
    return (
        <ul className={classes.list}>
            {
                users.map((user)=>{
                    return <UserItem 
                    key={user.id} 
                    user={user}
                    />
                })
            }
        </ul>
    )
}

export default UserList
