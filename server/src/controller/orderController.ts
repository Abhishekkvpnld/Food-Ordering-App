import { MenuItemType } from "./../models/restaurant";
import Restaurant from "../models/restaurant";
import { Request, Response } from "express";
import Stripe from "stripe";

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

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );
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
        currency: "Rs",
        unit_amount: menuItem.price,
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
