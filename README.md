# CNG Station Management System 🚗💨

## Project Overview 🌟

The **CNG Station Management System** is a web-based application designed for managing 3-wheeler (CNG) services in Bangladesh. It provides functionality for both drivers and administrators to efficiently operate and manage CNG stations.

## Roles 🧑🚗👨‍💼

### Driver 👨‍✈️

- **Registration**: Drivers can register on the platform.
- **Approval Process**: Driver registrations are pending until approved by an admin.
- **Login**: Registered drivers can log in to the system.
- **Request Serial**: Drivers can request a serial number for refueling.
- **View Current Serial Line**: Access to real-time information on the current serial queue.
- **History & Profile**: View personal refueling history and manage their profiles.
- **Location-Based Access**: Drivers can request serials only when within a specific 100-meter radius.

### Admin 👨‍💼

- **Login**: Admins can log in to the system.
- **View Current Serial Line**: Access to real-time information on the current queue.
- **Manage Users**: Admins can approve or ban driver accounts.
- **View User Profiles**: Access to driver profiles for management.

## Tech Stack 🛠️

This project is built using the MERN stack:

- **MongoDB**: For storing user data, serial records, and station information.
- **Express.js**: For creating a RESTful API to interact with the database.
- **React.js**: Building the user interface for drivers and admins.
- **Node.js**: Running the server-side logic and API endpoints.

## Installation 📦

To get started with the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Set up your MongoDB database and configure the connection.
5. Run `npm start` to start the development server.

## Features 🔥

- **User Authentication**: Secure user registration and login.
- **Admin Control**: Administrators have control over user accounts.
- **Real-Time Queue**: Drivers can see the current serial line in real-time.
- **Location Services**: Geofencing to enable serial requests within 100 meters.
- **User Profiles**: Drivers and admins can manage their profiles.

## Roadmap 🗺️

Future enhancements may include:

- Mobile app development for drivers.
- Analytics and reporting tools.
- Payment integration for refueling transactions.

## Contributions 🙌

Contributions are welcome! Feel free to fork this project and submit pull requests.

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Happy Coding! 🚀👨‍💻
