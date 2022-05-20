# Hypha UI
The Hypha UI is a React app that wraps Grafana to make Hypha's UI simpler and more intuitive. It is automatically served by the [Hypha Backend](https://github.com/Team-Hypha/hypha-backend). Users do not need to install or host the UI separately, but it is provided here for development purposes.

## For development:

React project with custom Webpack configuration.

1. Start the Hypha backend with the Nginx reverse proxy.
2. Run `npm start` in this project to start Webpack in watch mode. Webpack will build the React project to the folder Nginx will serve static files from.

  - Note the `hypha-backend/` project folder must be a sibling to the `hypha-ui/` project folder.
