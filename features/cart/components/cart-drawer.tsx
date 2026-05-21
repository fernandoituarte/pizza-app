"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";
import { ordersService } from "@/features/orders/services/orders.service";
import {
  calculateItemTotal,
  selectCartItemsCount,
  selectCartTotal,
} from "@/features/cart/store/cart.selectors";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: Props) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartItemsCount);

  const clearCart = () => {
    dispatch({ type: "cart/clearCart" });
  };

  const sendToCheckout = async () => {
    const orderData = {
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        extras: item.extras,
        removedIngredients: item.removedIngredients,
      })),
    };
    try {
      const order = await ordersService.createOrder(orderData);
      const paymentSessionUrl = await ordersService.createPaymentSession(order);

      window.location.href = paymentSessionUrl.checkoutUrl;
    } catch (error) {
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Mon panier</SheetTitle>
          <SheetDescription>
            Vérifiez vos articles avant de passer à la caisse.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 mt-4 p-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Votre panier est vide.
            </p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {item.quantity} x {item.name}
                </p>
                {item.removedIngredients.length > 0 && (
                  <ul className="ml-4 text-sm text-muted-foreground">
                    {item.removedIngredients.map((ing) => (
                      <li key={ing.ingredientId}>
                        - Sans {ing.ingredientName}
                      </li>
                    ))}
                  </ul>
                )}
                {item.extras.length > 0 && (
                  <ul className="ml-4 text-sm text-muted-foreground">
                    {item.extras.map((extra) => (
                      <li key={extra.extraId}>
                        {extra.quantity} x {extra.name} (+{extra.price}€)
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="font-medium">
                {calculateItemTotal(item).toFixed(2)}€
              </p>
            </div>
          ))}
        </div>

        <SheetFooter>
          <p className="text-sm font-medium">
            {count} articles - {total.toFixed(2)}€
          </p>
          <Button type="button" onClick={sendToCheckout}>
            Passer commande
          </Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={clearCart}>
              Vider le panier
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// return (
//   <Sheet open={open} onOpenChange={onOpenChange}>
//     <SheetContent>
//       <SheetHeader>
//         <SheetTitle>Edit profile</SheetTitle>
//         <SheetDescription>
//           Make changes to your profile here. Click save when you&apos;re done.
//         </SheetDescription>
//         {items.map((item) => (
//           <div className="flex w-full justify-between" key={item.id}>
//             <p>
//               <span>{item.quantity} x </span>
//               {item.name}
//             </p>
//             <p>{item.unitPrice}€</p>
//           </div>
//         ))}
//       </SheetHeader>

//       <SheetFooter>
//         <p className="text-sm font-medium">
//           {count} articles - {total.toFixed(2)}€
//         </p>
//         <Button type="submit">Save changes</Button>
//         <SheetClose asChild>
//           <Button variant="outline" onClick={clearCart}>
//             Vider le panier
//           </Button>
//         </SheetClose>
//       </SheetFooter>
//     </SheetContent>
//   </Sheet>
// );
