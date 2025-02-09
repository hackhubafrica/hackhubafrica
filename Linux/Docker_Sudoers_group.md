# To avoid permission issues when running Docker commands without sudo, you can add your user to the docker group. Here are the steps to do that:

Create the Docker group (if it doesn't already exist):

    sudo groupadd docker

Add your user to the Docker group:

    sudo usermod -aG docker $USER

Replace $USER with your actual username if you're adding another user, or you can leave it as is to add the current user.

Log out and log back in so that your group membership is re-evaluated.

Verify that your user is now part of the Docker group:


    groups $USER

This should list docker among the groups.

Test running Docker commands without sudo:

    docker images

  You should no longer see a permission denied error.

Explanation:

  groupadd docker: This command creates a new group named docker. If the group already exists, you'll get a message saying so, and you can ignore it.
    usermod -aG docker $USER: This command modifies the user to append (-a) them to the specified group (-G docker). $USER is an environment variable that holds the current user's username.
    Log out and log back in: This is necessary for the group membership changes to take effect. Alternatively, you can use newgrp docker to avoid logging out.

After these steps, you should be able to run Docker commands without needing to prepend sudo.
