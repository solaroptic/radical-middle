# The Radical Middle Blog

## React/Node/MySQL/Azure Cloud

This project was intended to practice MySQL fluency by creating a simple blog. I upgraded the MySQL code I saw in an old tutorial and I decided to make it function in the real-world by learning to work with the Microsoft Azure cloud.

Additionally, I learned:

- some alternate page routing (Router-6) methods

- MySQL2 - an old tutorial used the older MySQL import, but I wanted to use the more current MySQ2 which has different syntax; some docs digging got the results I was after

- React-Quill - a simple, but functional wordprocessor I easily dropped in

- I experimented with single-page-CSS for less files; labeled and organized properly, it was surprisingly easy to target/find all classes; note it's not a huge project

![The Radical Middle Homepage](https://res.cloudinary.com/duysbh0j0/image/upload/v1716401635/nbygwx2yw6hf6io9fqy7.jpg)

## A Positive Blog

I actually enjoy writing,and thought of something that would bring people together.

It features:

- Multi-users allowed for more new contributions

- Multi-categories for various readers

- Hooked into MySQL locally for easy db manipulation

- Legitimate authorization and HTML validation through sanitize-html for longevity

- Images for posts uploadable through Cloudinary

- Stable and high-end performance through the Azure Cloud MySQL Server

## Content License

This blog content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## To run on your own machine:

Prerequisites:

Node.js and npm (or yarn): Ensure you have Node.js and either npm (Node Package Manager) or yarn installed on your system. You can download them from the official websites:
Node.js: https://nodejs.org/en
npm (included with Node.js installation)
yarn: https://yarnpkg.com/
Git version control (optional): While not strictly necessary, having Git installed allows you to clone the project from GitHub and manage your local copy. You can download it from: https://git-scm.com/downloads
Steps:

Clone the Repository:

Open a terminal window.

Navigate to the directory where you want to clone the project.

Use the git clone command followed by the URL of your GitHub repository. For example:

Bash
git clone https://github.com/your-username/your-repo-name.git
Use code with caution.
content_copy
Replace your-username with your GitHub username and your-repo-name with the actual name of your repository.

Install Dependencies:

Navigate to the cloned project directory using cd your-repo-name.

Install the project's dependencies using either npm install or yarn install:

Bash

`npm install # or yarn install`

This command will download all the necessary packages listed in your project's package.json file.

Start the Development Server (Optional):

If your project has a development server script defined in package.json (usually named start), you can run it to launch the application locally:

Bash

`npm start  # or yarn start`

This will typically start a development server that allows you to see the application running in your browser (usually at http://localhost:3000 or a similar address).

Additional Notes:

Environment Variables: This project uses environment variables, you might need to set your own before running it.

Fork the Repository: Instead of cloning, you can fork the repository on GitHub to create your own copy. This allows you to make changes and contribute back to the original project.
Pull Updates: Periodically pull updates from the original repository to keep your local copy in sync with the latest changes.
