import React from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasssordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasssordResetError(null);
    } catch (err) {
      console.error("Error Sending Email", err);
      setPasssordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Your registered email"
        onChange={e => setResetPasswordEmail(e.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check Your Mailbox for Password Reset.</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
