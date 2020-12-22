import * as google from 'googleapis';

/**
 * Class wrapper for simple google OAuth.
 */
export default class GoogleOAuth {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private client: google.Auth.OAuth2Client;

    /**
     * Constructor for simple google oauth class.
     * @param clientId Google Client ID for your application, can create them at Google Dev Console.
     * @param clientSecret Google Client Secret for your application, can create them at Google Dev Console.
     * @param redirectUri Callback URL which is requested when login is clicked on the google login.
     */
    constructor(clientId: string, clientSecret: string, redirectUri: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.client = new google.Auth.OAuth2Client({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: this.redirectUri
        });
    }

    /**
     * Uses the instantiated client to generate an auth URL.
     * @param accessType Access type for the auth URL.
     * @param scopes PErmitted scopes e.g. profile, email. Can be found: https://developers.google.com/identity/protocols/oauth2/scopes
     */
    getAuthURL(accessType: string, scopes: string[]) {
        return this.client.generateAuthUrl({
            access_type: accessType,
            scope: scopes.join(' ')
        });
    }

    /**
     * Decodes the ID Token to retrieve the user's details.
     * @param idToken ID Token to decode.
     */
    async getUserProfile(idToken: string) {
        const { tokens } = await this.client.getToken(idToken);
        this.client.setCredentials(tokens);
        const userDetails = await this.client.verifyIdToken({
            idToken: tokens.id_token
        });
        return userDetails;
    }
}
