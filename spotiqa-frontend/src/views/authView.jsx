import "/src/styles/shared.css";
import "/src/styles/auth.css";

export function AuthView (props) {
  
  //Function to handle email input changes
  function handleAccountWithEmailACB(event) {
    if (props.onEmailChange) {
      props.onEmailChange(event.target.value);
    }
  }

  //Function to handle password input change
  function handlePasswordForEmailACB(event) {
    if (props.onPasswordChange) {
      props.onPasswordChange(event.target.value);
    }
  }

  //Function to go back to home page
  function goBackToStart() {
    props.onGoBack();
  }

  return (
    <div className = "auth-page">
      <div className="login-container">
        <div className="login-card"> 
          
          <div className="login-icon">👤</div>
              
          {/*Header*/}
          <div className = "login-header">
            <h2>{props.showForgotPassword ? "Reset Password" : props.isSignUpSwitch ? "Sign Up" : "Welcome back"}</h2>
            <p>
              {props.showForgotPassword
              ? "Enter your email to receive a reset link"
              : props.isSignUpSwitch
              ? "Create your account"
              : "Please sign in to continue"}
            </p>    
          </div>     

          {/*EMAIL*/}
          <div className={`form-group ${props.emailError ? "error" : ""}`}>
            <div className = "neu-input">
              <input
              type="email"
              value={props.email}
              placeholder=" "
              onInput={(e) => props.onEmailChange(e.target.value)}
              />
              <label>Enter Email</label>  
            </div>  

            <div className={`error-message ${props.emailError ? "show" : ""}`}> 
              {props.emailError}
            </div> 
          </div> 

          {/*PASSWORD - only show if not forgot password*/}
          {!props.showForgotPassword && (
            <div className={`form-group ${props.passwordError ? "error" : ""}`}>
              <div className="neu-input password-group">
                <input
                  type={props.showPassword ? "text" : "password"}
                  value={props.password}
                  placeholder=" "
                  onInput={(e) => props.onPasswordChange(e.target.value)}
                />

                <label>Password</label>

                <button className="neu-toggle" onClick={props.onTogglePasswordVisibility}>
                  👁
                </button>

              </div>

              <div className={`error-message ${props.passwordError ? "show" : ""}`}>
                {props.passwordError}
              </div>
            </div>
          )}

          {/* Remember me - only show if not forgot password and not sign up */}
          {!props.showForgotPassword && !props.isSignUpSwitch && (
            <div className="form-options">
              <label className="remember-wrapper">
                <input type="checkbox" />
                <span className="checkbox-label">
                  <span className="neu-checkbox"></span>
                  Remember me
                </span>
              </label>
            </div>
          )}

          {/* FORGOT PASSWORD - only show if not sign up and not already in forgot mode */}
          {!props.isSignUpSwitch && !props.showForgotPassword && (
            <div className="form-options">
              <a
                href="#"
                className="forgot-link"
                onClick={(e) => { e.preventDefault(); props.onToggleForgotPassword(); }} >Forgot password?
              </a> 
            </div>  
          )}

          {/* BUTTON */}
          <button
            className={`neu-button ${props.isLoading ? "loading" : ""}`}
            onClick={ props.showForgotPassword ? props.onForgotPassword : props.isSignUpSwitch ? props.onSignUp : props.onSignIn} 
          >
            <span className="btn-text"> 
              {props.showForgotPassword ? "Send Reset Email" : props.isSignUpSwitch ? "Sign Up" : "Sign In"}
            </span>

            <div className="btn-loader"> 
              <div className="neu-spinner"></div>
            </div>

          </button>

          {/* ERROR / SUCCESS */}
          {props.errorMessage && (
            <div className="error-message show">{props.errorMessage}</div>
          )}
          {props.successMessage && (<div className="success-message show">
            {props.successMessage} </div>     
          )}

          {/* SWITCH */}
          <div className="signup-link">
            <p> 
              {
                props.showForgotPassword? 
                <a href="#" onClick={(e) => { e.preventDefault(); props.onToggleForgotPassword(); }}>Back to Sign In</a>
                : props.isSignUpSwitch
                ? "Already have an account?"
                : "Don't have an account?"
              }

              {!props.showForgotPassword && (
                <a href="#" onClick={(e) => { e.preventDefault(); props.onToggleSwitch(); }}>
                  {props.isSignUpSwitch ? " Sign In" : " Sign Up"}
                </a> 
              )}
            </p>
          </div> 
        </div>
      </div>
    </div>
  );
}
