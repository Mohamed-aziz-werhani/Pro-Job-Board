# Job Board


## Tech specification

The application has a basic client-server architecture where

* **Front-End**: Angular (16)
* **Back-End**: NestJS / TypeORM / MySQL
* **Version control and repo hosting**: Git & GitHub
* **Front-End Deployment**: Netlify
* **Back-End Deployment**: DigitalOcean

## Functional Requirements

App should have three screens

* **Main**: Displays a list of jobs, preferably paginated. Each job is clickable and redirects to the job screen.
* **Job**: Shows the job description along with a button to apply.
* **Apply**: Contains a form to apply for a job. Here, applicants must input their name and email and provide some text about their application.

After submitting the application, an email should be sent to the company using this simulated SMTP server: **Ethereal Email** [(https://ethereal.email/](https://ethereal.email/)).

## Back End Architecture

* API with three controllers:
  * **Company**: Operations include listing companies, adding a company, and removing a company.
  * **Job**: Functions to add a job, list jobs, and remove a job.
  * **Appliances**: Handles job applications.
* Communication between database and API: Utilize an ORM; options include TypeORM. Implement a repository layer for data fetching.
* Two database tables
  * **Appliances**: Job id; User Name; User Email; Appliance text.
  * **Job**: Job id; Job name; Job description; Company name (must be unique to prevent duplicate entries).
