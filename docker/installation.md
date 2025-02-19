---
icon: comet
---

# Installation

## Docker installation

The first thing you need to do is to set up a system with the requirements needed to run Docker and Docker compose. Then install Docker and Docker compose if you don’t have them already.

Note

You need root user privileges to run all the commands described below.

### Requirements

#### Container memory

We recommend configuring the Docker host with at least 6 GB of memory. Depending on the deployment and usage, Wazuh indexer memory consumption varies. Therefore, allocate the recommended memory for a complete stack deployment to work properly.

#### Increase max\_map\_count on your host (Linux)

Wazuh indexer creates many memory-mapped areas. So you need to set the kernel to give a process at least 262,144 memory-mapped areas.

1.  Increase `max_map_count` on your Docker host:

    ```
    sysctl -w vm.max_map_count=262144
    ```
2.  Update the `vm.max_map_count` setting in `/etc/sysctl.conf` to set this value permanently. To verify after rebooting, run “`sysctl vm.max_map_count`”.

    Warning

    &#x20;

    If you don’t set the `max_map_count` on your host, the Wazuh indexer will NOT work properly.

### Docker engine

For Linux/Unix machines, Docker requires an amd64 architecture system running kernel version 3.10 or later.

1.  Open a terminal and use `uname -r` to display and check your kernel version:

    ```
    uname -r
    ```

    Output

    ```
    3.10.0-229.el7.x86_64
    ```
2.  Run the Docker installation script:

    On Ubuntu/Debian machinesOn CentOS machinesOn Amazon Linux 2 machines

    ```
    curl -sSL https://get.docker.com/ | sh
    ```
3.  Start the Docker service:

    > SystemdSysV init
    >
    > ```
    > systemctl start docker
    > ```

Note

&#x20;

If you would like to use Docker as a non-root user, you should add your user to the `docker` group with something like the following command: `usermod -aG docker your-user`. Log out and log back in for this to take effect.

### Docker compose

The Wazuh Docker deployment requires Docker Compose 1.29 or later. Follow these steps to install it:

1.  Download the Docker Compose binary:

    ```
    curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```
2.  Grant execution permissions:

    ```
    chmod +x /usr/local/bin/docker-compose
    ```
3.  Test the installation to ensure everything is fine:

    ```
    docker-compose --version
    ```

    Output

    ```
    Docker Compose version v2.12.2
    ```

    Note

    &#x20;

    If the command `docker-compose` fails after installation. Create a symbolic link to `/usr/bin` or any other directory in your path: `ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose`
