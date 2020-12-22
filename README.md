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

// ID Token as returned from the above URL callback query
gAuth.getUserProfile(idToken).then((user) => {
    console.log(user.getAttributes());
});
```

### Express Callback Example

```javascript
app.get('/oauth2callback', (req, res) => {
    const idToken = req.query.code;
    gAuth.getUserProfile(idToken as string).then((user) => {
        return res.json(user.getAttributes());
    });
});
```
