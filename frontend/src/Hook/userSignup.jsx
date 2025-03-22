import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Input validation function
    const handleInputErrors = ({ name, email, password, confirmPassword }) => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        return true;
    };

    // Signup function
    const signup = async ({ name, email, password, confirmPassword }) => {
        if (loading) {
            toast.info("Signup in progress, please wait...");
            return;
        }

        // Validate input fields
        if (!handleInputErrors({ name, email, password, confirmPassword })) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }

            toast.success(data.message || "Signup successful!");
            // localStorage.setItem("authToken", JSON.stringify(data));
            navigate("/login");

        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default userSignup;
