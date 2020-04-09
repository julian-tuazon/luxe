# LUXE
A full stack Node.js and React shopping cart app.

## Technologies Used
- React.js
- Node.js
- Express.js
- PostgreSQL
- webpack
- npm
- HTML5
- CSS3
- Bootstrap 4

## Live Demo
https://luxe.juliantuazon.com/

## Features
- User can view products for sale
- User can view product details
- User can add products to the cart
- User can view a cart summary
- User can receive visual feedback if the information entered at checkout is valid/invalid
- User can place an order

## Preview
![luxe_ss](https://user-images.githubusercontent.com/57813827/78919112-4ad51780-7a46-11ea-82bf-393773a84f55.png)

## Development

#### System Requirements
  - Node.js 10 or higher.
  - npm 6 or higher.
  - PostgreSQL 10 or higher.
  
#### Getting Started
1. Clone the repository.
  ```shell
  git clone https://github.com/julian-tuazon/luxe.git
  ```
2. Change working directory to the location of the newly cloned repository.
  ```shell
  cd luxe
  ```
3. Install all dependencies listed in ```package.json``` with npm.
```shell 
npm install
```
4. Start the PostgreSQL server.
```shell 
sudo service postgresql start
```
5. Import the database dump file ```dump.sql``` to the PostgreSQL database.
```shell
npm run db:import
```
6. Start the webpack development server.
```shell
npm run dev
```
7. View the application by opening ```http://localhost:3000``` in your browser.
