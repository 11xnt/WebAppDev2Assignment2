import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);
export const userArray = ["test1"];
const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");


    const authenticate = (username) => {
        if(userArray.includes(username)) {
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    const register = async (username) => {
        userArray.push(username)
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signout,
                userName
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;