import { useState, type FormEvent } from "react";
import "./AuthPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { services } from "../Api";
import { getAuthProfile, getAuthRole, getAuthToken, isAdmin, saveSession, saveUserProfile } from "./session";

type AuthPageProps = {
  adminSignup?: boolean;
  adminLogin?: boolean;
};

function getErrorMessage(error: unknown): string {
  const responseData = (error as { response?: { data?: { message?: string; title?: string } } })
    .response?.data;
  if (responseData?.message || responseData?.title) {
    return responseData.message || responseData.title || "";
  }
  return error instanceof Error ? error.message : "Authentication failed. Please try again.";
}

function AuthPage({ adminSignup = false, adminLogin = false }: AuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = !adminLogin && (adminSignup || location.pathname === "/signup");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(
    () => typeof location.state?.mobileNumber === "string" ? location.state.mobileNumber : ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      if (isSignup) {
        const request = { name: name.trim(), mobileNumber: mobileNumber.trim(), password };
        const response = adminSignup
          ? await services.authApi.adminSignup(request)
          : await services.authApi.signup(request);
        const token = getAuthToken(response.data);

        if (token) {
          saveSession(token, getAuthRole(response.data));
          saveUserProfile(getAuthProfile(response.data) ?? {
            name: name.trim(),
            mobileNumber: mobileNumber.trim(),
          });
          navigate(adminSignup ? "/admin-counter" : "/", { replace: true });
        } else if (adminSignup) {
          navigate("/login?returnTo=%2Fadmin-counter", {
            replace: true,
            state: {
              notice: "Admin account created. Sign in to open the counter.",
              mobileNumber: mobileNumber.trim(),
            },
          });
        } else {
          navigate("/login", {
            replace: true,
            state: { notice: "Account created. Sign in to continue." },
          });
        }
        return;
      }

      const response = await services.authApi.login({
        mobileNumber: mobileNumber.trim(),
        password,
      });
      const token = getAuthToken(response.data);

      if (!token) throw new Error("The server did not return an access token.");

      saveSession(token, getAuthRole(response.data));
      if (adminLogin && !isAdmin()) {
        setError("This account does not have administrator access.");
        return;
      }
      saveUserProfile(getAuthProfile(response.data) ?? {
        name: "",
        mobileNumber: mobileNumber.trim(),
      });
      const returnTo = new URLSearchParams(location.search).get("returnTo");
      const destination = adminLogin
        ? "/admin-counter"
        : returnTo !== null
        && returnTo.startsWith("/")
        && !returnTo.startsWith("//")
        ? returnTo
        : (isAdmin() ? "/admin-counter" : "/");
      navigate(destination, { replace: true });
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  const pageTitle = adminSignup
    ? "Create an admin account"
    : adminLogin
      ? "Admin sign in"
      : isSignup
        ? "Create your account"
        : "Welcome back";

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <Link className="auth-brand" to="/">KANINI QUEUE</Link>
        <p className="eyebrow">QUEUE ACCESS</p>
        <h1 id="auth-title">{pageTitle}</h1>
        <p className="auth-description">
          {adminSignup
            ? "Add an administrator who can manage the service queue."
            : adminLogin
              ? "Sign in to manage the service queue."
              : isSignup
                ? "Sign up to get started with the queue."
                : "Sign in to continue to your account."}
        </p>

        {location.state?.notice && <p className="auth-notice" role="status">{location.state.notice}</p>}
        {notice && <p className="auth-notice" role="status">{notice}</p>}
        {error && <p className="auth-error" role="alert">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Name
              <input
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          )}
          <label>
            Mobile number
            <input
              autoComplete="tel"
              inputMode="tel"
              required
              type="tel"
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        {!adminSignup && (
          adminLogin ? (
            <Link className="auth-back" to="/login">User sign in</Link>
          ) : (
            <p className="auth-switch">
              {isSignup ? "Already have an account? " : "New to the queue? "}
              <Link to={isSignup ? "/login" : "/signup"}>
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          )
        )}
        {adminSignup && <Link className="auth-back" to="/admin-counter">Back to counter</Link>}
        <Link className="auth-back" to="/">Return to public queue</Link>
      </section>
      <aside className="auth-aside" aria-hidden="true">
        <span>01 / SERVICE FLOW</span>
        <p>One clear line.<br />A better visit.</p>
        <div className="auth-aside__line" />
        <span>KANINI QUEUE SYSTEM</span>
      </aside>
    </main>
  );
}

export default AuthPage;