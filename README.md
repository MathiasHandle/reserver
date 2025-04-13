Site is not deployed yet.

To run the site locally, run `npm run dev` in the client directory.
To run the server locally, run `npm run dev` in the server directory.

You will need .env.development file in /server directory - hit me up for values.

Before first run, you will need to run `npm run db:migrate` in the server directory to create the database and seed it with dummy data.
If you want to re-set the database, delete /server/database.db file and run `npm run db:migrate` again.

I've used SQLite for the database.

All dummy users use asdfG!123 as a password. You can get list of users in migrations file under /server/migrations/\*.sql.

Profile page is in header (after you log in click on your email). There you can find all events you've joined and all events you've created.
You can also create new event from this page.

Project is not finished 100% yet, list of todos can be found in todo.txt file.
