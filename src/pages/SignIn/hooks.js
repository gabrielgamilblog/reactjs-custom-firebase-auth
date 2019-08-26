import { useEffect, useState, useCallback, useContext } from "react";

export const useSignInWithCustomToken = (JWT, firebase) => {
  useEffect(() => {
    if (JWT && firebase) {
      firebase
        .signInWithToken(JWT)
        .then(() => {
          const base64Url = JWT.split(".")[1];
          const decodedValue = JSON.parse(atob(base64Url));
          localStorage.setItem("tenantId", decodedValue.claims.tenant);
        })
        .catch(function(error) {
          console.error("Error logging in: ", error);
        });
    }
  }, [JWT, firebase]);
};

export const useFetchJWTFromDjangoApp = credentials => {
  const [authResponseData, setAuthResponseData] = useState({
    JWT: "",
    error: false
  });

  useEffect(() => {
    if (credentials) {
      fetch("/api/authenticate/", {
        method: "post",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response bad.");
        })
        .then(data => {
          setAuthResponseData({ JWT: data.token, error: false });
        })
        .catch(error => {
          return setAuthResponseData({ JWT: "", error: true });
        });
    }
  }, [credentials]);
  return authResponseData;
};
