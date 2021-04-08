# NMK02: Contact Tracing Wrist Band with Temperature Sensor and Cloud-Based Monitoring

### FLC

Naimul Mefraz Khan

### Topic Category

Software Systems

### Preamble

The COVID-19 pandemic has resulted in governments across the world developing contact tracing solutions to monitor and track the spread of the virus. Although smartphone application-based solutions are the most popular, it is not always possible to ensure that a person is carrying their smartphones. Especially in highly mobile environments such as at a manufacturing or storage facility, an easy alternative wearable-based solution is required.

### Objective

To develop a wearable wristband that can provide contact tracing (proximity sensing) and temperature sensing. Alongside the wristbands, a cloud-based back end will provide pertinent information to administrators, such as areas in a facility/region where social distancing measures are not being maintained, potential outbreak of virus through temperature monitoring.

## Getting Started

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

- Created the frontend app using this [repo](https://github.com/facebook/create-react-app)

- Frontend components and css from this [repo](https://github.com/creativetimofficial/black-dashboard-react)

- Created the backend app using this [repo](https://expressjs.com/en/starter/generator.html)

## Backend

- File structure is as follows

```
backend/
.
├── package-lock.json
├── package.json
├── app.js
├── database.js
├── bin/
│   └── www
├── public/
│   ├── images/
│   ├── javascripts/
|   └── stylesheets/
└── routes/
    ├── bluetooth.js
    ├── credentials.js
    ├── employee.js
    └── temperature.js
```

- Contains the following APIs _(TODO: remove unused APIs)_

```
    GET /v1/api/bluetooth
    GET /v1/api/bluetooth?startTime={startTime}&endTime={endTime}
    GET /v1/api/bluetooth/graph?startTime={startTime}&endTime={endTime}
    GET /v1/api/bluetooth/{wristId}

    GET /v1/api/credentials

    GET /v1/api/employee
    GET /v1/api/employee?startTime={startTime}&endTime={endTime}
    GET /v1/api/employee/flag
    GET /v1/api/employee/{wristId}
    GET /v1/api/employee/{wristId}?startTime={startTime}&endTime={endTime}

    GET v1/api/temperature
    GET v1/api/temperature?startTime={startTime}&endTime={endTime}
    GET v1/api/temperature/{wristId}
```

## Frontend

- File structure is as follows

```
frontend/
.
├── package-lock.json
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
|   └── robots.txt
└── src/
    ├── App.js
    ├── index.css
    ├── index.js
    ├── assets/
    │   ├── css/
    │   ├── fonts/
    │   ├── images/
    ├── components/
    │   ├── AdminNavBar
    │   │   └── AdminNavBar.js
    │   ├── BarGraph
    │   │   └── BarGraph.js
    │   ├── DataTable
    |   |   ├── DataTable.jsx
    │   ├── DateFilter
    |   |   ├── DateFilter.jsx
    │   │   └── DateFilter.module.css
    │   ├── LogoutButton
    |   |   ├── LogoutButton.jsx
    │   │   └── LogoutButton.module.css
    │   ├── Recommendation
    │   │   └── Recommendation.jsx
    │   ├── SettingsButton
    |   |   ├── SettingsButton.jsx
    │   │   └── SettingsButton.module.css
    │   ├── UpdateButton
    |   |   ├── UpdateButton.jsx
    │   │   └── UpdateButton.module.css
    └── views/
        ├── AdminDashboard
        │   ├── AdminDashboard.jsx
        │   └── LoginScreen.module.css
        └── LoginScreen
            ├──  LoginScreen.jsx
            └──  AdminDashboard.module.css
```

## Hardware

- Includes device code, lambda function, and scripts for reference
