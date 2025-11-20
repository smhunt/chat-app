---
description: Set up a new project from the current codebase with a fresh git repository
---

Help me set up a new project based on the current codebase. Follow these steps:

1. **Ask the user for:**
   - New project name/directory (e.g., "my-new-app")
   - Parent directory where to create it (default: /home/user/)
   - GitHub repository URL (optional, e.g., "git@github.com:username/repo.git")
   - Whether to keep the current codebase files or start completely blank

2. **Create the new project:**
   - Create the new directory at the specified location
   - If keeping files: Copy all files from current directory EXCEPT:
     - .git directory
     - node_modules
     - dist/build directories
     - .env files (warn user to recreate these)
   - If starting blank: Create just a basic structure with .gitignore

3. **Initialize git:**
   - Run `git init` in the new directory
   - If GitHub URL provided: Set it as the remote origin
   - Create an initial commit

4. **Create/update essential files:**
   - Ensure .gitignore exists
   - Create a basic README.md with the project name
   - If this is a Node.js project, remind user to run `npm install`

5. **Summary:**
   - Show the path to the new project
   - Show the git status
   - Provide next steps (install dependencies, set up .env, etc.)

IMPORTANT: Don't switch directories - stay in the current project. Just create the new project in the specified location.
