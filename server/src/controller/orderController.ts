import { MenuItemType } from "./../models/restaurant";
import Restaurant from "../models/restaurant";
import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL;

type CheckoutSessionRequest = {
  restaurantId: string;
  cartItems: {
    name: string;
    quantity: string;
    menuItemId: string;
  }[];
  deliveryDetails: {
    city: string;
    email: string;
    addressLine1: string;
    name: string;
  };
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );

    if (!restaurant) throw new Error("Restaurant not available...❌");

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "Placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(),
    });

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) throw new Error("Error creating stripe session...❌");

    await newOrder.save();  

    res.status(200).json({
      success: true,
      error: false,
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  MenuItem: MenuItemType[]
) => {
  const lineItem = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = MenuItem.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );
    if (!menuItem)
      throw new Error(`Menu Item Not Found : ${cartItem.menuItemId}`);

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "INR",
        unit_amount: menuItem.price * 100,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });

  return lineItem;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  restaurantId: string,
  deliveryPrice: number,
  orderId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice * 100,
            currency: "INR",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/restaurantDetails/${restaurantId}?canceled=true`,
  });

  return sessionData;
};


export const stripeWebhookHandler = async(req:Request,res:Response)=>{
  console.log("Recieved events");
  console.log("====");
  console.log("event :",req.body);
  res.send();
}