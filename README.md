# Glitch Guard - Issue Tracking Web App

![Glitch Guard Logo](link_to_logo)

Glitch Guard is a modern issue tracking web application built with Next.js 13, TypeScript, Tailwind CSS, Prisma, NextAuth, Radix UI, and Zod. It aims to streamline issue management for projects of any scale, providing essential features such as issue creation, assignment, filtering, updating, and deletion. Additionally, Glitch Guard offers a comprehensive dashboard to visualize active issues, assigned tasks, and personalized issues.

## Features

- **Add Issues:** Easily add new issues to your project.
- **Assign Issue:** Assign issues to team members for resolution.
- **Filter Issues:** Filter issues based on various criteria for better organization.
- **Update and Delete Issue:** Edit or remove issues as needed.
- **Dashboard:** Get an overview of active issues, assigned tasks, and personalized issues at a glance.
- **Authentication:** Secure authentication system to manage user access.
- **Sorting and Pagination:** Efficiently sort and paginate through issues for better management.
- **Responsiveness:** Enjoy a seamless experience across devices with responsive design.

## Tech Stack

![Next.js 13](https://img.shields.io/badge/Next.js%2013-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix%20UI-646CFF?style=for-the-badge&logo=radix-ui&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-FF3E00?style=for-the-badge&logo=zod&logoColor=white)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your_username/GlitchGuard.git
    ```

2. Install dependencies:

    ```bash
    cd GlitchGuard
    npm install
    ```

3. Set up environment variables.

    Create a `.env` file in the project root and add the following environment variables:
    
        ```env
        DATABASE_URL=""
        NEXTAUTH_URL="http://localhost:3000"
        NEXTAUTH_SECRET=""
        GOOGLE_CLIENT_ID=""
        GOOGLE_CLIENT_SECRET=""
        ```
    
        Ensure to replace the empty strings with your actual values.

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view Glitch Guard.

