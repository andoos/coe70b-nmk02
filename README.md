# CONTACT TRACING WRIST BAND WITH TEMPERATURE SENSOR AND CLOUD-BASED MONITORING

### FLC 
Naimul Mefraz Khan 

### Topic Category 
Software Systems 

### Preamble 
The COVID-19 pandemic has resulted in governments across the world developing contact tracing solutions to monitor and track the spread of the virus. Although smartphone application-based solutions are the most popular, it is not always possible to ensure that a person is carrying their smartphones. Especially in highly mobile environments such as at a manufacturing or storage facility, an easy alternative wearable-based solution is required.

## Objective 
To develop a wearable wristband that can provide contact tracing (proximity sensing) and temperature sensing. Alongside the wristbands, a cloud-based back end will provide pertinent information to administrators, such as areas in a facility/region where social distancing measures are not being maintained, potential outbreak of virus through temperature monitoring.

## Getting started
Requirements

- [Node.js](https://nodejs.org/en/) v14.15.4 (LTS)
- [npm]() v6.14.10

Start the backend development server:

    cd backend
    npm install
    npm start

Start the frontend development server:

    cd frontend
    npm install
    npm start

## Resources 

Created the frontend app using this [repo](https://github.com/facebook/create-react-app)

Frontend components and css from this [repo](https://github.com/creativetimofficial/black-dashboard-react)

Created the backend app using this [repo](https://expressjs.com/en/starter/generator.html)

## Frontend 
- File structure is as follows *to be updated after refactoring*

```
frontend/
.
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
|   └── robots.txt
└── src
    ├── App.js
    ├── index.css
    ├── index.js
    ├── assets
    │   ├── css
    │   ├── fonts
    │   ├── images
    ├── components
    │   ├── AdminNavBar
    │   │   └── AdminNavBar.js
    │   ├── BarGraph
    │   │   └── BarGraph.js
    │   ├── DataTable
    │   │   └── DataTable.js
    │   ├── LogoutButton
    │   │   └── LogoutButton.js
    │   ├── SettingsButton
    │   │   └── SettingsButton.js
    │   ├── UpdateButton
    │   │   └── UpdateButton.js
    └── views
        ├── LoginScreen
        │   └── LoginScreen.js
        └──  AdminDashboard.js
```

## Backend
- File structure is as follows
```
backend/
.
├── package-lock.json
├── package.json
├── app.js
├── database.js
├── bin
│   └── www
├── public
│   ├── images
│   ├── javascripts
|   └── stylesheets
└── routes
    ├── bluetooth.js
    ├── credentials.js
    ├── employee.js
    └── temperature.js
```

## Hardware 
