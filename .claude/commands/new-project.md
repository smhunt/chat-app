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
   - Rename branch to `main`
   - Create initial commit with message: "chore: initial project setup"

4. **Set up GitHub remote:**
   - The GitHub username is: `smhunt`
   - Construct the GitHub URL: `https://github.com/smhunt/{project-name}.git`
   - Run: `git remote add origin https://github.com/smhunt/{project-name}.git`
   - Inform user they need to create the GitHub repo at: `https://github.com/new` with the name `{project-name}`
   - After user confirms repo is created, run: `git push -u origin main`

5. **Switch to the new project:**
   - IMPORTANT: After everything is set up, switch the working directory to `~/code/{project-name}/`
   - Confirm the switch by showing the current directory

6. **Summary:**
   - Confirm project created at `~/code/{project-name}/`
   - Show git status
   - Confirm we're now working in the new project directory

IMPORTANT:
- Always use ~/code/ as the parent directory
- GitHub username is always `smhunt`
- MUST switch into the new directory at the end
- Keep it simple - just create a blank project ready to start fresh
