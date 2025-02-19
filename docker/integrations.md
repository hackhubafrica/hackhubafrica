---
icon: docker
---

# Lab

## **Cybersecurity Lab Setup with Docker**

This guide will walk you through setting up a complete cybersecurity lab using Docker. It includes a Kali Linux container, vulnerable web apps, and other services like Metasploitable and DVWA. We'll also cover network isolation, reverse proxy, and logging using the ELK Stack.

***

### **1️⃣ Prerequisites: Install Docker & Docker Compose**

#### **Install Docker**

Ensure that Docker and Docker Compose are installed on your machine. Run the following commands:

```sh
sudo apt update && sudo apt install docker.io docker-compose -y
```

Verify your installation by checking the versions:

```sh
docker --version
docker-compose --version
```

***

### **2️⃣ Set Up a Docker Network**

To allow communication between the containers, we need to set up a custom network.

```sh
docker network create cyberlab
```

***

### **3️⃣ Create a `docker-compose.yml` File**

We’ll define the services in a `docker-compose.yml` file. This file will define containers like Kali Linux, DVWA, Metasploitable, and Juice Shop.

Create a `cyberlab` folder and open the `docker-compose.yml` file:

```sh
mkdir ~/cyberlab && cd ~/cyberlab
nano docker-compose.yml
```

Paste the following content into the file:

```yaml
yamlCopyversion: '3.8'

services:
  kali:
    image: kalilinux/kali-rolling
    container_name: kali
    command: tail -f /dev/null  # Keeps container running
    tty: true
    stdin_open: true
    networks:
      - cyberlab

  dvwa:
    image: vulnerables/web-dvwa
    container_name: dvwa
    ports:
      - "8080:80"
    restart: always
    networks:
      - cyberlab

  metasploitable:
    image: tleemcjr/metasploitable2
    container_name: metasploitable
    ports:
      - "2222:22"  # SSH
      - "3389:3389"  # RDP
    networks:
      - cyberlab

  juice-shop:
    image: bkimminich/juice-shop
    container_name: juice-shop
    ports:
      - "3000:3000"
    restart: always
    networks:
      - cyberlab

networks:
  cyberlab:
    driver: bridge
```

This setup defines four containers:

* **Kali Linux** for penetration testing.
* **DVWA** (Damn Vulnerable Web App) for web app security practice.
* **Metasploitable2** for exploiting known vulnerabilities.
* **OWASP Juice Shop** for web application security practice.

***

### **4️⃣ Start the Lab**

Run the following command to start all containers:

```sh
docker-compose up -d
```

This will start all containers in detached mode.

***

### **5️⃣ Access Containers**

Here’s how you can access each container:

#### **Kali Linux Shell**

To access Kali Linux's interactive shell, run:

```sh
docker exec -it kali /bin/bash
```

#### **DVWA (Damn Vulnerable Web App)**

Open `http://localhost:8080` in your browser. Login with:

* Username: `admin`
* Password: `password`

#### **Metasploitable SSH**

SSH into Metasploitable:

```sh
ssh msfadmin@localhost -p 2222
```

Password: `msfadmin`

#### **OWASP Juice Shop**

Open `http://localhost:3000` in your browser.

***

### **6️⃣ Enhance Your Cybersecurity Lab**

#### **Reverse Proxy (Traefik or NGINX)**

To manage multiple services via a single entry point, you can use a reverse proxy like **Traefik** or **NGINX**.

**Using Traefik**

Traefik dynamically discovers services via Docker labels. Here's how you can configure it in `docker-compose.yml`:

```yaml
yamlCopyservices:
  traefik:
    image: traefik:v2.9
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"  # Traefik Dashboard
    networks:
      cyberlab:
        ipv4_address: 192.168.100.2
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      
  dvwa:
    image: vulnerables/web-dvwa
    container_name: dvwa
    networks:
      cyberlab:
        ipv4_address: 192.168.100.10
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dvwa.rule=Host(`dvwa.local`)"
```

Then, modify your `/etc/hosts` file to access `dvwa.local` locally:

```sh
192.168.100.10 dvwa.local
```

Start the services:

```sh
docker-compose up -d
```

You can now access **DVWA** at `http://dvwa.local` and the Traefik Dashboard at `http://localhost:8080`.

**Using NGINX**

If you prefer **NGINX** for reverse proxy, use the following configuration for `nginx.conf`:

```nginx
nginxCopyserver {
    listen 80;
    server_name dvwa.local;
    
    location / {
        proxy_pass http://192.168.100.10;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Run NGINX with:

```sh
docker run -d --name nginx -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx
```

***

### **7️⃣ Set Up Logging & Monitoring with the ELK Stack**

To monitor logs from your containers, you can use the **ELK Stack** (Elasticsearch, Logstash, Kibana).

#### **Add ELK to `docker-compose.yml`**

```yaml
yamlCopyservices:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
    networks:
      cyberlab:
        ipv4_address: 192.168.100.20

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch
    networks:
      cyberlab:
        ipv4_address: 192.168.100.21

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    depends_on:
      - elasticsearch
    ports:
      - "5601:5601"
    networks:
      cyberlab:
        ipv4_address: 192.168.100.22
```

#### **Configure Logstash (`logstash.conf`)**

Create the `logstash.conf` file to specify how logs are processed:

```sh
input {
  file {
    path => "/var/log/nginx/access.log"
    start_position => "beginning"
  }
}

output {
  elasticsearch {
    hosts => ["http://192.168.100.20:9200"]
  }
}
```

Run the ELK Stack:

```sh
docker-compose up -d
```

#### **Access Kibana**

You can access Kibana at `http://localhost:5601` and start analyzing logs from your containers.

***

### **8️⃣ Set Up a Dedicated Subnet**

To enhance your network setup, assign static IP addresses within a custom subnet.

#### **Create a Custom Network**

```sh
docker network create --subnet=192.168.100.0/24 cyberlab
```

#### **Assign Static IPs in `docker-compose.yml`**

Each container can be assigned a static IP address like this:

```yaml
yamlCopynetworks:
  cyberlab:
    ipv4_address: 192.168.100.10
```

***

### **9️⃣ Running Vulnerable Containers**

#### **Metasploitable 2**

Run **Metasploitable 2** for vulnerability exploitation:

```sh
docker run -d --name metasploitable -p 2222:22 -p 80:80 tleemcjr/metasploitable2
```

* **SSH**: `msfadmin:msfadmin`
* **Web**: `http://localhost:80`

#### **DVWA (Damn Vulnerable Web App)**

Run **DVWA**:

```sh
docker run -d --name dvwa -p 8080:80 vulnerables/web-dvwa
```

* **Login**: `admin:password`
* **Access**: `http://localhost:8080`

***

### **Conclusion**

You now have a fully functional cybersecurity lab with Docker. You can access vulnerable applications like DVWA, Juice Shop, and Metasploitable, all while monitoring logs with ELK and managing services with Traefik or NGINX. Use this environment for penetration testing, vulnerability discovery, and more!
