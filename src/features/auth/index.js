import { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useHistory } from "react-router-dom";

import { STATUS } from "../../common/constants";
import { Button, Loader } from "../../common/core";
import useConnect, { userSession } from "../../common/hooks/useConnect";

import styles from "./auth.module.css";

export default function Auth({ projectView = false }) {
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState(STATUS.idle);
  const handleError = useErrorHandler();
  const history = useHistory();
  const { authenticate } = useConnect();

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, [status]);

  async function handleConnectButtonClick() {
    try {
      setStatus(STATUS.loading);
      const userSession = await authenticate();
      console.log(userSession);
    } catch (error) {
      handleError(new Error(error.message));
    } finally {
      setStatus(STATUS.idle);
    }
  }

  async function handleLogoutButtonClick() {
    try {
      userSession.signUserOut(window.location.origin);
      setUserData({});
      history.push("/");
    } catch (error) {
      handleError(new Error("Sorry, we're having trouble logging out."));
    }
  }

  const balance = 0;

  const content = projectView ? (
    <Button
      text="connect to web3 to vote on and/or invest in projects"
      handleClick={handleConnectButtonClick}
    />
  ) : status === STATUS.loading ? (
    <Loader />
  ) : status === STATUS.idle && !userSession.isUserSignedIn() ? (
    <Button text="connect to web3" handleClick={handleConnectButtonClick} />
  ) : (
    <>
      <p>Connected:{userData.identityAddress}</p>
      <p>STX balance: {balance}</p>
      <Button text="log out" handleClick={handleLogoutButtonClick} />
    </>
  );

  return <section className={styles.container}>{content}</section>;
}
