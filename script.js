/**
 * Secure PWA Login Script
 * 
 * This script implements front-end security best practices according to OWASP ASVS
 * and addresses related CWEs for password usage in web applications.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const loginButton = document.getElementById('loginButton');
    const statusMessage = document.getElementById('statusMessage');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const spinner = loginButton.querySelector('.spinner');
    const buttonText = loginButton.querySelector('span');
    const eyeIcon = togglePasswordButton.querySelector('.eye-icon');
    const eyeOffIcon = togglePasswordButton.querySelector('.eye-off-icon');
    
    // Security-related variables
    let failedAttempts = 0;
    const MAX_FAILED_ATTEMPTS = 5;
    let lastAttemptTime = 0;
    
    /**
     * Toggle password visibility
     * OWASP ASVS: 2.1.5 - Verify users can change password visibility
     */
    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle visibility of eye icons
        eyeIcon.classList.toggle('hidden');
        eyeOffIcon.classList.toggle('hidden');
        
        // Set focus back to password input for better UX
        passwordInput.focus();
    });
    
    /**
     * Basic front-end validation
     * Note: This is only for UX. Real validation must happen server-side.
     * OWASP ASVS: 2.1.1 - Verify that user set passwords are at least 12 characters in length (server-side)
     */
    function validateForm() {
        let isValid = true;
        
        // Clear previous error messages
        usernameError.textContent = '';
        passwordError.textContent = '';
        
        // Check if username is empty
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Username is required';
            isValid = false;
        }
        
        // Check if password is empty
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        }
        
        return isValid;
    }
    
    /**
     * Display status message (success or error)
     */
    function showStatusMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message';
        statusMessage.classList.add(type);
        
        // Ensure the message is visible to screen readers
        statusMessage.setAttribute('aria-hidden', 'false');
    }
    
    /**
     * Clear status message
     */
    function clearStatusMessage() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
        statusMessage.setAttribute('aria-hidden', 'true');
    }
    
    /**
     * Set loading state for the login button
     */
    function setLoading(isLoading) {
        loginButton.disabled = isLoading;
        spinner.classList.toggle('hidden', !isLoading);
        buttonText.textContent = isLoading ? 'Logging in...' : 'Login';
    }
    
    /**
     * Calculate delay based on failed attempts
     * This implements a progressive delay to mitigate brute force attacks
     * OWASP ASVS: 2.2.1 - Verify that anti-automation controls are effective
     */
    function getDelayTime() {
        if (failedAttempts <= 2) return 0;
        return Math.min(30000, Math.pow(2, failedAttempts - 2) * 1000); // Exponential backoff, max 30 seconds
    }
    
    /**
     * Simulate a login request to the server
     * In a real application, this would be an HTTPS POST request to a secure endpoint
     * OWASP ASVS: 2.8.1 - Verify that anti-automation controls are effective
     */
    async function simulateLoginRequest(username, password) {
        // Simulate network delay (500-1500ms)
        const delay = Math.floor(Math.random() * 1000) + 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // For demo purposes, we'll consider 'admin'/'password123' as valid credentials
        // In a real application, NEVER hardcode credentials or validate them client-side
        if (username === 'admin' && password === 'password123') {
            return { success: true };
        } else {
            return { 
                success: false, 
                message: 'Invalid username or password' // Generic error message to prevent user enumeration
            };
        }
    }
    
    /**
     * Handle form submission
     * OWASP ASVS: 2.8.1 - Verify that anti-automation controls are effective
     */
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Clear any previous status messages
        clearStatusMessage();
        
        // Basic form validation
        if (!validateForm()) {
            return;
        }
        
        // Check if we need to enforce a delay due to previous failed attempts
        const currentTime = Date.now();
        const delayNeeded = getDelayTime();
        const timeElapsed = currentTime - lastAttemptTime;
        
        if (delayNeeded > 0 && timeElapsed < delayNeeded) {
            const remainingSeconds = Math.ceil((delayNeeded - timeElapsed) / 1000);
            showStatusMessage(`Too many failed attempts. Please try again in ${remainingSeconds} seconds.`, 'error');
            return;
        }
        
        // Update last attempt time
        lastAttemptTime = currentTime;
        
        // Get form values
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Set loading state
        setLoading(true);
        
        try {
            // Simulate sending credentials to server
            // OWASP ASVS: 2.10.4 - Verify that the application does not perform client-side hashing
            // Passwords should be sent over HTTPS and hashed server-side
            const response = await simulateLoginRequest(username, password);
            
            if (response.success) {
                // Reset failed attempts on successful login
                failedAttempts = 0;
                
                // Show success message
                showStatusMessage('Login successful! Redirecting...', 'success');
                
                // Simulate redirect after successful login
                setTimeout(() => {
                    window.location.href = '#dashboard'; // In a real app, redirect to a secure page
                }, 1500);
            } else {
                // Increment failed attempts
                failedAttempts++;
                
                // Show generic error message (to prevent user enumeration)
                // OWASP ASVS: 2.2.2 - Verify that the application limits failed login attempts
                showStatusMessage(response.message, 'error');
                
                // If max attempts reached, show additional message
                if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
                    const delaySeconds = getDelayTime() / 1000;
                    showStatusMessage(`Too many failed attempts. Please try again in ${delaySeconds} seconds.`, 'error');
                }
            }
        } catch (error) {
            // Handle network errors or other exceptions
            showStatusMessage('An error occurred. Please try again later.', 'error');
            console.error('Login error:', error);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    });
    
    /**
     * Clear status message when user starts typing again
     */
    usernameInput.addEventListener('input', clearStatusMessage);
    passwordInput.addEventListener('input', clearStatusMessage);
    
    /**
     * Register service worker for PWA functionality
     */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                });
        });
    }
});
