import { useRef } from "react";


import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef=useRef();
const submitHandler=event=>{
  event.preventDefault();


  const enteredNewPassword = newPasswordInputRef.current.value;
  //add validation

  
}


  


  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
