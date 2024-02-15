# About this Project

This application demonstrates user authentication and fine grained authorization:

Authentication
- Logging in to Auth0 using Redirect Mode
- Accessing profile information that has been provided in the ID token

Authorization
- Gated content. The `/profile` route is not accessible without having first logged in
- Fine Grained Authentication. User's can only approve expense reports for their subordinates


## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1.  Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2.  Use Google, GitHub or Microsoft Account to login.

## What is Okta Fine Grained Authentication?

Fine Grained Authorization (FGA) is Okta's [Fine-Grained Authorization](https://docs.fga.dev/intro/authorization-and-okta-fga#what-is-fine-grained-authorization-fga) at scale SaaS based on Google's [Zanzibar](https://docs.fga.dev/intro/authorization-and-okta-fga#what-is-zanzibar). As of this writing (Feb 2024), it is currently under development. It is designed to make it easy for application builders to easily add fine-grained authorization to their apps. It offers an HTTP API and has SDKs for programming languages like Node.js/JavaScript and GoLang. More languages and also policy languages like Rego are planned for the future. It is optimized for reliability and low latency at a high scale. For latency and compliance reasons we’ll have environments per jurisdiction (e.g. US, EU, AU) and also global clusters for applications that have a global user base.
## Installation

```bash
npm install
```

### Configuration

```txt
VITE_AUTH0_TENANT_DOMAIN=<the domain of your auth0 tenant or your custom domain if there is one>
VITE_AUTH0_CLIENT_ID=<the client_id of the front end app registered in Auth0>
VITE_API_AUDIENCE=<the audience of your api as registered in Auth0>
VITE_API_BASEURL=<>
```

## Compiles and hot-reloads for development

```bash
npm run serve
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Authors

- [Aaron Wolbach](https://github.com/WolbachAuth0)
- [Sam Yapkowitz](https://github.com/samyap4)
- [Auth0](https://auth0.com) by [Okta](https://www.okta.com/)


## License

This project is licensed under the MIT license. See the [MIT](https://choosealicense.com/licenses/mit/) file for more info.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.



## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

