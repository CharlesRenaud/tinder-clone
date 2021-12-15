import React, {createContext, useContext, useState, useEffect, useMemo} from 'react'
import { View, Text } from 'react-native'
import * as Google from "expo-google-app-auth"
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "@firebase/auth"


import { auth } from '../firebase'


const AuthContext = createContext({});

const config = {
    androidClientId: '363913278377-ctkk3bveltrppbps9ctg5mi6h49nmot0.apps.googleusercontent.com',
    iosClientId: '363913278377-m845mcd4748miv48t9o0o9hamvtk65be.apps.googleusercontent.com',
    scopes : ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() =>  
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
            }else{
                setUser(null)
            }
            setLoadingInitial(false)
        }), 
        [])

    const signInWithGoogle = async() => {
        setLoading(true);

        await Google.logInAsync(config).then(async (loginResult) => {
            if(loginResult.type === "success") {
                // login
                const { idToken, accessToken } = loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth ,credential);

            }
            return Promise.reject();
        }).catch((error) => setError(error)).finally(()=>setLoading(false))
    };

    const logout = async () => {
        setLoading(true);
        signOut(auth).catch((error) => setError(error)).finally( () => setLoading(false) )
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        logout,
        signInWithGoogle
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={
            memoedValue
            }>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}

