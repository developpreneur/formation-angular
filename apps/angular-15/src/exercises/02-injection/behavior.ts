import { expect, userEvent, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const c = within(canvasElement);
  await expect(c.getByText("Haut : Aucun")).toBeVisible();
  await expect(c.getByText("Bas : Aucun")).toBeVisible();
  await expect(c.getByText("Globale : Aucun")).toBeVisible();

  await userEvent.click(c.getByRole("button", { name: "Sélectionner Haut" }));
  await expect(c.getByText("Haut : Haut sélectionnée")).toBeVisible();
  await expect(c.getByText("Bas : Aucun")).toBeVisible();
  await expect(c.getByText("Globale : Haut sélectionnée")).toBeVisible();
  await expect(
    c.getByText("Bas voit l'état global : Haut sélectionnée"),
  ).toBeVisible();

  await userEvent.click(c.getByRole("button", { name: "Sélectionner Bas" }));
  await expect(c.getByText("Haut : Haut sélectionnée")).toBeVisible();
  await expect(c.getByText("Bas : Bas sélectionnée")).toBeVisible();
  await expect(c.getByText("Globale : Bas sélectionnée")).toBeVisible();
  await expect(
    c.getByText("Haut voit l'état global : Bas sélectionnée"),
  ).toBeVisible();
}
