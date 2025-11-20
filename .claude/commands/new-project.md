---
description: Set up a new project from the current codebase with a fresh git repository (project)
---

Help me set up a new blank project. Follow these steps:

1. **Ask the user for the project name** (e.g., "my-new-app")
   - This will be used for the folder name, git repo name, and all identifiers

2. **Create the project structure:**
   - Create directory at `~/code/{project-name}/`
   - Create a basic `.gitignore` file with common patterns:
     ```
     node_modules/
     dist/
     build/
     .env
     .env.local
     *.log
     .DS_Store
     ```
   - Create a `README.md` with the project name as title

3. **Initialize git:**
   - Run `git init` in the new directory
   - Create initial commit with message: "chore: initial project setup"

4. **Provide GitHub setup instructions:**
   - Show the user how to create a GitHub repo with the same name
   - Provide the exact command to connect: `git remote add origin <url>`
   - Provide the exact command to push: `git push -u origin main`

5. **Summary:**
   - Confirm project created at `~/code/{project-name}/`
   - Show git status
   - List next steps

IMPORTANT:
- Don't switch directories - stay in the current project
- Always use ~/code/ as the parent directory
- Keep it simple - just create a blank project ready to start fresh
