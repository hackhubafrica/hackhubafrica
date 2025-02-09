Change directory to folder you want to push to github
    
    cd path/to/your/local/folder
Initialize a git repository in your local folder
    
    git init
Add the url of your repository using HTTPS or SSH
    
    git remote add origin https://github.com/hackhubafrica/LOW_LEVEL_LEARNING.git
Add the contents of you folder     
    
    git add .
Commit you changes    
    
    git commit -m "Initial commit"
Push your local files to your remote repository
    
    git push -u origin master


Since GitHub no longer supports password authentication for HTTPS, you’ll need to use one of the following authentication methods:

SSH Authentication: Use an SSH key to authenticate with GitHub instead of HTTPS.
Personal Access Token (PAT): Use a Personal Access Token in place of a password.
Since you've already configured your SSH key, switching to SSH for your Git remote is likely the easiest option. Here’s how to set it up:
# Step 1: Check for Existing SSH Keys
First, check if you already have an SSH key by listing any files in the default location (~/.ssh):

    ls -al ~/.ssh
Look for files named id_rsa or id_ed25519. If you have one of these, you may skip to Step 4.

# Step 2: Generate a New SSH Key
If you don't have an SSH key, generate one with the following command (replace your email address):

    ssh-keygen -t ed25519 -C "your_email@example.com"
If your system doesn’t support ed25519, you can use rsa:

    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
You'll be prompted to choose a file location and a passphrase. Press Enter to accept the default location, and then choose a secure passphrase (or press Enter to skip the passphrase).

# Step 3: Start the SSH Agent and Add Your Key
Start the SSH agent in the background:

    eval "$(ssh-agent -s)"
Then, add your new SSH key to the SSH agent:

    ssh-add ~/.ssh/id_ed25519
# Step 4: Add Your SSH Key to Your GitHub Account
Copy the SSH key to your clipboard:

    cat ~/.ssh/id_ed25519.pub
This will display your public key. Copy all of it (including ssh-ed25519 or ssh-rsa at the beginning).

Go to GitHub SSH settings.

Click New SSH Key.

Enter a title (e.g., "My Computer") and paste your SSH key into the "Key" field.

Click Add SSH Key.

# Step 5: Test the Connection
To confirm that everything is set up, test the connection:

    ssh -T git@github.com
If this is your first time connecting to GitHub via SSH, you'll be asked to confirm the connection. Type yes and press Enter. You should see a message like:

    Hi hackhubafrica! You've successfully authenticated, but GitHub does not provide shell access.
# Step 6: Update the Remote URL
If you haven’t already, update your Git remote to use the SSH URL:

    git remote set-url origin git@github.com:hackhubafrica/control_engineering.git
Now, you should be able to push changes to GitHub without needing a password:
    
    git push -u origin main
Let me know if you encounter any issues along the way!


# ERRORS YOU MAY ENCOUNTER
    
    To github.com:hackhubafrica/control_engineering.git
     ! [rejected]        main -> main (non-fast-forward)
    error: failed to push some refs to 'github.com:hackhubafrica/control_engineering.git'
    hint: Updates were rejected because the tip of your current branch is behind
    hint: its remote counterpart. If you want to integrate the remote changes,
    hint: use 'git pull' before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.
    
The error you're seeing happens when the remote branch (main on GitHub) has changes that aren't in your local branch, so Git blocks the push to prevent overwriting commits. Here’s how to resolve it:

Step 1: Pull the Remote Changes
To update your local branch with the changes from the remote repository, use:

    git pull origin main --rebase
Using --rebase will pull the changes from GitHub and reapply your local commits on top of them, keeping the commit history cleaner.

Step 2: Push Your Changes
Once the pull is successful, push your changes again:

    git push -u origin main

Alternative: Force Push (If Needed)
If you're sure you want to overwrite the remote branch (e.g., because you're certain the remote changes aren't needed), you can force push. Be cautious with this option, as it will overwrite any remote changes.
    
    git push -u origin main --force

