# Physician Compensation Management System

A comprehensive solution for managing physician compensation, productivity tracking, and market benchmarking.

## Features

- 👥 Provider Management
  - Track physicians and advanced practice providers (NPs/PAs)
  - Manage provider details and specialties
  - Monitor provider status and history

- 📊 Compensation Management
  - Handle multiple compensation models
  - Track base salary, productivity bonuses, and quality incentives
  - Calculate compensation based on complex formulas

- 📈 Productivity Tracking
  - SQL Server integration for wRVU data
  - Track patient encounters and collections
  - Monitor productivity trends

- 📋 Contract Management
  - Create and manage provider contracts
  - Track contract terms and conditions
  - Handle contract renewals and amendments

- 📊 Market Data Analysis
  - Import and manage market benchmark data
  - Compare provider compensation to market standards
  - Generate market position reports

## Prerequisites

- Node.js 18.x or later
- PostgreSQL 14.x or later
- Redis 7.x or later
- SQL Server (for productivity data integration)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/physician-comp-manager.git
   cd physician-comp-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit .env with your configuration:
   - Database connection details
   - Authentication secrets
   - SQL Server connection details
   - Redis configuration

4. **Initialize the database**
   ```bash
   # Create the database
   npx prisma db push

   # Run migrations
   npx prisma migrate deploy

   # Generate Prisma Client
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Production Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   docker build -t physician-comp .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Using Kubernetes

1. **Update Kubernetes configurations**
   - Edit `kubernetes/app.yaml` with your settings
   - Configure ingress in `kubernetes/ingress.yaml`

2. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f kubernetes/
   ```

3. **Verify deployment**
   ```bash
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

## Database Configuration

### PostgreSQL Setup

1. **Create a new database**
   ```sql
   CREATE DATABASE physician_comp;
   ```

2. **Create a database user**
   ```sql
   CREATE USER physician_comp_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE physician_comp TO physician_comp_user;
   ```

### SQL Server Integration

1. **Configure SQL Server connection**
   - Update SQL Server settings in `.env`
   - Ensure the SQL user has appropriate permissions

2. **Test connectivity**
   ```bash
   npm run test:sql-connection
   ```

## Security Configuration

1. **Set up authentication**
   - Configure Google OAuth in the Google Cloud Console
   - Update OAuth credentials in `.env`
   - Configure NextAuth settings

2. **Configure CORS (if needed)**
   - Update CORS settings in `next.config.js`

## Monitoring and Logging

1. **Enable monitoring**
   - Configure Prometheus metrics endpoint
   - Set up logging with Winston

2. **Health checks**
   - Monitor `/api/health` endpoint
   - Configure alerting

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test:coverage

# Run specific test file
npm test -- path/to/test
```

### Code Quality

```bash
# Run linter
npm run lint

# Run type checking
npm run type-check
```

## API Documentation

API documentation is available at `/api-docs` when running in development mode. This uses the OpenAPI specification in `swagger.yaml`.

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify database credentials in `.env`
   - Check database service is running
   - Ensure network connectivity

2. **SQL Server Connection**
   - Verify SQL Server credentials
   - Check firewall settings
   - Test network connectivity

3. **Redis Connection**
   - Verify Redis is running
   - Check Redis connection string

### Getting Help

- Check the [Issues](https://github.com/yourusername/physician-comp-manager/issues) page
- Review the documentation
- Contact support

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
