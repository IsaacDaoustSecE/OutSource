# OutSource

A freelancing website where users can hire for jobs

## Team

CPAN 212 ONH
Deven Lall, Isaac Daoust

## Possible Data Models

### User

-   id
-   name
-   email
-   is_admin

### Orders

-   user_id
-   job_id

### Freelancer

-   user_id fk
-   skills
-   field
-   jobs

### Job

-   freelancer_id
-   title
-   price
-   expected_duration
-   created_at

### Message

-   from_user_id
-   to_user_id
-   created_at

## Core Features

-   Users can hire freelancers for jobs (predefined by the freelancer)
-   Users can message each other to coordinate and ask questions
-   Admin users can manage the list of orders, users, and jobs
-   Notifications (through messages) will be sent throughout the job timeline. Freelancers can activate milestones when complete to notify the user of their progress
