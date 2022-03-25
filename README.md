React project with custom Webpack configuration.

For development:

1. Start the Hypha backend with the Nginx reverse proxy.
2. Run `npm start` in this project to start Webpack in watch mode. Webpack will build the React project to the folder Nginx will serve static files from.

  - Note the `hypha-backend/` project folder must be a sibling to the `hypha-ui/` project folder.
