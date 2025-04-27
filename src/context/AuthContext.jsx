import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [currentUser,SetCurrentUser] = useState(

        JSON.parse(localStorage.getItem("user")) || null
    
    );

    const updateUser= (data)=>{
        SetCurrentUser(data);
    };

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]);


    //注意这里的value 是需要{{ }}
    //第一层 {} 是为了在 JSX 中嵌入 JavaScript，第二层 {} 是定义了一个包含 currentUser 和 updateUser 两个属性的对象。
    return(<AuthContext.Provider value={{currentUser,updateUser}}>{children}</AuthContext.Provider>)
}