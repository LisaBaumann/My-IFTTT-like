---
description: Documentation of Area HTTP server
---

# 🌐 Server

{% embed url="http://localhost:8080" %}
The server is available on 8080 port
{% endembed %}

## Outils

#### Nest JS

<figure><img src="../.gitbook/assets/logo (2).png" alt=""><figcaption><p>Nest JS logo</p></figcaption></figure>

The server was made with the Typescript language, using different frameworks, the most important of which: Nest JS. This framework is based on the division into modules of the project. This allows rapid, simple evolution and greater flexibility during modifications.&#x20;

Each module has a controller and the latter is linked to a service. The controller lists all the routes while the service contains all the functions useful for the proper functioning of the routes.

#### Express JS

It is a framework that allows to build web servers using node JS.

#### Json web token

JSON Web Token is an open standard defined in RFC 7519. It enables the secure exchange of tokens between multiple parties. This security of the exchange results in the verification of the integrity and authenticity of the data. It is carried out by the HMAC or RSA algorithm.

We use it to secure our routes and that these are accessible only when the user has an account and is logged in.

#### Bcrypt

It is a hash function based on the Blowfish encryption algorithm.

We use it to hash our users' passwords. So that no unhashed password can pass.

## Architecture

### Modules

#### Auth

Contains all the functions necessary for the proper functioning of the routes related to authentication.

#### User

Contains all the routes related to the user's information, an auth module is linked to it and contains all the functions allowing user authentication (register, login).

#### Platform

Contains all the routes allowing authentication (OAuth2) to a platform, information on the platforms available on the application.

#### Area

Contains all routes for creating, getting information, deleting actions and reactions from the user's account.

#### App

This module is the most important of the modules since it is the one that calls all the others. This module is called in the main file, which starts the application.



### Class diagram

{% embed url="https://lucid.app/documents/view/765535d9-d764-4788-859b-1e1c00d97dcd" %}
class UML
{% endembed %}

### How it works ?

The core of the code is in the Area module. The handleArea function is called every 10 seconds. Its role is to retrieve for each user his areas in the database and make the API calls corresponding to the actions he has chosen. If an action takes place, the function calls the corresponding reaction.

The code snippet below shows how the "Music change" action from Spotify is detected by the application.

```typescript
@Interval(10000) // call every 10 seconds
    async handleArea() {
        const area = await this.areaModel.find({}); // get areas from database
        const promises = area.map(async result => { // for each areas do ...
            if (result.action.platform == "spotify" && result.action.name == "Music change") { // if platform's name of action in area is spotify and the name of action is Music change do ...
                const infoMusic = await this.spotifyService.handleSpotifyArea(result.userId)
                if (infoMusic != null) {
                    await this.triggerReactions(result, infoMusic); // call function triggerReaction
                }
            }
        }
    }
```

The triggerReactions function allows for its part, with the same operation, to trigger the reaction.

The code below shows how Outlook's "Send email" reaction is handled.

```typescript
public async triggerReactions(info: any, data: {}) {
        const promises = info.reactions.map(async react => { // for each reactions get from the previous database call
            if (react.platform == "outlook" && react.name == "Send email") {
                await this.outlookService.sendEmail(info.userId, react, data);
            }
        }
    }
```

Each platform has an object assigned to it. This object contains different methods which all correspond to an action or a reaction. This will therefore be called either in handleArea or in triggerReactions depending on its usefulness.

## API documentation

The API documentation is released with Swagger

{% embed url="http://localhost:8080/documentation" %}
documentation link
{% endembed %}

## Security

All the routes are protected by Json web token. All passwords are stored and transferred hashed with bcrypt.&#x20;
