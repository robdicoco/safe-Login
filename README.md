# safe-Login
Sample of implementation of CWE-521 for a login page.


## Security Features Implemented

This login screen implements several security features based on OWASP ASVS recommendations:

1. **Appropriate Input Types**: Uses `type="text"` for username and `type="password"` for password.
2. **Autocomplete Support**: Properly configured autocomplete attributes to support password managers:

1. `autocomplete="username"` for the username field
2. `autocomplete="current-password"` for the password field



3. **Password Visibility Toggle**: Allows users to view their password while typing, improving usability without compromising security.
4. **No Client-Side Hashing**: Passwords are sent as plaintext over HTTPS (simulated in this demo) rather than being hashed client-side.
5. **Generic Error Messages**: Uses non-specific error messages to prevent user enumeration.
6. **Progressive Delay**: Implements exponential backoff after multiple failed login attempts to mitigate brute force attacks.
7. **No Local Storage of Credentials**: Credentials are not stored in localStorage or sessionStorage.
8. **Basic Front-End Validation**: Performs simple validation for empty fields without revealing password policy details.
9. **Button Disabling**: Disables the login button during submission to prevent multiple attempts.
10. **Accessibility Features**: Includes proper ARIA attributes and focus management.


## Usage

For demonstration purposes, the login accepts:

- Username: `admin`
- Password: `password123`


Any other combination will result in a login failure.
