# Final Bootcamp Project - DeskForge

The assignment was to create a full-stack React app that solves a clear problem.

I decided to create an app that helps hobbyists, specifically warhammer 40k, to organise their workspaces by uploading a photo of their desk space and getting AI-generated suggestions.

## The problem

To create a web app that allows tearget users (warhammer 40k hobbyists) to upload a phot of their desk, and generate suggestions for improvement. Users can must also be able keep track of previous desks through a suggestions history.

Started by sketching out wireframes to udnerstand general structure and functionality.

Built the project feature-by-feature starting with setting up the backend for a particular feature, then building the frontend, dealt with bugs for that specific feature then repeated for the nex feature until the app was built.

Handling the multiple states needed for the upload and generate states for a desk was a challenge that was solved with the help of creating separate components and using global state management.

Routing is handled by react router.

The AI integration was an integral part of the project and that was solved using OpenAI's api as it is very well-documentated and straight-forward to integrate.

The next steps I would like to implement in my own time is to create a new feature where the location of changes is indicated on the image, to migrate it to React Native for mobile, and use Tamagui for the design so it is cohesive across all platforms.


## The code

The code is separated into a backend and frontend folder.

The backend folder has the main server file with the ai integration, authorisation, and upload routes in sperate files. Middleware is in a separate folder as is the desk and user monogdb models.

The frontend folder has the main file while components and pages are in 2 seperate folders, as is the latestdesk global state. Pages indicate the sperate pages you can navigate to while components are sections within said pages.

## View it live

Netfliy link: https://desk-forge.netlify.app/
