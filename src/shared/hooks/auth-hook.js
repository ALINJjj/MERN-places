import { useState, useCallback,useEffect } from "react";
export const useAuth = () => {
    const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState();
    let lougoutTimer;
  const login = useCallback((userID, token, expirationDate) => {

    console.log(expirationDate);
    setUserId(userID);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem(
      "userToken",
      JSON.stringify({
        userId: userID,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    console.log(lougoutTimer);

    setToken(null);
    localStorage.removeItem("userToken");
  }, []);

  useEffect(() => {
    
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      console.log(remainingTime);
      lougoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(lougoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("userToken"));
    if (
      tokenData &&
      tokenData.token &&
      new Date(tokenData.expiration) > new Date()
    ) {
      login(tokenData.userId, tokenData.token, new Date(tokenData.expiration));
    }
  }, [login]);
  return { token, login, logout, userId }
}