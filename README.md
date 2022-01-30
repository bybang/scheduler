# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running DB Server

> First, set up scheduler-api from here(https://github.com/lighthouse-labs/scheduler-api)

```sh
npm start
```

## Running Error DB Server

> This will give the error state if the user try to save or delete the appointment

```sh
npm run error
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Features

> ### _Make the Appointment_
>
> Make the appointment on desired time with interviewer
> ![Save Appointment](https://user-images.githubusercontent.com/85023116/151290665-c15d8a07-dee4-4f52-9fb9-e73171154f1f.gif)

> ### _Edit the Appointment_
>
> If the user wants to change their interviewer or miss-typed their name, they can Edit
> ![Edit Appointment](https://user-images.githubusercontent.com/85023116/151290688-b4a88224-25b6-4f38-99ec-664730260e4d.gif)

> ### _Delete the Appointment_
>
> If the user wants to move appointment in different time, they can delete the appointment
> ![Delete Appointment](https://user-images.githubusercontent.com/85023116/151290708-88efe0fc-c3e6-42c5-b142-257fcfafdb36.gif)

> ### _Errors_
>
> If anything happend to the server, the app will shows the error messsage
> ![Save Error Handler](https://user-images.githubusercontent.com/85023116/151290777-a7e95c05-9000-4dd3-b974-9def49fba663.gif)

![Delete Error Handler](https://user-images.githubusercontent.com/85023116/151290788-558fa3be-7656-4750-ac2b-07afbd4b502d.gif)

> Student cannot make the appointment without the name
> ![Empty Name Error](https://user-images.githubusercontent.com/85023116/151290799-eeceae3d-2347-4254-84d4-6bd37a0cc82e.gif)
