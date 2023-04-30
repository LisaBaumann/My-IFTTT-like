---
description: Based on MongoDB
---

# 🌱 Database

The database makes it possible to store the user's information (email, password, email, name, surname), but also all the services to which he has connected and the actions / reactions he has chosen. We chose the MongoDB database because it uses the NoSQL language which, unlike the SQL language, is not rigid and allows flexibility in terms of data type.

<figure><img src="../.gitbook/assets/MongoDB.png" alt=""><figcaption><p>mongoDB logo</p></figcaption></figure>

## DB diagram

{% embed url="https://dbdiagram.io/d/63fe3263296d97641d84664e" %}
Dynamic DB diagram
{% endembed %}

## Details

{% tabs %}
{% tab title="User" %}
User informations, they enable login, and the password is hashed using bcrypt.
{% endtab %}

{% tab title="Platform" %}
Platform corresponds to the information concerning the application on which the user wants to connect to then choose actions and reactions (ex: Gmail). Staying connected to this app and making API requests requires an access token, and sometimes some apps provide a refresh token. Needed to refresh the old token.
{% endtab %}

{% tab title="Area" %}
Area corresponds to all of the action and associated reactions.
{% endtab %}

{% tab title="Action" %}
Action corresponds to the action chosen by the user, the parameters allow its proper functioning.
{% endtab %}

{% tab title="Reaction" %}
Reaction corresponds to all the reaction chosen by the user, the parameters allow its proper functioning.
{% endtab %}
{% endtabs %}

### Type schema available on :

{% embed url="http://localhost:8080/documentation" %}

<figure><img src="../.gitbook/assets/Screenshot 2023-02-28 at 21.06.42.png" alt=""><figcaption><p>DB diagram</p></figcaption></figure>

