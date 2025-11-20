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

4. **Create GitHub repository automatically:**
   - Check if GITHUB_TOKEN environment variable is set
   - If set, use GitHub API to create the repository:
     ```bash
     curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       https://api.github.com/user/repos \
       -d '{"name":"{project-name}","private":false,"auto_init":false}'
     ```
   - If GITHUB_TOKEN is not set, provide clickable link: `https://github.com/new?name={project-name}&description={project-name}`
   - Explain to user they need to set GITHUB_TOKEN environment variable for automatic repo creation

5. **Set up GitHub remote and push:**
   - The GitHub username is: `smhunt`
   - Construct the GitHub URL: `https://github.com/smhunt/{project-name}.git`
   - Run: `git remote add origin https://github.com/smhunt/{project-name}.git`
   - Push to GitHub: `git push -u origin main`

6. **Summary with clickable links:**
   - Local folder: `file://~/code/{project-name}/`
   - GitHub repo: `https://github.com/smhunt/{project-name}`
   - Confirm project is ready and connected

**Setting up GITHUB_TOKEN:**
To enable automatic repo creation, create a GitHub Personal Access Token:
1. Go to: https://github.com/settings/tokens/new
2. Select scopes: `repo` (full control of private repositories)
3. Generate token and add to your environment:
   ```bash
   export GITHUB_TOKEN="ghp_your_token_here"
   ```
4. Add to your ~/.bashrc or ~/.zshrc to persist

IMPORTANT:
- Always use ~/code/ as the parent directory
- GitHub username is always `smhunt`
- MUST switch into the new directory at the end
- Keep it simple - just create a blank project ready to start fresh
