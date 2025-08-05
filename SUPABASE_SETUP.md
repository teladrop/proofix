# Supabase Setup Guide for Proofix

This guide will help you set up Supabase as the storage backend for your Proofix Shopify app.

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Create a new organization (if needed)
5. Create a new project:
   - **Name**: `proofix-shopify-app`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier (or Pro if needed)

### 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon Public Key** (starts with `eyJ...`)

### 3. Set Up Environment Variables

#### Local Development
Update your `.env.local` file:
```env
# Existing Shopify variables
SHOPIFY_APP_URL=https://getproofix.vercel.app
SHOPIFY_API_KEY=ac468f53aee133c4db3b53eeb99bfb8f
NEXT_PUBLIC_SHOPIFY_API_KEY=ac468f53aee133c4db3b53eeb99bfb8f
NEXT_PUBLIC_APP_URL=https://getproofix.vercel.app
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_orders,read_customers,write_customers

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Vercel Deployment
1. Go to your Vercel dashboard
2. Select your Proofix project
3. Go to **Settings** → **Environment Variables**
4. Add the same Supabase variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL script
4. This will create all necessary tables and security policies

### 5. Configure Row Level Security (RLS)

The schema is configured with RLS disabled for development. This makes it easier to get started:

```sql
-- RLS is disabled by default in the schema
-- For production, you can enable it with proper policies
```

**For Production**: When you're ready to deploy to production, you should:
1. Enable RLS on all tables
2. Create proper policies based on shop isolation
3. Implement proper authentication checks

## 📊 Database Schema

### Tables Created

1. **`shopify_sessions`** - Stores Shopify OAuth sessions
2. **`app_settings`** - Stores app configuration per shop
3. **`reviews`** - Stores customer reviews
4. **`ugc_content`** - Stores user-generated content (photos/videos)
5. **`analytics`** - Stores app usage analytics

### Key Features

- **Automatic timestamps**: `created_at` and `updated_at` fields
- **Shop isolation**: All data is scoped by shop domain
- **Performance indexes**: Optimized for common queries
- **Data validation**: Constraints ensure data integrity

## 🔧 Integration Points

### 1. Shopify Session Storage
```typescript
// lib/supabase-session-storage.ts
export class SupabaseSessionStorage {
  async storeSession(session: Session): Promise<boolean>
  async loadSession(id: string): Promise<Session | undefined>
  async deleteSession(id: string): Promise<boolean>
}
```

### 2. API Routes
```typescript
// app/api/supabase/settings/route.ts
GET /api/supabase/settings?shop=store.myshopify.com
POST /api/supabase/settings?shop=store.myshopify.com

// app/api/supabase/reviews/route.ts
GET /api/supabase/reviews?shop=store.myshopify.com&product_id=123
POST /api/supabase/reviews?shop=store.myshopify.com
```

### 3. React Hooks
```typescript
// hooks/use-supabase.ts
const { settings, loading, error, updateSettings } = useAppSettings(shop)
const { reviews, loading, error, createReview } = useReviews(shop, productId)
const { content, loading, error, createContent } = useUGCContent(shop)
```

## 🛡️ Security Considerations

### 1. Row Level Security (RLS)
- All tables have RLS enabled
- Policies ensure shops can only access their own data
- Session data is properly isolated

### 2. Environment Variables
- Never commit real Supabase credentials to Git
- Use different keys for development and production
- Rotate keys regularly

### 3. API Security
- All API routes validate shop parameter
- Supabase handles authentication and authorization
- No direct database access from client

## 📈 Usage Examples

### Store App Settings
```typescript
const { updateSettings } = useAppSettings(shop)

await updateSettings({
  reviewCollection: {
    enabled: true,
    delay: 7, // days
    emailTemplate: 'default'
  },
  displaySettings: {
    showPhotos: true,
    showRatings: true,
    layout: 'grid'
  }
})
```

### Create a Review
```typescript
const { createReview } = useReviews(shop)

await createReview({
  product_id: '123',
  customer_id: '456',
  rating: 5,
  title: 'Great product!',
  content: 'Really happy with this purchase',
  photos: ['https://example.com/photo1.jpg'],
  verified: true
})
```

### Store UGC Content
```typescript
const { createContent } = useUGCContent(shop)

await createContent({
  product_id: '123',
  customer_id: '456',
  content_type: 'photo',
  url: 'https://example.com/ugc-photo.jpg',
  approved: false
})
```

## 🔍 Monitoring and Analytics

### 1. Supabase Dashboard
- Monitor database performance
- View real-time logs
- Check storage usage

### 2. Custom Analytics
```typescript
// Track app usage
await supabase.from('analytics').insert({
  shop: 'store.myshopify.com',
  event_type: 'review_created',
  event_data: { product_id: '123', rating: 5 }
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure Supabase environment variables are set
2. **Permission Denied**: Check RLS policies in Supabase dashboard
3. **Connection Issues**: Verify Supabase URL and API key
4. **Data Not Saving**: Check browser console for errors

### Debug Mode
```typescript
// Enable Supabase debug logging
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
})
```

## 📚 Next Steps

1. **Set up real Supabase project** with your credentials
2. **Deploy schema** using the SQL file
3. **Test the integration** with a development store
4. **Monitor performance** and adjust as needed
5. **Implement additional features** like real-time updates

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Shopify App Development](https://shopify.dev/apps)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Note**: This setup provides a solid foundation for storing app data with Shopify OAuth. The combination gives you the best of both worlds: secure authentication through Shopify and flexible data storage with Supabase. 