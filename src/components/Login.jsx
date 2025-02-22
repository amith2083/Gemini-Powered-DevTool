import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, signInWithGoogle } from "../utils/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { user, error: authError } = await (isRegistering
        ? registerUser(values.email, values.password)
        : loginUser(values.email, values.password));

        if (authError) {
          console.log("Auth Error:", authError); // Debugging
    
          if (authError?.message?.includes("auth/invalid-credential")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(authError?.message || "Something went wrong. Try again.");
          }
          return;
        }

      if (user) {
        navigate("/chat");
      }
    } catch (err) {
      console.log("Firebase Error:", err); // Debugging

    const errorMessage = err?.message || "An unknown error occurred.";

    if (errorMessage.includes("auth/invalid-credential")) {
      setError("Invalid email or password. Please try again.");
    } else if (errorMessage.includes("auth/user-not-found")) {
      setError("No account found with this email.");
    } else {
      setError(errorMessage);
    }
    } finally {
      setSubmitting(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const { user, error: authError } = await signInWithGoogle();
      if (authError) {
        setError(authError);
        return;
      }
      if (user) {
        navigate("/chat");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 backdrop-blur-lg bg-opacity-80 border border-gray-300 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isRegistering ? "Join us and start your journey!" : "Sign in to continue exploring"}
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              >
                {isSubmitting ? "Processing..." : isRegistering ? "Create Account" : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="my-6 text-center relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative px-4 text-gray-600">Or sign in with</div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-200"
        >
          <FaGoogle className="w-5 h-5 text-red-500" /> Continue with Google
        </button>

        <p className="text-center text-gray-700 mt-6">
          {isRegistering ? "Already have an account?" : "Don't have an account?"} 
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-pink-500 font-medium hover:underline"
          >
            {isRegistering ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
