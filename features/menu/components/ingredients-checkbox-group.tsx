import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { CartItem } from "@/features/cart/types";
import { Ingredient } from "@/features/products/types";

export type RemovedIngredient = {
  ingredientId: string;
  ingredientName: string;
};

interface Props {
  ingredients: Ingredient[];
  removedIngredients: RemovedIngredient[];
  setRemovedIngredients: React.Dispatch<
    React.SetStateAction<CartItem["removedIngredients"]>
  >;
}

export function IngredientsCheckboxGroup({
  ingredients,
  removedIngredients,
  setRemovedIngredients,
}: Props) {

  return (
    <FieldSet>
      <FieldLegend variant="label" className="w-full border-b-2 pb-1">
        Ingredients a retirer:
      </FieldLegend>

      <FieldGroup className="gap-3">
        {ingredients.map((ingredient) => {
          const checked = removedIngredients.some(
            (ri) => ri.ingredientId === ingredient.id,
          );

          return (
            <Field key={ingredient.id} orientation="horizontal">
              <Checkbox
                id={ingredient.id}
                checked={checked}
                onCheckedChange={(isChecked) => {
                  setRemovedIngredients((prev) => {
                    const exists = prev.some(
                      (ri) => ri.ingredientId === ingredient.id,
                    );

                    if (isChecked && !exists) {
                      return [
                        ...prev,
                        {
                          ingredientId: ingredient.id,
                          ingredientName: ingredient.name,
                        },
                      ];
                    }

                    if (!isChecked && exists) {
                      return prev.filter(
                        (ri) => ri.ingredientId !== ingredient.id,
                      );
                    }

                    return prev;
                  });
                }}
              />

              <FieldLabel htmlFor={ingredient.id} className="font-normal">
                {ingredient.name}
              </FieldLabel>
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
