🚀 Next.js TypeScript Project with Docker

📦 Setup Instructions

1️⃣ Clone the Repository

git clone <your-github-repo-url>
cd 380_front-end

2️⃣ Run the Project with Docker

docker-compose up --build

This will:

Build the Docker container

Install dependencies inside the container

Start the Next.js development server on http://localhost:3000

3️⃣ Making Changes (Hot Reloading)

Edit files in pages/ or components/

Changes should reflect automatically 🎉

4️⃣ Stopping the Server

To stop the container:

docker-compose down

🛠 Useful Commands

Command

Description

docker-compose up

Start the server 🚀

docker-compose up --build

Rebuild and start server 🔄

docker-compose down

Stop the server ❌

✅ Requirements

Docker installed (https://www.docker.com/)

Node.js (for local dev without Docker, optional)

📢 Notes

The container ensures that all dependencies are the same across all teammates.

The Next.js app will be accessible at http://localhost:3000

If you run into issues, try docker-compose down && docker-compose up --build.