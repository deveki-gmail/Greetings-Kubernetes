# =========================
# Stage 1: Build React app
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build React/Vite application
RUN npm run build


# =========================
# Stage 2: Run with Nginx
# =========================
FROM nginx:alpine

# Copy Vite build output to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]