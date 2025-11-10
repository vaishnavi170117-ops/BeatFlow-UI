import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons

const ChangePassword = ({ user, onSuccess, onError }) => {
    // State for form fields
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // State for password visibility (one state for each field)
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // State for error messages
    const [oldPassError, setOldPassError] = useState('');
    const [newPassError, setNewPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    
    // Mock current password (In a real app, this would be validated on the backend)
    const MOCK_CURRENT_PASSWORD = 'password123'; 

    // --- Validation Logic (Unchanged from previous response) ---
    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/^[a-zA-Z]/.test(password)) {
            return "Password must start with a letter.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one capital letter.";
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let valid = true;
        let errors = { old: '', new: '', confirm: '' };

        // 1. Validate Old Password (Mock Backend Check)
        if (oldPassword !== MOCK_CURRENT_PASSWORD) {
            errors.old = "Not correct password.";
            valid = false;
        }

        // 2. Validate New Password rules
        errors.new = validatePassword(newPassword);
        if (errors.new) valid = false;

        // 3. Validate New and Confirm Password match
        if (newPassword !== confirmPassword) {
            errors.confirm = "New password and Confirm Password do not match.";
            valid = false;
        } else if (confirmPassword === '') {
            errors.confirm = "Confirm Password cannot be empty.";
            valid = false;
        }

        // Update state with errors
        setOldPassError(errors.old);
        setNewPassError(errors.new);
        setConfirmPassError(errors.confirm);
        
        if (valid) {
            alert("Password successfully changed!");
            // Reset form
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    // Helper function to render visibility button and toggle state
    const VisibilityToggle = ({ isVisible, toggleVisibility }) => {
        const Icon = isVisible ? EyeOff : Eye;
        return (
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
                onClick={toggleVisibility}
            >
                <Icon size={20} />
            </button>
        );
    };

    const errorClass = "text-red-400 text-sm mt-1";
    const inputClass = "w-full p-3 pl-10 pr-10 rounded-lg bg-black/40 border border-transparent text-white focus:outline-none focus:border-purple-500 transition duration-200";

    return (
        <div className="p-6 md:p-10 bg-white/10 rounded-xl shadow-2xl backdrop-blur-md w-full max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Change Password</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Old Password */}
                <div>
                    <label htmlFor="old-password" className="block text-purple-200 font-semibold mb-2">Old Password</label>
                    <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="old-password"
                            type={showOldPass ? 'text' : 'password'} // Toggle type
                            value={oldPassword}
                            placeholder="Enter Old Password" // Added placeholder
                            onChange={(e) => {
                                setOldPassword(e.target.value);
                                setOldPassError('');
                            }}
                            className={inputClass}
                        />
                        {/* Visibility Toggle */}
                        <VisibilityToggle 
                            isVisible={showOldPass} 
                            toggleVisibility={() => setShowOldPass(!showOldPass)} 
                        />
                    </div>
                    {oldPassError && <p className={errorClass}>{oldPassError}</p>}
                </div>

                {/* 2. New Password */}
                <div>
                    <label htmlFor="new-password" className="block text-purple-200 font-semibold mb-2">New Password</label>
                    <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="new-password"
                            type={showNewPass ? 'text' : 'password'} // Toggle type
                            value={newPassword}
                            placeholder="Enter New Password" // Added placeholder
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setNewPassError('');
                            }}
                            className={inputClass}
                        />
                        {/* Visibility Toggle */}
                        <VisibilityToggle 
                            isVisible={showNewPass} 
                            toggleVisibility={() => setShowNewPass(!showNewPass)} 
                        />
                    </div>
                    {newPassError && <p className={errorClass}>{newPassError}</p>}
                    {!newPassError && newPassword && validatePassword(newPassword) === '' && (
                         <p className="text-green-400 text-sm mt-1">Password meets requirements!</p>
                    )}
                </div>

                {/* 3. Confirm New Password */}
                <div>
                    <label htmlFor="confirm-password" className="block text-purple-200 font-semibold mb-2">Confirm Password</label>
                    <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="confirm-password"
                            type={showConfirmPass ? 'text' : 'password'} // Toggle type
                            value={confirmPassword}
                            placeholder="Confirm New Password" // Added placeholder
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setConfirmPassError('');
                            }}
                            className={inputClass}
                        />
                        {/* Visibility Toggle */}
                        <VisibilityToggle 
                            isVisible={showConfirmPass} 
                            toggleVisibility={() => setShowConfirmPass(!showConfirmPass)} 
                        />
                    </div>
                    {confirmPassError && <p className={errorClass}>{confirmPassError}</p>}
                    {!confirmPassError && confirmPassword && newPassword === confirmPassword && (
                        <p className="text-green-400 text-sm mt-1">Passwords match!</p>
                    )}
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="w-full mt-6 py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;