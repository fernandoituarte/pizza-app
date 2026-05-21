import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { CartItem } from "@/features/cart/types";
import { Extra } from "@/features/products/types";

interface Props {
  extras: Extra[];
  selectedExtras: CartItem["extras"];
  setSelectedExtras: React.Dispatch<React.SetStateAction<CartItem["extras"]>>;
}

export function ExtrasCheckboxGroup({
  extras,
  selectedExtras,
  setSelectedExtras,
}: Props) {

  return (
    <FieldSet>
      <FieldLegend variant="label" className="w-full border-b-2 pb-1">
        Extras:
      </FieldLegend>

      <FieldGroup className="gap-3">
        {extras.map((extra) => {
          const checked = selectedExtras.some((e) => e.extraId === extra.id);

          return (
            <Field
              key={extra.id}
              orientation="horizontal"
              className="flex justify-between w-full"
            >
              <div className="flex gap-3">
                <Checkbox
                  id={extra.id}
                  checked={checked}
                  onCheckedChange={(isChecked) => {
                    setSelectedExtras((prev) => {
                      const exists = prev.some((e) => e.extraId === extra.id);

                      if (isChecked && !exists) {
                        return [...prev, { extraId: extra.id, name: extra.name, price: extra.price, quantity: 1 }];
                      }

                      if (!isChecked && exists) {
                        return prev.filter((e) => e.extraId !== extra.id);
                      }

                      return prev;
                    });
                  }}
                />

                <FieldLabel htmlFor={extra.id} className="font-normal">
                  {extra.name}
                </FieldLabel>
              </div>

              {extra.price > 0 && (
                <p className="font-semibold">+{extra.price}€</p>
              )}
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
