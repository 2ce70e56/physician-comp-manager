# Quick Start Guide

## Development Setup in 5 Minutes

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/physician-comp-manager.git

# Navigate to project directory
cd physician-comp-manager

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 2. Configure Environment

Minimum required variables in `.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/physician_comp"

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# SQL Server (for productivity data)
SQL_SERVER="your-sql-server"
SQL_DATABASE="your-database"
SQL_USER="your-username"
SQL_PASSWORD="your-password"
```

### 3. Database Setup

```bash
# Start PostgreSQL with Docker (optional)
docker run --name physician-comp-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=physician_comp \
  -p 5432:5432 \
  -d postgres:14

# Initialize database
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 5. Test Data Setup

```bash
# Load sample data
npm run seed

# Test credentials:
Email: admin@example.com
Password: password123
```

## Common Development Tasks

### Adding a New Provider

1. Navigate to `/providers`
2. Click "Add Provider"
3. Fill in required information
4. Save

### Creating a Contract

1. Navigate to `/providers/{id}`
2. Click "Add Contract"
3. Fill in contract terms
4. Save

### Importing Productivity Data

1. Navigate to `/productivity`
2. Click "Import Data"
3. Select SQL Server sync or file upload
4. Follow the wizard

### Running Tests

```bash
# All tests
npm test

# Specific component
npm test -- components/ProviderForm

# With coverage
npm test -- --coverage
```

### Database Management

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## Troubleshooting

### Database Connection

Test connection:
```bash
npx prisma db push --preview-feature
```

### SQL Server Connection

Test connection:
```bash
npm run test:sql-connection
```

### Component Development

View component documentation:
```bash
npm run storybook
```

## Next Steps

- Review the full [README.md](../README.md)
- Check [API Documentation](../swagger.yaml)
- Review [Architecture Overview](./ARCHITECTURE.md)
