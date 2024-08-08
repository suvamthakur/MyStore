import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { formValidation } from "../utils/helper";
import { auth, provider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef("");
  const email = useRef("");
  const password = useRef("");

  const handleLogin = () => {
    const error = formValidation(
      name?.current?.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(error);

    // Authentication
    if (!error) {
      if (isSignUp) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            updateProfile(user, {
              displayName: name.current.value,
              photoURL:
                "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
            })
              .then(() => {
                const { uid, displayName, email, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                  })
                );
              })
              .then(() => {
                // If someone access login even before main page
                if (window.history.length === 2) {
                  navigate("/");
                } else {
                  navigate(-1); // window.history.go(-1)
                }
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in

            if (window.history.length === 2) {
              navigate("/");
            } else {
              navigate(-1);
            }
          })
          .catch((error) => {
            setErrorMessage("User not found! Invalid email or password");
          });
      }
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Success
        if (window.history.length === 2) {
          navigate("/");
        } else {
          navigate(-1);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="my-[4%] px-4">
      <h1 className="text-center mb-6 mt-10 sm:mt-0  font-semibold text-3xl text-sky-950">
        MyStore
      </h1>

      <form
        action=""
        className="max-w-[450px] m-auto bg-sky-950 p-6 rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-gray-100 font-semibold text-2xl mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <div className="flex flex-col font-semibold text-sky-400">
          {isSignUp && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Full Name"
              className="login-input p-1 mb-4 bg-transparent outline-none border-b border-sky-800"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Enter Email"
            className="login-input p-1 bg-transparent outline-none border-b border-sky-800"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter Passowrd"
            className="login-input mt-4 p-1 bg-transparent outline-none border-b border-sky-800"
          />
        </div>
        <p className="font-semibold text-red-400 mt-2">{errorMessage}</p>

        <div className="flex flex-col my-6 font-semibold">
          <button
            className="bg-sky-900 p-2 text-gray-100 rounded mb-2.5"
            onClick={() => handleLogin()}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            className="border border-sky-900 p-2 rounded text-sky-400 opacity-95 flex items-center justify-center"
            onClick={() => handleGoogleLogin()}
          >
            <FcGoogle className="mr-2 text-lg" />
            Continue With Google
          </button>
        </div>

        <p className="text-center text-gray-100">
          {isSignUp ? "Already have an account?" : "New to Amazon?"}

          <span
            className="ml-1 underline text-sky-400 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign in" : "Create an account"}
          </span>
        </p>
      </form>
    </div>
  );
};
export default Login;
