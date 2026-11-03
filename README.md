# NOVA — Event Management Website

A responsive event discovery and registration website built for the K Explore Web Designing assignment: **Design and Develop a Responsive Event Management Website**.

## Features

- Responsive layout for mobile, tablet and desktop screens.
- Hero section, featured event and event discovery cards.
- Search events by title, category, venue or description.
- Filter events by category.
- View detailed information for each event.
- Registration form with JavaScript validation for name, email and 10-digit phone number.
- Registration confirmation after successful submission.
- Local Storage-based registration data management.
- Dark/light theme toggle with saved preference.
- Event countdown information.
- Mobile navigation, modal interactions and subtle hover transitions.
- Keyboard support: `Esc` closes a modal; `Ctrl/Cmd + K` focuses event search.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Google Fonts and remotely hosted Unsplash images

## Project structure

```text
nova-event-management/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.

For a local development server, you can use the VS Code **Live Server** extension and open the provided local URL.

No build step, package installation or backend server is required.

## Deployment

### GitHub Pages

1. Create a GitHub repository and upload all project files.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site. Copy the live URL shown in the Pages section.

### Netlify

1. Sign in to Netlify.
2. Choose **Add new site → Import an existing project** and connect the GitHub repository, or drag and drop the project folder into Netlify's manual deploy area.
3. No build command is required. Set the publish directory to the repository root if prompted.
4. Copy the generated live website URL.

## Registration data note

This is a front-end demonstration project. Successful registrations are stored in the visitor's browser using `localStorage` under the key `novaRegistrations`. This means:

- The data is available only in the same browser and device where the registration was made.
- Clearing browser site data may remove saved registrations.
- There is no central database, email delivery or administrator dashboard.

Do not use real sensitive information on a demonstration deployment.

## Customising events

The sample event information is defined near the top of `script.js` in the `events` array. Update an event's title, category, date, venue, time, price, image URL and description there. The featured event section in `index.html` is currently linked to the `future-forward` event ID.

## Notes

- Event dates and sample event details are illustrative and should be reviewed before submission.
- Event imagery is loaded from Unsplash using remote image URLs, so an internet connection is required for those images and Google Fonts.
- The website uses client-side validation and browser storage; it does not process payments or issue tickets.

---

Created as an academic web-design project.
