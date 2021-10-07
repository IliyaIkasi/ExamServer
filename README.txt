I created an Exam Server using pure NodeJS and MongoDB for the Database.
It does the following:
    Accepts and validates users.
    Once validated a user can Create, Read, Update, Delete (CRUD) the database.
    A validated user can only Read and Answer without being making any of the above to the database.
The following were used:
    ExpressJS
    Nodemon for live server
    Joi for validation
    Mongoose for the database implementation.
    jsonWebToken and Bcrypt for encrypting the user validation key.
Things to take note of:
    `npm run dev` for initiating nodemon process.
