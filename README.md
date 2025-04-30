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


Instructions to run VSCode in Docker Environment 

Install VSCode Extensions: Docker and Dev Containers 

Step 0: Run your docker container in a terminal 

Step 1: Open Dev Containers in VS Code

    Open the Command Palette:
        Press Cmd + Shift + P (Mac) or Ctrl + Shift + P (Windows/Linux).

    Search for and Select:
        "Dev Containers: Attach to Running Container"

    Pick Your Container:
        Select your running container from the list.

Step 2: Verify You’re Inside the Container

Once VS Code reopens inside the container:

    Open a terminal in VS Code (Ctrl + ~ or Cmd + ~ on Mac).
    Run:

    node -v

    npm list typescript

    If Node.js and TypeScript are installed inside the container, you should see their versions.

Step 3: Open Your Project Folder Inside the Container

If your project folder is not opened automatically:

    Click File > Open Folder in VS Code.
    Navigate to /workspace/ or another mounted directory where your code is stored inside the container.
    Open the correct folder.

On the bottom left you should see an indicator that you're inside a docker container now. 
Now navigate to the project's repo (/app)  

Using Git inside the Container 

Using Local Git with a Dockerized Project

You don’t necessarily have to set up Git inside the Docker container if you don't need to push changes directly from within it. The basic idea is:

    Edit files inside the container (using VS Code or the terminal).
    Exit the container and return to your local environment.
    Use your local Git (since your code is still on your local machine) to commit, push, and pull from repositories.

This method assumes your project files are mounted to a shared volume between your local machine and the Docker container, so any changes made inside the container are reflected on your local file system.



## Update 4/30/2025 -> For replication (changes made for API testing)
1. Fetch current changes

2. Start backend

3. Create `.env.local` in root folder of front-end

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Test front-end 