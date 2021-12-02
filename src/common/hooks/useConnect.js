import { useLocation, useHistory } from "react-router-dom";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Person } from "@stacks/profile";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export default function useConnect() {
  const history = useHistory();
  const location = useLocation();

  function authenticate() {
    showConnect({
      appDetails: {
        name: "MiamiStarter",
        icon: "https://minecitycoins.com/CityCoins_Logo_150x150.png",
      },
      redirectTo: "/projects",
      onFinish: () => {
        if (!location.pathname.includes("projects")) {
          history.push("/projects");
        }
        window.location.reload();
      },
      userSession,
    });
  }

  function getUserData() {
    return userSession.loadUserData();
  }

  function getPerson() {
    return new Person(getUserData().profile);
  }

  return { authenticate, getPerson, getUserData };
}

// import { useCallback, useState } from "react";
// import { AppConfig, UserSession } from "@stacks/connect-react";
// import { showConnect } from "@stacks/connect";
// import { atom, useAtom } from "jotai";
// import { useUpdateAtom } from "jotai/utils";

// const appConfig = new AppConfig(["store_write", "publish_data"]);
// export const userSessionState = atom(new UserSession({ appConfig }));
// export const userDataState = atom();
// export const authResponseState = atom();

// export const useConnect = () => {
//   const [userSession, setUserSession] = useState(
//     new UserSession({ appConfig })
//   );
//   const setUserData = useUpdateAtom(userDataState);
//   const setAuthResponse = useUpdateAtom(authResponseState);

//   const onFinish = async (payload) => {
//     setAuthResponse(payload.authResponse);
//     const userData = await payload.userSession.loadUserData();
//     setUserData(userData);
//   };

//   const authOptions = {
//     onFinish,
//     userSession, // usersession is already in state, provide it here
//     redirectTo: "/",
//     manifestPath: "/manifest.json",
//     appDetails: {
//       name: "CityCoins",
//       icon: "https://minecitycoins.com/CityCoins_Logo_150x150.png",
//     },
//   };

//   const handleOpenAuth = () => {
//     showConnect(authOptions);
//   };

//   const handleSignOut = useCallback(() => {
//     userSession?.signUserOut("/");
//   }, [userSession]);

//   return { handleOpenAuth, handleSignOut, authOptions };
// };
