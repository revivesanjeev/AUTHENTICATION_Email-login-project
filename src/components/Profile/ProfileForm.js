import { useRef ,useContext} from "react";


import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx=useContext(AuthContext);
  const newPasswordInputRef=useRef();
const submitHandler=event=>{
  event.preventDefault();


  const enteredNewPassword = newPasswordInputRef.current.value;
  //add validation
fetch(
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2PRBN-B7iDrOQeTYJRB7M_GknBB9MkXg",{
    method:'POST',
    body:JSON.stringify({
      idToken:authCtx.token,
      password:enteredNewPassword,
      returnSecureToken:false
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }
).then(res=>{
  //assume it is always succeed
})

};


  


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password"  minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
