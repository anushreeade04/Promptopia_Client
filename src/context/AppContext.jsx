import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL 

    const navigate  = useNavigate()

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/user/credits', { 
                headers: { Authorization: `Bearer ${token}` } 
            });
    
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }


    const generateImage = async (prompt) => {
        try {
            const userId = user?._id; // Assuming `user` is stored in state
    
            const response = await axios.post(
                backendURL + '/api/image/generate-image',
                { userId, prompt },  // Include userId
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (!response || !response.data) {
                throw new Error("Invalid response from server");
            }
    
            const { success, resultImage, message, creditBalance } = response.data;
    
            if (success) {
                loadCreditsData();
                return resultImage;
            } else {
                toast.error(message || "Image generation failed");
                loadCreditsData();
    
                if (creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error(error.response?.data?.message || "Image generation failed");
        }
    };
    
    
    const Logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }
    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = { user, setUser, showLogin, setShowLogin, backendURL, token, setToken, credit, setCredit, loadCreditsData, Logout, generateImage };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
