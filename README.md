# 🔐 EntropyX

**EntropyX** is a modern password generator and strength analyzer built to help users create secure, high-entropy passwords with real-time feedback.

Powered by [`zxcvbn`](https://github.com/dropbox/zxcvbn), EntropyX evaluates passwords based on real-world attack patterns and provides actionable insights to improve security — not just random complexity.

## 🧠 How It Works

EntropyX uses zxcvbn, a password strength estimator developed by Dropbox, which analyzes passwords using:

Common password patterns
Dictionary attacks
Substitutions (e.g. p@ssw0rd)
Real-world cracking strategies

This results in a more accurate estimate than traditional “length + symbols” checkers.

## 🚀 Features

### 🔑 **Secure Password Generation**

- Generate strong, randomized passwords instantly

### 📊 **Real-Time Strength Analysis**

- Powered by `zxcvbn` for realistic scoring

### ⏱️ **Crack Time Estimation**

- See how long it would take to break your password

### 💡 **Smart Feedback**

- Suggestions to improve weak passwords

### 👁️ **Show / Hide Password**

- Toggle visibility for usability and security

### 📋 **One-Click Copy**

- Quickly copy passwords to clipboard

### ⚡ **Smooth UI Interactions**

- Subtle animations for a responsive feel

## 🔐 Privacy

EntropyX does not store, transmit, or share any passwords. All password generation and strength analysis are performed locally in your browser. Your data never leaves your device.

## ⚡ Future Improvements

- Undo/History of Generated password
- Apply options to currently generated instead of regenerating with every change (allows users to quickly create variations)
- Export to password manager (1Password, NordPass, LastPass, etc)
