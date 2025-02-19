---
icon: layer-group
---

# ELK

Prerequisites

```bash
docker.elastic.co/elasticsearch/elasticsearch   8.5.0     65719a2cfaea   2 years ago     1.29GB
docker.elastic.co/logstash/logstash             8.5.0     df0e328413e1   2 years ago     753MB
docker.elastic.co/kibana/kibana                 8.5.0     4737b8e943ba   2 years ago     715MB
```

To deploy an **ELK Stack** using the Docker images have  provided for **Elasticsearch**, **Logstash**, and **Kibana**, you can follow these steps. I'll guide you through the process of deploying and connecting the three components (Elasticsearch, Logstash, and Kibana) using Docker.

#### **1. Prerequisites**

* Ensure you have **Docker** installed and running on your machine.
* You should have the **Docker images** for `elasticsearch`, `logstash`, and `kibana` available (the versions you've mentioned).
* Make sure to allocate sufficient resources (RAM, CPU) for Elasticsearch (it can be resource-intensive).

#### **2. Create a Docker Network**

First, create a custom Docker network so that the three containers can communicate with each other:

```bash
docker network create elk
```

#### **3. Deploy Elasticsearch Container**

Elasticsearch is the central component of the ELK stack and needs to be set up first. Here's how to deploy it:

```bash
docker run -d --name elasticsearch \
  --network elk \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms2g -Xmx2g" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:8.5.0
```

**Explanation of the flags:**

* `--name elasticsearch`: The name of the container.
* `--network elk`: Connects the container to the `elk` network.
* `-e "discovery.type=single-node"`: This option makes Elasticsearch run as a single node (important for local setups).
* `-e "ES_JAVA_OPTS=-Xms2g -Xmx2g"`: Allocates memory (2 GB for both min and max).
* `-p 9200:9200`: Exposes port 9200 for Elasticsearch's REST API.
* `docker.elastic.co/elasticsearch/elasticsearch:8.5.0`: Specifies the Elasticsearch Docker image.

#### **4. Deploy Logstash Container**

Logstash is used to process logs and send them to Elasticsearch. Here’s how to deploy it:

```bash
docker run -d --name logstash \
  --network elk \
  -p 5044:5044 \
  -e "LOGSTASH_JAVA_OPTS=-Xms1g -Xmx1g" \
  docker.elastic.co/logstash/logstash:8.5.0
```

**Explanation of the flags:**

* `--name logstash`: The name of the container.
* `--network elk`: Connects the container to the `elk` network.
* `-p 5044:5044`: Exposes port 5044 for Logstash’s Beats input (e.g., Filebeat).
* `-e "LOGSTASH_JAVA_OPTS=-Xms1g -Xmx1g"`: Allocates memory (1 GB for both min and max).
* `docker.elastic.co/logstash/logstash:8.5.0`: Specifies the Logstash Docker image.

You can also mount your **Logstash configuration file** (logstash.conf) if needed, for example:

```bash
docker run -d --name logstash \
  --network elk \
  -v /path/to/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
  -p 5044:5044 \
  docker.elastic.co/logstash/logstash:8.5.0
```

Make sure to configure `logstash.conf` for your input (e.g., Filebeat), filter, and output (Elasticsearch).

#### **5. Deploy Kibana Container**

Kibana is used for data visualization in the ELK stack. Here's how to deploy it:

```bash
docker run -d --name kibana \
  --network elk \
  -p 5601:5601 \
  docker.elastic.co/kibana/kibana:8.5.0
```

**Explanation of the flags:**

* `--name kibana`: The name of the container.
* `--network elk`: Connects the container to the `elk` network.
* `-p 5601:5601`: Exposes port 5601 for Kibana's web interface.
* `docker.elastic.co/kibana/kibana:8.5.0`: Specifies the Kibana Docker image.

#### **6. Verify the Deployment**

*   Once all containers are running, check their status:

    ```bash
    docker ps
    ```
* You should see the **Elasticsearch**, **Logstash**, and **Kibana** containers running.
*   **Elasticsearch** should be accessible at `http://localhost:9200`. You can verify it by making a request:

    ```bash
    curl http://localhost:9200
    ```

    It should return JSON data about your Elasticsearch node.
* **Kibana** should be accessible at `http://localhost:5601`. Open this in your browser, and you should see the Kibana web interface.

#### **7. Configure Logstash Input and Output**

If you're planning to use **Filebeat** or any other log shipper, you will need to configure Logstash with the appropriate **input** and **output** settings. For example, you can configure **Logstash** to receive logs from **Filebeat** and forward them to **Elasticsearch**.

Here’s an example `logstash.conf`:

```bash
input {
  beats {
    port => 5044
  }
}

filter {
  # Custom filtering (if necessary)
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
}
```

You can mount this configuration file into the Logstash container using the `-v` flag.

#### **8. Access Kibana and Explore Data**

Once Kibana is up and running, you can access it via the browser at `http://localhost:5601`. Here, you can set up **index patterns**, explore your logs, and create **visualizations** and **dashboards** based on the data sent from Logstash.



To simplify the deployment of the **ELK Stack** using Docker, you can create a **`docker-compose.yml`** file. This YAML file will allow you to define and configure all the required services (Elasticsearch, Logstash, and Kibana) in a single file, and then spin them up using the `docker-compose` command.

Here’s a step-by-step guide to create the `docker-compose.yml` file for your ELK stack and deploy it:

#### **1. Create a `docker-compose.yml` File**

First, create a new directory for your ELK Stack project:

```bash
mkdir elk-stack
cd elk-stack
```

Now, create a file called **`docker-compose.yml`** inside this directory:

```bash
touch docker-compose.yml
```

Edit the `docker-compose.yml` file with the following content:

```yaml
yamlCopyversion: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms2g -Xmx2g
    networks:
      - elk
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    container_name: logstash
    environment:
      - LOGSTASH_JAVA_OPTS=-Xms1g -Xmx1g
    networks:
      - elk
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/config/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    container_name: kibana
    networks:
      - elk
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

networks:
  elk:
    driver: bridge

volumes:
  elasticsearch-data:
    driver: local
```

#### **Explanation of the Configuration:**

1. **`version: '3'`**: The version of the Docker Compose file format (version 3 is commonly used).
2. **`services`**: Defines the services (Elasticsearch, Logstash, and Kibana) that will be spun up.
   * **Elasticsearch**:
     * The `discovery.type=single-node` is for single-node Elasticsearch deployments (for local environments).
     * The `ES_JAVA_OPTS=-Xms2g -Xmx2g` configures Java heap memory.
     * It exposes port `9200` for communication.
     * Data is stored in a Docker volume called `elasticsearch-data`.
   * **Logstash**:
     * The `logstash.conf` configuration file is mounted into the container for custom processing rules (you’ll need to create this configuration).
     * Exposes port `5044` for receiving log data from filebeat (or any other log shipper).
     * `depends_on` ensures Logstash starts after Elasticsearch is ready.
   * **Kibana**:
     * Exposes port `5601` for the Kibana web interface.
     * `depends_on` ensures Kibana starts after Elasticsearch is ready.
3. **`networks`**: All services are connected to a custom Docker bridge network called `elk` so that they can communicate with each other.
4. **`volumes`**: Elasticsearch data is stored in a named volume (`elasticsearch-data`), so it persists even if the container is stopped or removed.

#### **2. Create the Logstash Configuration File**

Now, create the Logstash pipeline configuration file in the `logstash/config` directory. You can use the following command to create the directory and configuration file:

```bash
mkdir -p logstash/config
touch logstash/config/logstash.conf
```

Edit the `logstash.conf` file and add the following basic configuration (or customize it based on your needs):

```plaintext
plaintextCopyinput {
  beats {
    port => 5044
  }
}

filter {
  # Your filter configuration (optional)
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
}
```

This configuration tells Logstash to listen for log data from **Beats** (e.g., Filebeat) on port `5044` and send the data to Elasticsearch. The logs will be indexed with the `logstash-*` pattern in Elasticsearch.

#### **3. Spin Up the Containers with Docker Compose**

Now that your `docker-compose.yml` and Logstash configuration are ready, use Docker Compose to spin up the containers.

From the directory containing the `docker-compose.yml` file, run:

<pre class="language-bash"><code class="lang-bash"><strong>docker-compose up -d
</strong></code></pre>

This will:

* Pull the Docker images for **Elasticsearch**, **Logstash**, and **Kibana**.
* Create and start the containers.
* Attach the containers to the custom Docker network (`elk`).

#### **4. Verify the Deployment**

You can check if everything is running correctly using:

```bash
docker ps
```

You should see all three containers running (Elasticsearch, Logstash, and Kibana).

#### **5. Access Kibana**

Once the containers are up and running, open your web browser and go to:

```
http://localhost:5601
```

This will open the **Kibana** web interface where you can interact with the data stored in **Elasticsearch**, configure dashboards, create visualizations, and explore logs.

#### **6. Shutting Down the Stack**

To stop and remove the containers, run:

```bash
docker-compose down
```

This will stop the containers and remove them. If you want to remove the volumes as well (which deletes your Elasticsearch data), run:

```bash
docker-compose down -v
```

#### **Additional Customization**

* You can customize the **Logstash pipeline** configuration further based on your needs (e.g., different input/output plugins or filters).
* You can also tweak the memory settings for Elasticsearch and Logstash if needed.

####
