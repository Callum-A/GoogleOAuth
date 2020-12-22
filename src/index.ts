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
   * First fetches the ID Token by authCode thne decodes the ID Token to retrieve the user's details.
   * @param authCode Auth code used to fetch the ID Token to then decode it.
   */
  async getUserProfileByAuthCode(authCode: string) {
    const { tokens } = await this.client.getToken(authCode);
    this.client.setCredentials(tokens);
    return await this.getUserProfileByIdToken(tokens.id_token);
  }

  /**
   * Get's a user's details by an ID token.
   * @param idToken ID token to decode and get the details from.
   */
  async getUserProfileByIdToken(idToken: string) {
    const userDetails = await this.client.verifyIdToken({
      idToken
    });
    return userDetails;
  }
}
