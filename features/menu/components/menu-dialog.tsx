"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Product } from "@/features/products/types";
import { IngredientsCheckboxGroup } from "./ingredients-checkbox-group";
import { ExtrasCheckboxGroup } from "./extras-checkbox-group";
import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import { addItem } from "@/features/cart/store/cart.slice";
import { useState } from "react";
import { CartItem } from "@/features/cart/types";

interface Props {
  product: Product;
}

export function MenuDialog({ product }: Props) {
  const { ingredients, extras, description, name } = product;
  const dispatch = useAppDispatch();

  const [selectedExtras, setSelectedExtras] = useState<CartItem["extras"]>([])
  const [removedIngredients, setRemovedIngredients] = useState<CartItem["removedIngredients"]>([])


  const addToCart = () => {
    dispatch(addItem({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      extras: selectedExtras,
      removedIngredients: removedIngredients,
      quantity: 1,
    }));
    setSelectedExtras([]);
    setRemovedIngredients([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Customize</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {ingredients && <IngredientsCheckboxGroup ingredients={ingredients} removedIngredients={removedIngredients} setRemovedIngredients={setRemovedIngredients} />}
        {extras && <ExtrasCheckboxGroup selectedExtras={selectedExtras} setSelectedExtras={setSelectedExtras} extras={extras} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={addToCart}>
            Ajouter au pannier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
