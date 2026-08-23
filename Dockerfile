FROM mcr.microsoft.com/playwright:v1.62.0-noble

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Run the tests
CMD ["npx", "playwright", "test"]