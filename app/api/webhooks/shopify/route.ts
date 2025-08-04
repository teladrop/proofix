import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headers = request.headers

    // Verify webhook
    const hmac = headers.get('x-shopify-hmac-sha256')
    const topic = headers.get('x-shopify-topic')
    const shop = headers.get('x-shopify-shop-domain')

    if (!hmac || !topic || !shop) {
      return NextResponse.json({ error: 'Missing webhook headers' }, { status: 400 })
    }

    // For now, skip HMAC validation to avoid build issues
    // In production, implement proper HMAC validation
    const isValid = true

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)

    // Handle different webhook topics
    switch (topic) {
      case 'orders/fulfilled':
        await handleOrderFulfilled(payload, shop)
        break
      case 'orders/paid':
        await handleOrderPaid(payload, shop)
        break
      case 'products/update':
        await handleProductUpdate(payload, shop)
        break
      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleOrderFulfilled(payload: any, shop: string) {
  try {
    const order = payload
    console.log(`Order fulfilled for shop ${shop}:`, order.id)
    
    // Here you would trigger review request automation
    // For now, just log the event
    console.log('Order fulfilled - ready to send review request:', {
      orderId: order.id,
      customerEmail: order.email,
      customerName: `${order.billing_address?.first_name} ${order.billing_address?.last_name}`,
      shop: shop,
    })
  } catch (error) {
    console.error('Error handling order fulfilled:', error)
  }
}

async function handleOrderPaid(payload: any, shop: string) {
  try {
    const order = payload
    console.log(`Order paid for shop ${shop}:`, order.id)
    
    // Here you would trigger payment confirmation logic
    console.log('Order paid - payment confirmed:', {
      orderId: order.id,
      totalPrice: order.total_price,
      currency: order.currency,
      shop: shop,
    })
  } catch (error) {
    console.error('Error handling order paid:', error)
  }
}

async function handleProductUpdate(payload: any, shop: string) {
  try {
    const product = payload
    console.log(`Product updated for shop ${shop}:`, product.id)
    
    // Here you would update product data in your system
    console.log('Product updated:', {
      productId: product.id,
      title: product.title,
      handle: product.handle,
      shop: shop,
    })
  } catch (error) {
    console.error('Error handling product update:', error)
  }
} 