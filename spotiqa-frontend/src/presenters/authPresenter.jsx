import { reactive } from "vue";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { AuthView } from "../views/authView.jsx";
import { auth } from "../model/firestoreModel.js";
import { useRouter } from "vue-router";

//Reactive sttate to persist across rendering
const authState = reactive({
    enterEmail: "",
    enterPassword: "",
    showPassword: false,
    isSignUpSwitch: false,
    showForgotPassword: false,
    errorMessage: "",
    successMessage: "",
    emailError: "",
    passwordError: "",
    isLoading: false
});

//Function to sign out user
export function signOutUser() {
    signOut(auth);
}    

export function AuthPresenter() {
    const router = useRouter();
    
    //function to check email Format
    function validateEmailFormat(email) {
        if (!email) {
            return "Please enter an Email address";
        }
        if (!email.includes ("@") || !email.includes(".com")) {
            return "Please enter a valid Email address";
        }

        return "";
    }

    //function to check email Password
    function validateEmailPassword(password, isSignUp = false) {
        if (!password) {
            return "Please enter password";
        }
        if (isSignUp && password.length < 8) {
            return "Password must be at least 8 characters";
        }

        return "";
    }

    //function to handle errors & messages
    function handleErrorAndMessagesACB() {
        authState.errorMessage = "";
        authState.successMessage = "";
        authState.emailError = "";
        authState.passwordError = "";
    }

    //function to convert firease msgs to user friendly 
    function handleAuthenticationErrorMsgsACB(error) {
        authState.isLoading = false;
        const errorMessage = {
           "auth/email-already-in-use": "This email is already registered. Please try to sign in instead.",
           "auth/invalid-email": "The email address is not valid. Please enter check and try again.",
           "auth/weak-password": "The password is not strong enough. Enter atleast 8 characters.",
           "auth/wrong-password": "Incorrect password. Please try again or reset your password.",
           "auth/user-not-found": "No user found with this address. Please create/sign up first.",
           "auth/invalid-credentials": "Invalid email or password. Please check your credentials.",
           "auth/too-many-requests": "Too many failed attempts. Take a break and try again later",
           "auth/network-request-failed": "Connection is not stable. Plese check and try again."
        };

        authState.errorMessage = errorMessage[error.code] || "An error has occured. Please try again.";
    }

    //Callback for signing up with email & password
    function handleSignUpToCreateAcountACB() {
        handleErrorAndMessagesACB();
        const checkEmail = validateEmailFormat(authState.enterEmail);
        const checkPassword = validateEmailPassword(authState.enterPassword, true);

        if (checkEmail) {
            authState.emailError = checkEmail;
            return;
        }

        if (checkPassword) {
            authState.passwordError = checkPassword;
            return;
        }

        authState.isLoading = true;

        createUserWithEmailAndPassword(auth, authState.enterEmail, authState.enterPassword).then(() => {
            authState.isLoading = false;
            authState.successMessage = "Great! Account has successfully created! 🎊 ";
            handleErrorAndMessagesACB();
            router.push('/start');
        })
        .catch(handleAuthenticationErrorMsgsACB);
    }


    //Callback for signing in with email & password
    function handleSignInToAcountACB() {
        handleErrorAndMessagesACB();
        const checkEmail = validateEmailFormat(authState.enterEmail);
        const checkPassword = validateEmailPassword(authState.enterPassword, false);

        if (checkEmail) {
            authState.emailError = checkEmail;
            return;
        }

        if (checkPassword) {
            authState.passwordError = checkPassword;
            return;
        }

        authState.isLoading = true;

        signInWithEmailAndPassword(auth, authState.enterEmail, authState.enterPassword).then(() => {
            authState.isLoading = false;
            authState.successMessage = "Wohoo! You have signed in successfully!";
            handleErrorAndMessagesACB();
            router.push('/start');
        })
        .catch(handleAuthenticationErrorMsgsACB);
    }

    //function to handle handle forgot forgot password
    function handleForgotPasswordACB() {
        handleErrorAndMessagesACB();
        const checkEmail = validateEmailFormat(authState.enterEmail);
        if(checkEmail) {
            authState.emailError = checkEmail;
            authState.errorMessage = checkEmail;
            return;
        }
        authState.isLoading = true;

        sendPasswordResetEmail(auth, authState.enterEmail).then(() => {
            authState.isLoading = false;
            authState.successMessage = "Password reset email sent! Please check your inbox or spam.";
        })
        
        .catch (handleAuthenticationErrorMsgsACB);
    }

    //Function to handle email change, clear error when user start typing
    function handleEmailChangesACB(email) {
        authState.enterEmail = email;
        if (authState.emailError) {
            const validation = validateEmailFormat(email);
            if (!validation) {
                authState.emailError = "";
            }
        }
    }

    //Function to handle password change, clear error when user start typing
    function handlePasswordChangesACB(password) {
        authState.enterPassword = password;
        if (authState.passwordError) {
            authState.passwordError = "";
        }
    }

    //Function to show & hide password
    function handleTogglePasswordVisibilityACB() {
        authState.showPassword = !authState.showPassword;
        if (authState.passwordError) {
            authState.passwordError = "";
        }
    }

    //Function to toggle b/w Sign in & sign out
    function handleToggleSwitchACB() {
        authState.isSignUpSwitch = !authState.isSignUpSwitch;
        authState.showForgotPassword = false;
        handleErrorAndMessagesACB();
    }

    //Function to toggle forgot password
    function handleToggleForgotPasswordACB() {
        authState.showForgotPassword = !authState.showForgotPassword;
        handleErrorAndMessagesACB();
    }

    //Function to go back to homepage
    function goToStartACB() {
        router.push('/start');
    }

    return (
        <AuthView
            email = {authState.enterEmail}
            password = {authState.enterPassword}
            showPassword = {authState.showPassword}
            isSignUpSwitch = {authState.isSignUpSwitch}
            showForgotPassword = {authState.showForgotPassword}
            onSignUp = {handleSignUpToCreateAcountACB}
            onSignIn = {handleSignInToAcountACB}
            onForgotPassword = {handleForgotPasswordACB}
            onEmailChange = {handleEmailChangesACB}
            onPasswordChange = {handlePasswordChangesACB}
            onTogglePasswordVisibility = {handleTogglePasswordVisibilityACB}
            onToggleSwitch = {handleToggleSwitchACB}
            onToggleForgotPassword = {handleToggleForgotPasswordACB}
            onGoBack = {goToStartACB}
            errorMessage = {authState.errorMessage}
            successMessage = {authState.successMessage}
            emailError = {authState.emailError}
            passwordError = {authState.passwordError}
            isLoading = {authState.isLoading}
        />    
    );
}
