# Next.js Blog Application

A full-featured blog application built with Next.js 16 (App Router), enabling users to read blogs and subscribe to newsletters, while administrators can manage content via a protected dashboard.

## Features

### Public Interface
-   **Blog Listing**: Browse recent blog posts with pagination.
-   **Blog Details**: Read full articles with rich content.
-   **Email Subscription**: Users can subscribe to the newsletter.
-   **Responsive Design**: Optimized for mobile, tablet, and desktop.

### Admin Dashboard (Protected)
-   **Secure Authentication**: Admin login protected by NextAuth.js.
-   **Dashboard Overview**: View key metrics.
-   **Add Blog**: Create new blog posts with rich text and image upload (Cloudinary).
-   **Blog List**: Manage existing blogs (Edit/Delete).
-   **Subscription Management**: View and manage email subscribers.
-   **Email Notifications**:
    -   Subscribers receive emails when new blogs are added.
    -   Subscribers receive emails when blogs are updated.
    -   Emails include direct "Read More" links to the blog posts.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (v5 Beta)
-   **Image Storage**: [Cloudinary](https://cloudinary.com/)
-   **Email Service**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP)
-   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database Connection
MONGO_URI=your_mongodb_connection_string

# Admin Configuration (Default credentials if no user exists)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_nextauth_secret_key

# Cloudinary Configuration (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone params
    cd blog-application
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    -   Copy the example above into `.env.local`.
    -   Fill in your specific credentials.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Access the application:**
    -   Public: [http://localhost:3000](http://localhost:3000)
    -   Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Admin Access

-   **Default User**: `admin@example.com`
-   **Default Password**: `password` (if reset script used)
-   *Note: Ensure to change credentials or use the reset script for security.*

## Project Structure

```
.
├── app/                  # Next.js App Router
│   ├── admin/            # Admin routes (Dashboard, Login)
│   ├── api/              # API Routes (Blog, Email, Auth)
│   ├── blogs/            # Public Blog Details
│   ├── components/       # Reusable Components (Admin & UI)
│   ├── layout.js         # Root Layout
│   └── page.js           # Home Page
├── Assets/               # Static Assets (Images, Icons)
├── lib/                  # Library/Utility functions
│   ├── config/           # DB & Cloudinary Config
│   ├── models/           # Mongoose Models
│   ├── auth.js           # NextAuth Logic
│   └── email.js          # Nodemailer Logic
├── scripts/              # Helper scripts (Admin setup, testing)
└── public/               # Public static files
```
