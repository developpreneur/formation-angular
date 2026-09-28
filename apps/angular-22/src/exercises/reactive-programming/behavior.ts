import { expect, userEvent, within } from "storybook/test";

export async function verifyShopBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const cart = within(canvas.getByRole("region", { name: "Votre panier" }));
  const count = () => canvas.getByText(/Panier : \d+ article/);
  const total = () => cart.getByLabelText("Total du panier");

  await expect(cart.getByText("Votre panier est vide.")).toBeVisible();
  await expect(count()).toHaveTextContent("0 article");
  await expect(total()).toHaveTextContent("0 €");
  await expect(
    cart.getByRole("button", { name: "Vider le panier" }),
  ).toBeDisabled();

  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Carnet quadrillé" }),
  );
  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Carnet quadrillé" }),
  );
  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Lampe de bureau" }),
  );
  await expect(count()).toHaveTextContent("3 articles");
  await expect(
    cart.getByLabelText("Quantité de Carnet quadrillé"),
  ).toHaveTextContent("2");
  await expect(total()).toHaveTextContent("78 €");
  await expect(
    cart.queryByText("Votre panier est vide."),
  ).not.toBeInTheDocument();

  await userEvent.click(
    cart.getByRole("button", { name: "Augmenter Lampe de bureau" }),
  );
  await expect(count()).toHaveTextContent("4 articles");
  await expect(total()).toHaveTextContent("120 €");

  await userEvent.click(
    cart.getByRole("button", { name: "Diminuer Carnet quadrillé" }),
  );
  await expect(
    cart.getByLabelText("Quantité de Carnet quadrillé"),
  ).toHaveTextContent("1");
  await expect(total()).toHaveTextContent("102 €");
  await userEvent.click(
    cart.getByRole("button", { name: "Diminuer Carnet quadrillé" }),
  );
  await expect(
    cart.queryByLabelText("Quantité de Carnet quadrillé"),
  ).not.toBeInTheDocument();
  await expect(count()).toHaveTextContent("2 articles");
  await expect(total()).toHaveTextContent("84 €");

  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Tasse en céramique" }),
  );
  await userEvent.click(
    cart.getByRole("button", { name: "Retirer Lampe de bureau" }),
  );
  await expect(count()).toHaveTextContent("1 article");
  await expect(total()).toHaveTextContent("24 €");

  await userEvent.click(cart.getByRole("button", { name: "Vider le panier" }));
  await expect(cart.getByText("Votre panier est vide.")).toBeVisible();
  await expect(count()).toHaveTextContent("0 article");
  await expect(total()).toHaveTextContent("0 €");
  await expect(
    cart.getByRole("button", { name: "Vider le panier" }),
  ).toBeDisabled();
  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Lampe de bureau" }),
  );
  await expect(count()).toHaveTextContent("1 article");
  await expect(total()).toHaveTextContent("42 €");
}
