import { expect, userEvent, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const lamp = canvas.getByTestId("product-lamp");
  const chair = canvas.getByTestId("product-chair");

  await expect(lamp).toHaveTextContent("Mis en vente le 2 mars 2026");
  await expect(chair).toHaveTextContent(/Prix : .*1[\s\u202f]250,00\s?€/);
  await expect(chair).toHaveTextContent("Vendu");

  await userEvent.click(
    canvas.getByRole("checkbox", { name: "Masquer les produits vendus" }),
  );
  await expect(canvas.queryByTestId("product-chair")).not.toBeInTheDocument();

  await userEvent.click(
    canvas.getByRole("checkbox", { name: "Masquer les produits vendus" }),
  );
  await userEvent.click(within(lamp).getByRole("button", { name: "Comparer" }));
  await expect(lamp).toHaveTextContent("À comparer");

  await userEvent.click(
    canvas.getByRole("button", { name: "Rafraichir les annonces" }),
  );

  await expect(canvas.getByTestId("product-lamp")).toHaveTextContent(
    "À comparer",
  );
}
