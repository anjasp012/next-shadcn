import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Hook to manage user state with cookies
const useAuth = () => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie);
                setAuth({ user });
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                setUser(null);
            }
        }
    }, []);

    return { auth, setAuth };
};

export default useAuth;
