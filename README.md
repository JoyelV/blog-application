# Blog Application

A full-featured Blog Application built with Next.js, allowing users to read blogs, subscribe to newsletters, and providing admins with a dashboard to manage content and subscriptions.

## 🚀 Features

- **Public Interface**:
  - View all published blogs.
  - Read detailed blog posts.
  - Subscribe to the newsletter with email.
- **Admin Panel**:
  - **Dashboard**: specialized admin area.
  - **Manage Blogs**: Add new blogs with title, description, category, author, and images. Delete existing blogs.
  - **Manage Subscriptions**: View and delete email subscriptions.
- **Backend**:
  - Custom API endpoints for managing blogs and emails.
  - MongoDB integration using Mongoose.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Frontend**: React, Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **Notifications**: React Toastify
- **HTTP Client**: Axios

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `admin/`: Admin panel routes (addProduct, blogList, subscriptions).
  - `blogs/`: Public blog viewing routes.
  - `api/`: Backend API routes (blog, email).
- `components/`: Reusable UI components.
- `lib/`: Utility libraries.
  - `config/`: Database connection setup.
  - `models/`: Mongoose models (Blog, Email).
- `public/`: Static assets.

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js installed.
- A MongoDB connection string (URI).

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
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog-app
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the application**:
    - Public View: [http://localhost:3000](http://localhost:3000)
    - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin) (or navigation link)

## 📜 Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
