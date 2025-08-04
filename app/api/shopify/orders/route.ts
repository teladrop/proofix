import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')
    const limit = searchParams.get('limit') || '50'
    const status = searchParams.get('status') || 'any'

    if (!shop) {
      return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 })
    }

    // For now, return mock data
    // In production, implement actual Shopify API calls
    const mockOrders = [
      {
        id: 1,
        email: "customer@example.com",
        closed_at: null,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        number: 1001,
        note: null,
        token: "token123",
        gateway: "shopify_payments",
        test: false,
        total_price: "299.00",
        subtotal_price: "299.00",
        total_weight: 250,
        total_tax: "0.00",
        taxes_included: false,
        currency: "USD",
        financial_status: "paid",
        confirmed: true,
        total_discounts: "0.00",
        total_line_items_price: "299.00",
        cart_token: "cart123",
        buyer_accepts_marketing: false,
        name: "#1001",
        referring_site: null,
        landing_site: null,
        cancelled_at: null,
        cancel_reason: null,
        total_price_usd: "299.00",
        checkout_token: "checkout123",
        reference: null,
        user_id: null,
        location_id: null,
        source_identifier: null,
        source_url: null,
        processed_at: "2024-01-15T10:00:00Z",
        device_id: null,
        phone: null,
        customer_locale: "en",
        app_id: null,
        browser_ip: null,
        landing_site_ref: null,
        order_number: 1001,
        discount_applications: [],
        discount_codes: [],
        note_attributes: [],
        payment_gateway_names: ["shopify_payments"],
        processing_method: "direct",
        checkout_id: null,
        source_name: "web",
        fulfillment_status: "fulfilled",
        tax_lines: [],
        tags: "",
        contact_email: "customer@example.com",
        order_status_url: "https://shop.myshopify.com/orders/token123/authenticate?key=key123",
        presentment_currency: "USD",
        total_line_items_price_set: {
          shop_money: {
            amount: "299.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "299.00",
            currency_code: "USD"
          }
        },
        total_discounts_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD"
          }
        },
        total_shipping_price_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD"
          }
        },
        subtotal_price_set: {
          shop_money: {
            amount: "299.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "299.00",
            currency_code: "USD"
          }
        },
        total_price_set: {
          shop_money: {
            amount: "299.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "299.00",
            currency_code: "USD"
          }
        },
        total_tax_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "USD"
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "USD"
          }
        },
        line_items: [
          {
            id: 1,
            variant_id: 1,
            title: "Premium Wireless Headphones",
            quantity: 1,
            sku: "WH-001",
            variant_title: null,
            vendor: "AudioTech",
            fulfillment_service: "manual",
            product_id: 1,
            requires_shipping: true,
            taxable: true,
            gift_card: false,
            name: "Premium Wireless Headphones",
            variant_inventory_management: "shopify",
            properties: [],
            product_exists: true,
            fulfillable_quantity: 1,
            grams: 250,
            price: "299.00",
            total_discount: "0.00",
            fulfillment_status: "fulfilled",
            price_set: {
              shop_money: {
                amount: "299.00",
                currency_code: "USD"
              },
              presentment_money: {
                amount: "299.00",
                currency_code: "USD"
              }
            },
            total_discount_set: {
              shop_money: {
                amount: "0.00",
                currency_code: "USD"
              },
              presentment_money: {
                amount: "0.00",
                currency_code: "USD"
              }
            },
            discount_allocations: [],
            duties: [],
            admin_graphql_api_id: "gid://shopify/LineItem/1",
            tax_lines: []
          }
        ],
        shipping_lines: [],
        billing_address: {
          first_name: "John",
          address1: "123 Main St",
          phone: "555-123-4567",
          city: "New York",
          zip: "10001",
          province: "New York",
          country: "United States",
          last_name: "Doe",
          address2: null,
          company: null,
          latitude: null,
          longitude: null,
          name: "John Doe",
          country_code: "US",
          province_code: "NY"
        },
        shipping_address: {
          first_name: "John",
          address1: "123 Main St",
          phone: "555-123-4567",
          city: "New York",
          zip: "10001",
          province: "New York",
          country: "United States",
          last_name: "Doe",
          address2: null,
          company: null,
          latitude: null,
          longitude: null,
          name: "John Doe",
          country_code: "US",
          province_code: "NY"
        },
        fulfillments: [
          {
            id: 1,
            order_id: 1,
            status: "success",
            created_at: "2024-01-15T10:00:00Z",
            service: "manual",
            updated_at: "2024-01-15T10:00:00Z",
            tracking_company: null,
            shipment_status: "delivered",
            location_id: null,
            line_items: [
              {
                id: 1,
                variant_id: 1,
                title: "Premium Wireless Headphones",
                quantity: 1,
                sku: "WH-001",
                variant_title: null,
                vendor: "AudioTech",
                fulfillment_service: "manual",
                product_id: 1,
                requires_shipping: true,
                taxable: true,
                gift_card: false,
                name: "Premium Wireless Headphones",
                variant_inventory_management: "shopify",
                properties: [],
                product_exists: true,
                fulfillable_quantity: 1,
                grams: 250,
                price: "299.00",
                total_discount: "0.00",
                fulfillment_status: "fulfilled",
                price_set: {
                  shop_money: {
                    amount: "299.00",
                    currency_code: "USD"
                  },
                  presentment_money: {
                    amount: "299.00",
                    currency_code: "USD"
                  }
                },
                total_discount_set: {
                  shop_money: {
                    amount: "0.00",
                    currency_code: "USD"
                  },
                  presentment_money: {
                    amount: "0.00",
                    currency_code: "USD"
                  }
                },
                discount_allocations: [],
                duties: [],
                admin_graphql_api_id: "gid://shopify/LineItem/1",
                tax_lines: []
              }
            ],
            tracking_number: null,
            tracking_numbers: [],
            tracking_url: null,
            tracking_urls: [],
            receipt: {
              testcase: true,
              authorization: "authorization123"
            },
            line_items_by_fulfillment: {
              "1": [
                {
                  id: 1,
                  variant_id: 1,
                  title: "Premium Wireless Headphones",
                  quantity: 1,
                  sku: "WH-001",
                  variant_title: null,
                  vendor: "AudioTech",
                  fulfillment_service: "manual",
                  product_id: 1,
                  requires_shipping: true,
                  taxable: true,
                  gift_card: false,
                  name: "Premium Wireless Headphones",
                  variant_inventory_management: "shopify",
                  properties: [],
                  product_exists: true,
                  fulfillable_quantity: 1,
                  grams: 250,
                  price: "299.00",
                  total_discount: "0.00",
                  fulfillment_status: "fulfilled",
                  price_set: {
                    shop_money: {
                      amount: "299.00",
                      currency_code: "USD"
                    },
                    presentment_money: {
                      amount: "299.00",
                      currency_code: "USD"
                    }
                  },
                  total_discount_set: {
                    shop_money: {
                      amount: "0.00",
                      currency_code: "USD"
                    },
                    presentment_money: {
                      amount: "0.00",
                      currency_code: "USD"
                    }
                  },
                  discount_allocations: [],
                  duties: [],
                  admin_graphql_api_id: "gid://shopify/LineItem/1",
                  tax_lines: []
                }
              ]
            }
          }
        ],
        client_details: {
          browser_ip: null,
          accept_language: null,
          user_agent: null,
          session_hash: null,
          browser_width: null,
          browser_height: null,
          flash_enabled: null,
          java_enabled: null,
          color_depth: null,
          time_zone: null
        },
        refunds: [],
        customer: {
          id: 1,
          email: "customer@example.com",
          accepts_marketing: false,
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-15T10:00:00Z",
          first_name: "John",
          last_name: "Doe",
          orders_count: 1,
          state: "enabled",
          total_spent: "299.00",
          last_order_id: 1,
          note: null,
          verified_email: true,
          multipass_identifier: null,
          tax_exempt: false,
          tags: "",
          last_order_name: "#1001",
          currency: "USD",
          phone: "555-123-4567",
          addresses: [
            {
              id: 1,
              customer_id: 1,
              first_name: "John",
              last_name: "Doe",
              company: null,
              address1: "123 Main St",
              address2: null,
              city: "New York",
              province: "New York",
              country: "United States",
              zip: "10001",
              phone: "555-123-4567",
              name: "John Doe",
              province_code: "NY",
              country_code: "US",
              country_name: "United States",
              default: true
            }
          ],
          accepts_marketing_updated_at: "2024-01-15T10:00:00Z",
          marketing_opt_in_level: null,
          tax_exemptions: [],
          admin_graphql_api_id: "gid://shopify/Customer/1",
          default_address: {
            id: 1,
            customer_id: 1,
            first_name: "John",
            last_name: "Doe",
            company: null,
            address1: "123 Main St",
            address2: null,
            city: "New York",
            province: "New York",
            country: "United States",
            zip: "10001",
            phone: "555-123-4567",
            name: "John Doe",
            province_code: "NY",
            country_code: "US",
            country_name: "United States",
            default: true
          }
        }
      }
    ]

    return NextResponse.json({
      orders: mockOrders,
      total: mockOrders.length,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
} 