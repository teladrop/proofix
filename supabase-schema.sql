-- Supabase Schema for Proofix Shopify App

-- Note: auth.users table is managed by Supabase and cannot be modified
-- Row Level Security is already enabled by default

-- Shopify Sessions Table
CREATE TABLE IF NOT EXISTS shopify_sessions (
  id TEXT PRIMARY KEY,
  shop TEXT NOT NULL,
  state TEXT,
  isOnline BOOLEAN DEFAULT false,
  scope TEXT,
  expires TIMESTAMP WITH TIME ZONE,
  accessToken TEXT,
  onlineAccessInfo JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App Settings Table
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop TEXT NOT NULL UNIQUE,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop TEXT NOT NULL,
  product_id TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  photos TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- UGC Content Table
CREATE TABLE IF NOT EXISTS ugc_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop TEXT NOT NULL,
  product_id TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('photo', 'video')),
  url TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shopify_sessions_shop ON shopify_sessions(shop);
CREATE INDEX IF NOT EXISTS idx_app_settings_shop ON app_settings(shop);
CREATE INDEX IF NOT EXISTS idx_reviews_shop ON reviews(shop);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_ugc_content_shop ON ugc_content(shop);
CREATE INDEX IF NOT EXISTS idx_ugc_content_product ON ugc_content(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_shop ON analytics(shop);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- Row Level Security Policies
-- For development, we'll disable RLS to avoid complexity
-- In production, you can enable and configure proper policies

-- Shopify Sessions
ALTER TABLE shopify_sessions DISABLE ROW LEVEL SECURITY;

-- App Settings
ALTER TABLE app_settings DISABLE ROW LEVEL SECURITY;

-- Reviews
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- UGC Content
ALTER TABLE ugc_content DISABLE ROW LEVEL SECURITY;

-- Analytics
ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;

-- Note: For production, you should enable RLS and create proper policies
-- Example policies (uncomment when ready for production):
/*
-- Enable RLS for all tables
ALTER TABLE shopify_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE ugc_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policies (you'll need to implement proper shop validation)
CREATE POLICY "Allow all operations for authenticated users" ON shopify_sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON app_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON reviews FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON ugc_content FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON analytics FOR ALL USING (true);
*/

-- Functions for automatic updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_shopify_sessions_updated_at BEFORE UPDATE ON shopify_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ugc_content_updated_at BEFORE UPDATE ON ugc_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 