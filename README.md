# Simple Google OAuth

This package simply wraps googleapis OAuth calls into simple class methods

## Usage

### Installation

To install simply run the following command:

```
npm install google-simple-oauth
```

### Importing and Instantiation

To import and use you can use the following:

```javascript
import GoogleOAuth from 'google-simple-oauth';

const gAuth = new GoogleOAuth(CLIENT_ID, CLIENT_SECRET, CALLBACK_URL);

// const authURL = gAuth.getAuthURL(ACCESS_TYPE, SCOPES);
const authURL = gAuth.getAuthURL('offline', [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]);

// Auth code as returned from the above URL callback query with the name code
gAuth.getUserProfileByAuthCode(authCode).then((user) => {
  console.log(user.getAttributes());
});
```

### Express Callback Example

```javascript
app.get('/oauth2callback', (req, res) => {
  const authCode = req.query.code;
  gAuth.getUserProfileByAuthCode(authCode as string).then((user) => {
    return res.json(user.getAttributes());
  });
});
```

### Decoding an ID Token Directly Example

For example using a front end library such as angularx-social-login it provides the ID token directly,
meaning we can directly decode it.

```javascript
gAuth.getUserProfileByIdToken(idToken).then((user) => {
  const userDetails = user.getAttributes();
  // Do stuff with the user details...
});
```
