import React from 'react';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const AuthContext = React.createContext({auth: false, setAuth: () => {}})

export default AuthContext