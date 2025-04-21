# 🔒 secure-login-demo

## Understanding & Mitigating CWE-521 in Login Pages

This repository provides a practical demonstration and sample implementation addressing **CWE-521: Weak Password Requirements**, specifically focusing on the risks associated with verbose or informative error messages on login pages. It showcases how seemingly helpful feedback during login attempts can inadvertently aid attackers in user enumeration and brute-force attacks.

The code here illustrates a login front-end incorporating recommended security practices to counter these vulnerabilities, based on principles from the OWASP Application Security Verification Standard (ASVS).

## ✨ Key Security Implementations

This demo login screen integrates the following security-enhancing features:

-   **Secure Input Handling:**
    * Uses appropriate HTML input types (`type="text"` for username, `type="password"` for password) for better browser handling and accessibility.
-   **Enhanced Password Manager Support:**
    * Leverages `autocomplete` attributes (`autocomplete="username"` and `autocomplete="current-password"`) to securely assist password managers, improving user experience without storing credentials client-side.
-   **User-Friendly Password Visibility:**
    * Includes a toggle to safely reveal/hide the password input, balancing usability and the need for users to verify their input.
-   **Server-Side Hashing Focus:**
    * Emphasizes that passwords are sent securely (simulated via HTTPS) for server-side hashing and verification. **Crucially, client-side hashing is avoided** as it offers no real security benefit against a determined attacker and can mislead developers.
-   **Ambiguous Error Responses:**
    * Employs generic error messages for failed login attempts to prevent attackers from distinguishing between invalid usernames and incorrect passwords, thwarting user enumeration.
-   **Brute Force Protection (Client-Side Simulation):**
    * Implements a progressive delay mechanism (exponential backoff) after multiple failed login attempts from the client, a simple step to discourage basic brute-force attempts (note: server-side rate limiting is essential for robust protection).
-   **No Client-Side Credential Storage:**
    * Strictly avoids storing user credentials in browser storage mechanisms like `localStorage` or `sessionStorage`.
-   **Basic Front-End Validation:**
    * Includes minimal client-side validation (e.g., checking for empty fields) without exposing sensitive information like password policy requirements.
-   **Preventing Duplicate Submissions:**
    * Disables the login button during the submission process to prevent accidental or intentional multiple login requests.
-   **Accessibility Considerations:**
    * Incorporates basic ARIA attributes and manages focus to improve usability for users relying on assistive technologies.

## 🚀 Getting Started

This demo is intended for educational purposes to show front-end security best practices related to CWE-521.

**To run the demo:**

1.  Go to this repository site:
    [https://robdicoco.github.io/safe-Login/](https://robdicoco.github.io/safe-Login/)

## ▶️ Demo Credentials

For demonstration purposes, the login will only succeed with the following hardcoded credentials:

* **Username:** `admin`
* **Password:** `password123`

Any other username/password combination will trigger a generic login failure message and contribute to the progressive delay mechanism.

## 🛡️ Contribution & Feedback

Feel free to explore the code, suggest improvements, or point out potential enhancements related to front-end login security.