import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 })
    }

    // For now, return mock data
    // In production, implement actual Shopify API calls
    const mockProducts = [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        handle: "premium-wireless-headphones",
        status: "active",
        vendor: "AudioTech",
        product_type: "Electronics",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        published_at: "2024-01-15T10:00:00Z",
        template_suffix: null,
        tags: "wireless, bluetooth, premium",
        admin_graphql_api_id: "gid://shopify/Product/1",
        variants: [
          {
            id: 1,
            product_id: 1,
            title: "Default Title",
            price: "299.00",
            sku: "WH-001",
            position: 1,
            inventory_policy: "deny",
            compare_at_price: null,
            fulfillment_service: "manual",
            inventory_management: "shopify",
            option1: "Default Title",
            option2: null,
            option3: null,
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z",
            taxable: true,
            barcode: null,
            grams: 250,
            image_id: null,
            weight: 0.25,
            weight_unit: "kg",
            inventory_item_id: 1,
            inventory_quantity: 50,
            old_inventory_quantity: 50,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/1"
          }
        ],
        options: [
          {
            id: 1,
            product_id: 1,
            name: "Title",
            position: 1,
            values: ["Default Title"]
          }
        ],
        images: [
          {
            id: 1,
            product_id: 1,
            position: 1,
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z",
            alt: null,
            width: 800,
            height: 600,
            src: "https://cdn.shopify.com/s/files/1/0000/0000/products/headphones.jpg",
            variant_ids: [],
            admin_graphql_api_id: "gid://shopify/ProductImage/1"
          }
        ],
        image: {
          id: 1,
          product_id: 1,
          position: 1,
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-15T10:00:00Z",
          alt: null,
          width: 800,
          height: 600,
          src: "https://cdn.shopify.com/s/files/1/0000/0000/products/headphones.jpg",
          variant_ids: [],
          admin_graphql_api_id: "gid://shopify/ProductImage/1"
        }
      }
    ]

    return NextResponse.json({
      products: mockProducts,
      total: mockProducts.length,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
} 