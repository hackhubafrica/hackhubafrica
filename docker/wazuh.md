---
icon: shield-cross
---

# Wazuh

## Wazuh Docker deployment

### Usage

You can deploy Wazuh as a single-node or multi-node stack.

* **Single-node deployment**: Deploys one Wazuh manager, indexer, and dashboard node.
* **Multi-node deployment**: Deploys two Wazuh manager nodes (one master and one worker), three Wazuh indexer nodes, and a Wazuh dashboard node.

Both deployments use persistence and allow configuring certificates to secure communications between nodes. The multi-node stack is the only deployment that contains high availability.

#### Single-node Deployment

1.  Clone the Wazuh repository to your system:

    ```
    git clone https://github.com/wazuh/wazuh-docker.git -b v4.10.1
    ```

    Then enter into the `single-node` directory to execute all the commands described below within this directory.
2. Provide a group of certificates for each node in the stack to secure communication between the nodes. You have two alternatives to provide these certificates:
   *   Generate self-signed certificates for each cluster node.

       We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

       If your system uses a proxy, add the following to the `generate-indexer-certs.yml` file. If not, skip this particular step:

       ```
       environment:
         - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
       ```

       A completed example looks like:

       ```
       # Wazuh App Copyright (C) 2017 Wazuh Inc. (License GPLv2)
       version: '3'

       services:
         generator:
           image: wazuh/wazuh-certs-generator:0.0.2
           hostname: wazuh-certs-generator
           volumes:
             - ./config/wazuh_indexer_ssl_certs/:/certificates/
             - ./config/certs.yml:/config/certs.yml
           environment:
             - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
       ```

       Execute the following command to get the desired certificates:

       > ```
       > docker-compose -f generate-indexer-certs.yml run --rm generator
       > ```

       This saves the certificates into the `config/wazuh_indexer_ssl_certs` directory.
   *   Provide your own certificates for each node.

       In case you have your own certificates, provision them as follows in the `config/wazuh_indexer_ssl_certs` directory:

       **Wazuh indexer**:

       ```
       config/wazuh_indexer_ssl_certs/root-ca.pem
       config/wazuh_indexer_ssl_certs/wazuh.indexer-key.pem
       config/wazuh_indexer_ssl_certs/wazuh.indexer.pem
       config/wazuh_indexer_ssl_certs/admin.pem
       config/wazuh_indexer_ssl_certs/admin-key.pem
       ```

       **Wazuh manager**:

       ```
       config/wazuh_indexer_ssl_certs/root-ca-manager.pem
       config/wazuh_indexer_ssl_certs/wazuh.manager.pem
       config/wazuh_indexer_ssl_certs/wazuh.manager-key.pem
       ```

       **Wazuh dashboard**:

       ```
       config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
       config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
       config/wazuh_indexer_ssl_certs/root-ca.pem
       ```
3.  Start the Wazuh single-node deployment using docker-compose:

    *   **Foreground**:

        ```
        docker-compose up
        ```
    *   **Background**:

        ```
        docker-compose up -d
        ```

    The default username and password for the Wazuh dashboard are `admin` and `SecretPassword`. For [additional security](https://documentation.wazuh.com/current/deployment-options/docker/wazuh-container.html#change-pwd-existing-usr), you can change the default password for the Wazuh indexer _admin_ user.

Note

To know when the Wazuh indexer is up, the Wazuh dashboard container uses `curl` to run multiple queries to the Wazuh indexer API. You can expect to see several `Failed to connect to Wazuh indexer port 9200` log messages or “ _Wazuh dashboard server is not ready yet_ ” until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the `docker-compose.yml` file.

#### Multi-node deployment

1.  Clone the Wazuh repository to your system:

    ```
    git clone https://github.com/wazuh/wazuh-docker.git -b v4.10.1
    ```

    Then enter into the `multi-node` directory to execute all the commands described below within this directory.
2. Provide a group of certificates for each node in the stack to secure communications between the nodes. You have two alternatives to provide these certificates:
   *   Generate self-signed certificates for each cluster node.

       We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

       If your system uses a proxy, add the following to the `generate-indexer-certs.yml` file. If not, skip this particular step:

       ```
       environment:
         - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
       ```

       A completed example looks like:

       ```
       # Wazuh App Copyright (C) 2017 Wazuh Inc. (License GPLv2)
       version: '3'

       services:
         generator:
           image: wazuh/wazuh-certs-generator:0.0.2
           hostname: wazuh-certs-generator
           volumes:
             - ./config/wazuh_indexer_ssl_certs/:/certificates/
             - ./config/certs.yml:/config/certs.yml
           environment:
             - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
       ```

       Execute the following command to get the desired certificates:

       ```
       docker-compose -f generate-indexer-certs.yml run --rm generator
       ```

       This saves the certificates into the `config/wazuh_indexer_ssl_certs` directory.
   *   Provide your own certificates for each node.

       In case you have your own certificates, provision them as follows:

       **Wazuh indexer**:

       ```
       config/wazuh_indexer_ssl_certs/root-ca.pem
       config/wazuh_indexer_ssl_certs/wazuh1.indexer-key.pem
       config/wazuh_indexer_ssl_certs/wazuh1.indexer.pem
       config/wazuh_indexer_ssl_certs/wazuh2.indexer-key.pem
       config/wazuh_indexer_ssl_certs/wazuh2.indexer.pem
       config/wazuh_indexer_ssl_certs/wazuh3.indexer-key.pem
       config/wazuh_indexer_ssl_certs/wazuh3.indexer.pem
       config/wazuh_indexer_ssl_certs/admin.pem
       config/wazuh_indexer_ssl_certs/admin-key.pem
       ```

       **Wazuh manager**:

       ```
       config/wazuh_indexer_ssl_certs/root-ca-manager.pem
       config/wazuh_indexer_ssl_certs/wazuh.master.pem
       config/wazuh_indexer_ssl_certs/wazuh.master-key.pem
       config/wazuh_indexer_ssl_certs/wazuh.worker.pem
       config/wazuh_indexer_ssl_certs/wazuh.worker-key.pem
       ```

       **Wazuh dashboard**:

       ```
       config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
       config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
       config/wazuh_indexer_ssl_certs/root-ca.pem
       ```
3.  Start the Wazuh multi-node deployment using `docker-compose`:

    *   **Foreground**:

        ```
        docker-compose up
        ```
    *   **Background**:

        ```
        docker-compose up -d
        ```

    The default username and password for the Wazuh dashboard are `admin` and `SecretPassword`. For additional security, you can change the default password for the Wazuh indexer _admin_ user.

Note

To know when the Wazuh indexer is up, the Wazuh dashboard container uses `curl` to run multiple queries to the Wazuh indexer API. You can expect to see several `Failed to connect to Wazuh indexer port 9200` log messages or “Wazuh dashboard server is not ready yet” until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the `docker-compose.yml` file.

#### Build docker images locally

You can modify and build the Wazuh manager, indexer, and dashboard images locally.

1.  Clone the Wazuh repository to your system:

    `git clone https://github.com/wazuh/wazuh-docker.git -b v4.10.1`
2.  For versions up to 4.3.4, enter into the `build-docker-images` directory and build the Wazuh manager, indexer, and dashboard images:

    ```
    docker-compose build
    ```

    For version 4.3.5 and above, run the image creation script:

    ```
    build-docker-images/build-images.sh
    ```

#### Change the password of Wazuh users

To improve security, you can change the default password of the Wazuh users. There are two types of Wazuh users:

* Wazuh indexer users
* Wazuh API users

> To change the password of these Wazuh users, perform the following steps. You must run the commands from your `single-node/` or `multi-node/` directory, depending on your Wazuh on Docker deployment.

**Wazuh indexer users**

> To change the password of the default `admin` and `kibanaserver` users, do the following. You can only change one at a time.

Warning

&#x20;If you have custom users, add them to the `internal_users.yml` file. Otherwise, executing this procedure deletes them.

**Closing your Wazuh dashboard session**

Before starting the password change process, we recommend to log out of your Wazuh dashboard session.

If you don't log out, persistent session cookies might cause errors when accessing Wazuh after changing user passwords.

**Setting a new hash**

1.  Stop the deployment stack if it’s running:

    ```
    docker-compose down
    ```
2.  Run this command to generate the hash of your new password. Once the container launches, input the new password and press **Enter**.

    ```
    docker run --rm -ti wazuh/wazuh-indexer:4.10.1 bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh
    ```
3. Copy the generated hash.
4. Open the `config/wazuh_indexer/internal_users.yml` file. Locate the block for the user you are changing password for.
5. Replace the hash.
   *   `admin` user

       ```
       ...
       admin:
         hash: "$2y$12$K/SpwjtB.wOHJ/Nc6GVRDuc1h0rM1DfvziFRNPtk27P.c4yDr9njO"
         reserved: true
         backend_roles:
         - "admin"
         description: "Demo admin user"

       ...
       ```
   *   `kibanaserver` user

       ```
       ...
       kibanaserver:
         hash: "$2a$12$4AcgAt3xwOWadA5s5blL6ev39OXDNhmOesEoo33eZtrq2N0YrU3H."
         reserved: true
         description: "Demo kibanaserver user"

       ...
       ```

**Setting the new password**

Warning

&#x20;Don't use the `$` or `&` characters in your new password. These characters can cause errors during deployment.

1. Open the `docker-compose.yml` file. Change all occurrences of the old password with the new one. For example, for a single-node deployment:
   *   `admin` user

       ```
       ...
       services:
         wazuh.manager:
           ...
           environment:
             - INDEXER_URL=https://wazuh.indexer:9200
             - INDEXER_USERNAME=admin
             - INDEXER_PASSWORD=SecretPassword
             - FILEBEAT_SSL_VERIFICATION_MODE=full
             - SSL_CERTIFICATE_AUTHORITIES=/etc/ssl/root-ca.pem
             - SSL_CERTIFICATE=/etc/ssl/filebeat.pem
             - SSL_KEY=/etc/ssl/filebeat.key
             - API_USERNAME=wazuh-wui
             - API_PASSWORD=MyS3cr37P450r.*-
         ...
         wazuh.indexer:
           ...
           environment:
             - "OPENSEARCH_JAVA_OPTS=-Xms1024m -Xmx1024m"
         ...
         wazuh.dashboard:
           ...
           environment:
             - INDEXER_USERNAME=admin
             - INDEXER_PASSWORD=SecretPassword
             - WAZUH_API_URL=https://wazuh.manager
             - DASHBOARD_USERNAME=kibanaserver
             - DASHBOARD_PASSWORD=kibanaserver
             - API_USERNAME=wazuh-wui
             - API_PASSWORD=MyS3cr37P450r.*-
         ...
       ```
   *   `kibanaserver` user

       ```
       ...
       services:
         wazuh.dashboard:
           ...
           environment:
             - INDEXER_USERNAME=admin
             - INDEXER_PASSWORD=SecretPassword
             - WAZUH_API_URL=https://wazuh.manager
             - DASHBOARD_USERNAME=kibanaserver
             - DASHBOARD_PASSWORD=kibanaserver
             - API_USERNAME=wazuh-wui
             - API_PASSWORD=MyS3cr37P450r.*-
         ...
       ```

**Applying the changes**

1.  Start the deployment stack.

    ```
    # docker-compose up -d
    ```
2. Run `docker ps` and note the name of the first Wazuh indexer container. For example, `single-node-wazuh.indexer-1`, or `multi-node-wazuh1.indexer-1`.
3.  Run `docker exec -it <WAZUH_INDEXER_CONTAINER_NAME> bash` to enter the container. For example:

    ```
    docker exec -it single-node-wazuh.indexer-1 bash
    ```
4.  Set the following variables:

    ```
    export INSTALLATION_DIR=/usr/share/wazuh-indexer
    CACERT=$INSTALLATION_DIR/certs/root-ca.pem
    KEY=$INSTALLATION_DIR/certs/admin-key.pem
    CERT=$INSTALLATION_DIR/certs/admin.pem
    export JAVA_HOME=/usr/share/wazuh-indexer/jdk
    ```
5.  Wait for the Wazuh indexer to initialize properly. The waiting time can vary from two to five minutes. It depends on the size of the cluster, the assigned resources, and the speed of the network. Then, run the `securityadmin.sh` script to apply all changes.

    Single-node clusterMulti-node cluster

    ```
    bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl
    ```
6. Exit the Wazuh indexer container and login with the new credentials on the Wazuh dashboard.

**Wazuh API**&#x20;

The `wazuh-wui` user is the user to connect with the Wazuh API by default. Follow these steps to change the password.

Note

&#x20;The password for Wazuh API users must be between 8 and 64 characters long. It must contain at least one uppercase and one lowercase letter, a number, and a symbol.

1.  Open the file `config/wazuh_dashboard/wazuh.yml` and modify the value of `password` parameter.

    ```
    ...
    hosts:
      - 1513629884013:
          url: "https://wazuh.manager"
          port: 55000
          username: wazuh-wui
          password: "MyS3cr37P450r.*-"
          run_as: false
    ...
    ```
2.  Open the `docker-compose.yml` file. Change all occurrences of the old password with the new one.

    ```
    ...
    services:
      wazuh.manager:
        ...
        environment:
          - INDEXER_URL=https://wazuh.indexer:9200
          - INDEXER_USERNAME=admin
          - INDEXER_PASSWORD=SecretPassword
          - FILEBEAT_SSL_VERIFICATION_MODE=full
          - SSL_CERTIFICATE_AUTHORITIES=/etc/ssl/root-ca.pem
          - SSL_CERTIFICATE=/etc/ssl/filebeat.pem
          - SSL_KEY=/etc/ssl/filebeat.key
          - API_USERNAME=wazuh-wui
          - API_PASSWORD=MyS3cr37P450r.*-
      ...
      wazuh.dashboard:
        ...
        environment:
          - INDEXER_USERNAME=admin
          - INDEXER_PASSWORD=SecretPassword
          - WAZUH_API_URL=https://wazuh.manager
          - DASHBOARD_USERNAME=kibanaserver
          - DASHBOARD_PASSWORD=kibanaserver
          - API_USERNAME=wazuh-wui
          - API_PASSWORD=MyS3cr37P450r.*-
      ...
    ```
3.  Recreate the Wazuh containers:

    ```
    # docker-compose down
    # docker-compose up -d
    ```

### Exposed ports

By default, the stack exposes the following ports:

| **1514**  | Wazuh TCP             |
| --------- | --------------------- |
| **1515**  | Wazuh TCP             |
| **514**   | Wazuh UDP             |
| **55000** | Wazuh API             |
| **9200**  | Wazuh indexer HTTPS   |
| **443**   | Wazuh dashboard HTTPS |

Note

&#x20;Docker doesn’t reload the configuration dynamically. You need to restart the stack after changing the configuration of a component.
