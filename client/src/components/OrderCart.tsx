import { CartItems as CartItemsType } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/form/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Trash2,
} from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItemsType[];
  removeFromCart: (item: CartItemsType) => void;
};

const OrderCart = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const subtotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0,
  );

  const deliveryCharge = Number(restaurant.deliveryPrice);

  const totalPrice = subtotal + deliveryCharge;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant || cartItems.length === 0) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),

      restaurantId: restaurant._id,

      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);

    window.location.href = data.url;
  };

  return (
    <Card
      className="
        relative
        overflow-hidden
        border
        border-gray-100
        bg-white
        rounded-2xl
        shadow-sm
      "
    >
      {/* =====================================================
          DECORATIVE GLOW
      ===================================================== */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* =====================================================
          HEADER
      ===================================================== */}
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Your Order
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                {totalItems > 0
                  ? `${totalItems} ${
                      totalItems === 1 ? "item" : "items"
                    } selected`
                  : "Your cart is empty"}
              </p>
            </div>
          </div>

          {/* Total badge */}
          {cartItems.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Total</p>

              <p className="text-xl font-extrabold text-orange-500">
                ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      {/* =====================================================
          CART CONTENT
      ===================================================== */}
      <CardContent className="relative">
        {cartItems.length === 0 ? (
          /* =================================================
             EMPTY CART
          ================================================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-orange-400" />
            </div>

            <h3 className="font-bold text-gray-900">Your cart is empty</h3>

            <p className="text-sm text-gray-500 mt-1 max-w-[220px] mx-auto">
              Add some delicious dishes from the menu to get started.
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-orange-500 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hungry? Let's fix that!</span>
            </div>
          </motion.div>
        ) : (
          <>
            {/* =================================================
                CART ITEMS
            ================================================= */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                      height: 0,
                      marginBottom: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      bg-gray-50
                      border
                      border-gray-100
                      hover:border-orange-100
                      hover:bg-orange-50/40
                      transition-all
                    "
                  >
                    {/* Quantity */}
                    <div
                      className="
                        shrink-0
                        w-9
                        h-9
                        rounded-lg
                        bg-orange-500
                        text-white
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-bold
                        shadow-sm
                      "
                    >
                      {item.quantity}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        ₹{item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Item Total */}
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900 text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item)}
                        className="
                          mt-1
                          inline-flex
                          items-center
                          justify-center
                          w-7
                          h-7
                          rounded-lg
                          text-gray-400
                          hover:text-red-500
                          hover:bg-red-50
                          transition-all
                        "
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}
            <div className="mt-6">
              <Separator />

              <div className="space-y-3 pt-5">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-semibold text-gray-800">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-blue-500" />

                    <span className="text-gray-500">Delivery Charge</span>
                  </div>

                  <span className="font-semibold text-gray-800">
                    ₹{deliveryCharge.toFixed(2)}
                  </span>
                </div>

                {/* Delivery message */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-50 border border-green-100">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />

                  <p className="text-xs text-green-700">
                    Fresh food delivered to your doorstep
                  </p>
                </div>
              </div>

              <Separator className="my-5" />

              {/* Grand Total */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                    Total Amount
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Including delivery charges
                  </p>
                </div>

                <p className="text-2xl font-black text-gray-900">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {/* =====================================================
          CHECKOUT
      ===================================================== */}
      {cartItems.length > 0 && (
        <CardFooter className="relative flex flex-col gap-3 pt-2 pb-5 px-5">
          <div className="w-full">
            <CheckoutButton
              disabled={cartItems.length === 0}
              onCheckout={onCheckout}
              isLoading={isCheckoutLoading}
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />

            <span>Secure checkout • Safe & reliable payment</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderCart;
