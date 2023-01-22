# Habit Pilot

Habit Pilot is a habit tracker app that helps you build good habits and break bad ones. It's a simple app with Github-like commit charts and a simple interface.

## Features

- Simple interface
- Github-like commit charts
- Daily reminders to track your habits

## Self-hosting

Habit Pilot is open source and you can host it yourself. 

Followings are the steps to self-host Habit Pilot:

- Create a new Firebase project and enable Google Sign-In

- Get a PostgreSQL database and migrate the database schema using the following command:

```bash

npx prisma migrate dev --name init


```

- copy the `.env.example` file to `.env` and fill in the values


- Create a new Courier account and create a new template with the following attributes:

  - subject
  - message
  - btnTxt
  - btnLink

- Copy paste the `.env.example` file to `.env` and fill in the values

- Install the dependencies and run the app

```bash
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or a pull request.

## License

MIT