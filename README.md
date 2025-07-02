# Hormesis - Blockchain Profile Management

A Next.js application with Vercel edge functions for blockchain profile management. This monorepo contains a web frontend and serverless API for viewing and managing blockchain profiles.
Note: data is mocked and does not retrieves actual on-chain data

📖 **For detailed architecture, design information and API, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

You can find the take-home assignment here: https://hackmd.io/@lCF38r_wRq24WY6b1zLIPw/rJZM4QMWgx

You can find a live demo here: https://reown-inky.vercel.app

You can find the live API here: https://api-gray-omega-61.vercel.app

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Bun** >= 1.2.0 (recommended) or **npm**/yarn
- **Vercel CLI** (for deployment and to run local vercel functions)
- **Supabase CLI** (for local database)
- **Docker Desktop** (for local database)

### CLI Setup (First Time Only)

If this is your first time setting up the project, you'll need to install and configure the required CLIs:

#### 1. Install Vercel CLI

```bash
# Using npm
npm install -g vercel

# Using Bun
bun add -g vercel

# Or you can use npx
```

**Configure Vercel CLI:**

```bash
vercel login
```

This will open your browser to authenticate with Vercel. Follow the prompts to complete the setup.

#### 2. Install Supabase CLI

```bash
# Using npm
npm install -g supabase

# Using Bun
bun add -g supabase
```

**Configure Supabase CLI:**

```bash
# Login to Supabase
supabase login
```

#### 3. Verify CLI Installation

```bash
# Check Vercel CLI
vercel --version

# Check Supabase CLI
supabase --version
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:xikimay/reown-test.git
   cd reown-test
   ```

2. **Install dependencies:**

   ```bash
   # Using Bun
   bun install

   # Or using npm
   npm install
   ```

3. **Set up local environment variables:**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   ⚠️ **Warning:** The default `NEXT_PUBLIC_API_BASE_URL` in `.env.example` might not match your actual API port. You should verify and update it after starting the development server.

   Update your `.env.local` file with your actual Supabase credentials:

   ```env
   # Supabase Configuration
   # Get these from your Supabase project dashboard
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # API Configuration (for local development)
   # ⚠️  WARNING: This default port might not match your actual API port
   # Check the Vercel dev output when starting the development server
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

## 🏃‍♂️ Running Locally

### Option 1: Full Local Development (first time)

1. **Start the local database:**

   ```bash
   bun run db:start
   ```

2. **Set db env**
   Once supabase have started copy the variables to your local.env
   API URL and service_role key

3. **Start the API Vercel Functions**

   ```bash
   bun run api:start
   ```

   > **Note:** Verify that the API is running on the same port specified in your `.env.local` file. If the Vercel dev output shows a different port, update `NEXT_PUBLIC_API_BASE_URL` accordingly.

4. **Start the NextJS app**

   ```bash
   bun run web:start
   ```

5. **Next time**
   Use the command

   ```bash
   bun run dev
   ```

   to launch both and leverage turborepo

   > **Note:** Local devlopment is slower than the production version

## 🌐 Deployment

### Deploy Edge Functions (API) and NextJS app

```bash
npm run deploy
```

### Environment Variables for Production

Set these in your Vercel project settings:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_API_BASE_URL=https://your-api-project.vercel.app
```

## 📁 Project Structure

```
hormesis/
├── apps/
│   ├── web/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   │   ├── components/  # React components
│   │   │   │   ├── lib/         # Utilities and configuration
│   │   │   │   └── services/    # API service layer
│   │   │   └── package.json
│   │   └── api/                 # Vercel edge functions
│   │       ├── api/             # API routes
│   │       ├── src/             # Shared types and utilities
│   │       └── vercel.json
│   └── packages/
│       └── database/            # Supabase database configuration
└── package.json
```

## 🛠️ Available Scripts

### Root Level Commands

```bash
bun run dev          # Start all development servers
bun run build        # Build all packages
bun run check-types  # Check types in all packages
bun run deploy       # Deploy all applications
```

### Database Commands

```bash
bun run db:start     # Start Supabase database
bun run db:stop      # Stop Supabase database
bun run db:reset     # Reset database
bun run db:migrate   # Run database migrations
```

## 🧪 Testing

### Test the API

```bash
# Test local API
curl http://localhost:3001/api/profiles

# Test deployed API
curl https://your-api-project.vercel.app/api/profiles
```
