# Greetings Kubernetes Sample Project

This sample project demonstrates a simple microservices application running on Kubernetes.

The project contains:

- **1 React application** for the frontend
- **2 Node.js applications** for backend services
- Docker images for all three applications, available on Docker Hub
- Kubernetes YAML manifests for Deployments, Services, and Ingress

## Project Structure

```text
Greetings-Kubernetes/
├── frontend/
├── service2/
├── service3/
├── kubernetes_files/
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── service2-deployment.yaml
│   ├── service2-service.yaml
│   ├── service3-deployment.yaml
│   ├── service3-service.yaml
│   └── ingress.yaml
└── project-introduction.txt
```

## Application Flow

```text
Browser
   |
   v
Ingress
   |
   +---- / ----> frontend-service ----> React Frontend Pod
   |
   +---- /api -> service-2 -----------> Node.js Service 2 Pod
                                          |
                                          | Internal Kubernetes call
                                          v
                                      service-3
                                          |
                                          v
                                    Node.js Service 3 Pod
```

## Prerequisites

Before running the application, make sure you have:

- Git installed
- Docker Desktop running
- Kubernetes enabled in Docker Desktop
- `kubectl` configured for the Kubernetes cluster
- An Ingress Controller installed and running

## How to Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/deveki-gmail/Greetings-Kubernetes.git
```

### 2. Go to the project directory

```bash
cd Greetings-Kubernetes
```

You should see:

```text
frontend
kubernetes_files
project-introduction.txt
service2
service3
```

### 3. Go to the Kubernetes manifests directory

```bash
cd kubernetes_files
```

The directory contains:

```text
frontend-deployment.yaml
ingress.yaml
service2-service.yaml
service3-service.yaml
frontend-service.yaml
service2-deployment.yaml
service3-deployment.yaml
```

### 4. Deploy all Kubernetes resources

Apply all YAML files in the current directory:

```bash
kubectl apply -f .
```

Example output:

```text
deployment.apps/frontend-deployment created
service/frontend-service created
ingress.networking.k8s.io/greeting-app-ingress unchanged
deployment.apps/service2-deployment created
service/service-2 created
deployment.apps/service3-deployment created
service/service-3 created
```

### 5. Verify the resources

Run:

```bash
kubectl get all
```

The important thing is that all three application Pods show `Running` and `READY 1/1`.

Example:

```text
NAME                                       READY   STATUS    RESTARTS
pod/frontend-deployment-xxxxxxxxxx-xxxxx   1/1     Running   0
pod/service2-deployment-xxxxxxxxxx-xxxxx    1/1     Running   0
pod/service3-deployment-xxxxxxxxxx-xxxxx    1/1     Running   0
```

You should also see these Services:

```text
frontend-service   ClusterIP   ...   80/TCP
service-2          ClusterIP   ...   8080/TCP
service-3          ClusterIP   ...   8080/TCP
```

> Cluster IP addresses and Pod names are dynamically generated, so they may be different on your machine.

### 6. Verify the Ingress

```bash
kubectl get ingress
```

You can also inspect the routing rules with:

```bash
kubectl describe ingress greeting-app-ingress
```

The application uses path-based routing:

```text
/       -> frontend-service:80
/api    -> service-2:8080
```

Service 2 communicates internally with Service 3 using:

```text
http://service-3:8080
```

### 7. Open the application

Open a browser and visit:

```text
http://localhost/
```

The React frontend should load, and requests to `/api` are routed by the Ingress to Service 2. Service 2 can then communicate with Service 3 inside the Kubernetes cluster.

## Useful Verification Commands

### Check Pods

```bash
kubectl get pods
```

### Check Services

```bash
kubectl get svc
```

### Check Deployments

```bash
kubectl get deployments
```

### Check Ingress

```bash
kubectl get ingress
```

### Check Service 2 logs

```bash
kubectl logs deployment/service2-deployment
```

### Check Service 3 logs

```bash
kubectl logs deployment/service3-deployment
```

## Cleanup

To remove the application resources created by the YAML files, run this from the `kubernetes_files` directory:

```bash
kubectl delete -f .
```

## Summary

This project demonstrates the following flow:

```text
React Frontend
      |
      v
Ingress
      |
      v
Service 2
      |
      v
Service 3
```

It provides a small hands-on example for understanding Docker images, Kubernetes Deployments, Pods, ClusterIP Services, internal service-to-service communication, and Ingress routing.
