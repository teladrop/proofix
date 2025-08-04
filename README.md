# Proofix - Shopify Review Management App

A comprehensive Shopify app that helps stores collect, display, and leverage customer reviews to boost conversions with smart automation and beautiful galleries.

## Features

- **Automated Review Collection**: Automatically request reviews from customers after purchase
- **Photo & Video Reviews**: Collect authentic visual content from customers
- **Smart Filtering**: Help customers find reviews from people like them
- **AI-Powered Insights**: Get intelligent summaries and trends from reviews
- **UGC Generator**: AI-powered content creation for authentic user-generated content
- **Beautiful Galleries**: Display reviews in conversion-optimized layouts
- **Shopify Integration**: Seamless integration with Shopify stores

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui components
- **Shopify**: Shopify API v8, OAuth integration
- **Styling**: Custom design system with responsive components

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Shopify Partner account
- Domain with SSL (for production)

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd proofix

# Install dependencies
pnpm install

# Install Shopify SDK
pnpm add @shopify/shopify-api @shopify/shopify-app-session-storage-memory
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Shopify App Configuration
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_orders,read_customers,write_customers,read_reviews,write_reviews
SHOPIFY_APP_URL=https://your-app-domain.com
SHOPIFY_APP_NAME=Proofix

# Next.js
NEXTAUTH_URL=https://your-app-domain.com
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database (for session storage)
DATABASE_URL=your_database_url_here
```

### 4. Shopify Partner App Setup

1. Go to your [Shopify Partner Dashboard](https://partners.shopify.com)
2. Create a new app
3. Configure the following settings:

#### App URLs
- **App URL**: `https://your-domain.com/shopify`
- **Allowed redirection URLs**: 
  - `https://your-domain.com/api/auth/shopify/callback`
  - `https://your-domain.com/install`

#### Webhooks
- **Orders/fulfilled**: `https://your-domain.com/api/webhooks/shopify`
- **Orders/paid**: `https://your-domain.com/api/webhooks/shopify`
- **Products/update**: `https://your-domain.com/api/webhooks/shopify`

#### App Permissions
- `read_products`, `write_products`
- `read_orders`, `write_orders`
- `read_customers`, `write_customers`
- `read_reviews`, `write_reviews`

### 5. Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### 6. Testing the App

1. **Local Development**: Use ngrok or similar for HTTPS tunneling
2. **Installation Flow**: 
   - Visit `/install?shop=your-store.myshopify.com`
   - Complete OAuth flow
   - App will redirect to Shopify admin

## App Structure

```
proofix/
├── app/
│   ├── api/
│   │   ├── auth/shopify/          # OAuth routes
│   │   ├── shopify/               # Shopify API endpoints
│   │   └── webhooks/shopify/      # Webhook handlers
│   ├── install/                   # App installation page
│   ├── shopify/                   # Main app interface
│   └── ...                        # Other pages
├── components/
│   ├── shopify-app-provider.tsx   # Shopify context
│   ├── dashboard-layout.tsx       # Main app layout
│   └── ...                        # UI components
├── hooks/
│   └── use-shopify-data.ts       # Shopify data hooks
├── lib/
│   ├── shopify.ts                 # Shopify configuration
│   └── utils.ts                   # Utilities
└── middleware.ts                  # App middleware
```

## Key Components

### Shopify Integration
- **OAuth Flow**: Handles app installation and authentication
- **Webhooks**: Processes Shopify events (orders, products)
- **API Routes**: Fetches store data (products, orders)
- **Embedded App**: Runs within Shopify admin

### UI Components
- **Dashboard**: Overview with metrics and charts
- **Reviews**: Manage and display customer reviews
- **UGC Gallery**: Visual content management
- **UGC Generator**: AI-powered content creation
- **Automation**: Workflow management
- **Widgets**: Embeddable components
- **Settings**: App configuration

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Ensure HTTPS is enabled
- Set all environment variables
- Configure custom domain

## Security Considerations

- **HMAC Validation**: All webhooks are verified
- **Session Management**: Secure session storage
- **CSP Headers**: Proper content security policy
- **OAuth Security**: Follow Shopify security guidelines

## Support

For support and questions:
- Check the [Shopify App Development documentation](https://shopify.dev/apps)
- Review [Next.js documentation](https://nextjs.org/docs)
- Contact the development team

## License

This project is licensed under the MIT License.