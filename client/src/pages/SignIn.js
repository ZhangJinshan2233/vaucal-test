import React, { useRef,useEffect } from 'react'
import classes from './SignIn.module.css';
import Card from '../components/card/Card';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'
function SignIn () {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef=useRef();
    // const dispatch = useDispatch();
    
    function submitHandler (event)  {
        event.preventDefault();
        let enteredEmail=emailInputRef.current.value;
        let enteredPassword=passwordInputRef.current.value;
        let  userCredential={
            email:enteredEmail,
            password:enteredPassword
        }
        Axios.post('/api/v0/users/signin',userCredential)
        .then(res=>{
            localStorage.removeItem("accessToken")
            localStorage.setItem("accessToken",res.data.accessToken)
            if(res.data.isAdmin==1){
                history.push('/users')
            }else{
                history.push(`/userDetails/${res.data.id}`)
            }
        })
      
    }
    const goToSignUpPage = () => {
        history.push('/signup')
    }
    return (
        <section>
            <h1>LOGIN</h1>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' required id='email' ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' required id='password' ref={passwordInputRef} />
                    </div>

                    <div className={classes.actions}>
                        <button>Login</button>
                    </div>
                </form>
            </Card>
            <div className={classes.actions}>
                <button onClick={goToSignUpPage}>SignUp</button>
            </div>
        </section>

    )
}

export default SignIn