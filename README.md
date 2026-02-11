# Blog Application

A full-featured **Blog Application** built with **Next.js 15**, designed for a seamless reading experience and robust content management. This application features a public-facing blog interface, newsletter subscriptions, and a comprehensive **Admin Dashboard** for managing posts and subscribers.

## 🚀 Features

### Public Interface
-   **Dynamic Blog Feed**: Browse all published articles with ease.
-   **Rich Content**: Read detailed blog posts with support for rich text and images.
-   **Newsletter Subscription**: Users can subscribe to email updates.
-   **Responsive Design**: Optimized for all devices (Desktop, Tablet, Mobile).

### Admin Panel
-   **Secure Authentication**: Protected admin area using **NextAuth.js** (Credentials Provider).
-   **Dashboard**: Overview of blog stats and recent activities.
-   **Blog Management**:
    -   **Add Blogs**: Create new posts with title, description, category, author, and upload images.
    -   **List & Delete**: View all blogs in a table format and delete unwanted posts.
-   **Subscription Management**: View list of subscribers and manage email entries.

### Backend & Core
-   **API Routes**: Custom RESTful endpoints for blogs, emails, and authentication.
-   **Database**: **MongoDB** integration via **Mongoose** for scalable data storage.
-   **Email Notifications**: Automated emails using **Nodemailer**.
-   **Toast Notifications**: Real-time feedback using **React Toastify**.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
-   **Frontend**: React 19, Tailwind CSS
-   **Authentication**: NextAuth.js (v5 Beta)
-   **Database**: MongoDB, Mongoose
-   **Email Service**: Nodemailer
-   **UI Components**: Lucide React (Icons)
-   **Utilities**: Axios, clsx, tailwind-merge

## 📂 Project Structure

```bash
├── app/
│   ├── admin/              # Admin routes
│   │   ├── (dashboard)/    # Protected dashboard pages (layout, page)
│   │   │   ├── addProduct/ # Add new blog post page
│   │   │   ├── blogList/   # List of all blogs
│   │   │   └── subscriptions/ # Subscriber governance
│   │   └── login/          # Admin login page
│   ├── api/                # Backend API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── blog/           # Blog CRUD operations
│   │   └── email/          # Email subscription logic
│   ├── blogs/              # Public blog pages
│   │   └── [id]/           # Dynamic blog post view
│   ├── Components/         # Reusable UI components (Header, Footer, etc.)
│   └── page.js             # Landing page
├── lib/
│   ├── config/             # Database connection (db.js)
│   ├── models/             # Mongoose Models (Blog, Email, Admin)
│   ├── auth.js             # NextAuth configuration & handlers
│   └── email.js            # Nodemailer utility
├── public/                 # Static assets (images, icons)
└── ...
```

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

-   **Node.js** (v18+ recommended)
-   **MongoDB** Connection URI

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/JoyelV/blog-application.git
    cd blog-application
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog-app
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key_here
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Access the application**:
    -   **Public Site**: [http://localhost:3000](http://localhost:3000)
    -   **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📜 Scripts

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
