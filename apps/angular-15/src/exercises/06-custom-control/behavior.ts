import { expect, userEvent, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const delivery = canvas.getByRole("button", { name: "Livraison" });
  const pickup = canvas.getByRole("button", { name: "Retrait en magasin" });

  await expect(delivery).toHaveAttribute("aria-pressed", "true");
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : delivery");

  await userEvent.click(pickup);
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : pickup");
  await expect(canvas.getByText("Modifié : true")).toBeVisible();
  await expect(canvas.getByText("Touché : false")).toBeVisible();

  await userEvent.click(
    canvas.getByRole("button", { name: "Activer ou désactiver" }),
  );
  await expect(canvas.getByText("Touché : true")).toBeVisible();
  await expect(pickup).toBeDisabled();

  await userEvent.click(
    canvas.getByRole("button", { name: "Activer ou désactiver" }),
  );
  await expect(pickup).toBeEnabled();

  await userEvent.click(
    canvas.getByRole("button", {
      name: "Choisir le point relais depuis le parent",
    }),
  );
  await expect(
    canvas.getByRole("button", { name: "Point relais" }),
  ).toHaveAttribute("aria-pressed", "true");
}
