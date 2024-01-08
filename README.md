#Sustainr

# sustainr

track the co2 usage of your webapp

## Getting Started

### run the development server:


```bash
npm i
```

```bash
npm run dev
```
Remember to run database migrations whenever you make changes to your `schema.prisma` file to keep your database structure up-to-date.

## Initializing the Database with Prisma

To set up your database using Prisma, follow these steps:

1. **Set up your database**: Ensure you have a database running and accessible. Update the `DATABASE_URL` in your `.env` file with the connection string to your database.

2. **Install Prisma CLI**: If you haven't already, install the Prisma CLI globally using npm:

   ```
   npm install -g prisma
   ```

3. **Integrate Prisma with your project**: Run the following command in your project root to create a new Prisma schema file if you don't have one:

   ```
   prisma init
   ```

4. **Define your schema**: Edit the `schema.prisma` file in your project to define your database schema.

5. **Migrate your database**: Once your schema is defined, apply the migrations to your database:

   ```
   prisma migrate dev
   ```

   This command creates the tables in your database according to the schema.

6. **Generate Prisma client**: To interact with your database, generate the Prisma client:

   ```
   prisma generate
   ```

7. **Start using Prisma**: You can now use the generated Prisma client in your application to interact with your database.



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Configuration

### config 
To properly configure the 'Sustainr' application, you need to set up the following environment variables in a `.env` file:

- `NEXTAUTH_SECRET`: A secret key used by NextAuth for authentication. Make sure this is a secure, unique string.
- `NEXTAUTH_URL`: The base URL of your Next.js application, typically set to `http://localhost:3000` during development.
- `EMAIL_SERVER`: Configuration for the email server used for sending out authentication emails. Specify your email server details here.
- `EMAIL_FROM`: The email address used as the sender for authentication emails.
- `DATABASE_URL`: The URL of your database where the application data is stored. This should include the username, password, and database details.

Ensure you replace these placeholders with actual values that are relevant to your project's setup.


## Integrating Sustainr Tracking Script

To integrate Sustainr tracking functionality into your web application, include the following script in your source code:

```html
<script>
    window.sustainrDL = window.sustainrDL || [];
    function sustainr(){
        window.sustainrDL.push(arguments);
    }
    sustainr('trackEvent', 'pageView', { 'clientId': '123e4567-e89b-12d3-a456-426655440000' });
</script>

<script src="https://localhost:3000/track/sustainr.js"></script>
```

This script initializes a tracking function, sustainr, and includes a tracking event for page views. Replace '123e4567-e89b-12d3-a456-426655440000' with your specific client ID. The second script tag loads the Sustainr tracking script from your server.

Paste this code into the HTML of the pages where you want to track user interactions. It's typically added just before the closing </body> tag to ensure it loads after the page content.
