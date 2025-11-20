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

5. **Create GitHub repository and push:**
   - Provide clickable link to create the repo: `https://github.com/new?name={project-name}&description={project-name}`
   - Wait for user confirmation that repo is created
   - Once confirmed, run: `git push -u origin main`

6. **Summary with clickable links:**
   - Local folder: `file://~/code/{project-name}/`
   - GitHub repo: `https://github.com/smhunt/{project-name}`
   - Confirm project is ready and connected

IMPORTANT:
- Always use ~/code/ as the parent directory
- GitHub username is always `smhunt`
- MUST switch into the new directory at the end
- Keep it simple - just create a blank project ready to start fresh
