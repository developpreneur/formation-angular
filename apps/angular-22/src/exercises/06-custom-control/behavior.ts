import { expect, userEvent, waitFor, within } from "storybook/test";

export async function verifyDeliveryMethodBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const delivery = canvas.getByRole("button", { name: "Livraison" });
  const pickup = canvas.getByRole("button", { name: "Retrait en magasin" });
  const relay = canvas.getByRole("button", { name: "Point relais" });
  const waitForStatus = async (status: string): Promise<void> => {
    await waitFor(() =>
      expect(canvas.getByText(`Statut : ${status}`)).toBeVisible(),
    );
  };

  await waitForStatus("VALID");
  await expect(delivery).toHaveAttribute("aria-pressed", "true");
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : delivery");
  await expect(canvas.getByText("Notifications : 0")).toBeVisible();

  await userEvent.click(pickup);
  await expect(pickup).toHaveAttribute("aria-pressed", "true");
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : pickup");
  await expect(canvas.getByText("Modifié : true")).toBeVisible();
  await expect(canvas.getByText("Touché : false")).toBeVisible();
  await expect(canvas.getByText("Notifications : 1")).toBeVisible();
  await waitForStatus("VALID");
  await expect(canvas.getByText("Invalide : false")).toBeVisible();

  await userEvent.click(relay);
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : relay");
  await waitForStatus("INVALID");
  await expect(canvas.getByText("Invalide : true")).toBeVisible();
  await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
  await expect(canvas.getByText("Touché : false")).toBeVisible();
  await expect(canvas.getByText("Notifications : 2")).toBeVisible();

  await userEvent.tab();
  await expect(canvas.getByText("Touché : true")).toBeVisible();
  await expect(canvas.getByText("Invalide : true")).toBeVisible();
  await expect(canvas.getByRole("alert")).toHaveTextContent(
    "Ce mode de remise n'est pas autorisé pour cette commande.",
  );

  await userEvent.click(canvas.getByRole("button", { name: "Désactiver" }));
  await expect(relay).toBeDisabled();

  await userEvent.click(canvas.getByRole("button", { name: "Activer" }));
  await expect(relay).toBeEnabled();
  await waitForStatus("INVALID");

  await userEvent.click(
    canvas.getByRole("button", {
      name: "Choisir la livraison depuis le parent",
    }),
  );
  await expect(delivery).toHaveAttribute("aria-pressed", "true");
  await waitForStatus("VALID");
  await expect(canvas.getByText("Invalide : false")).toBeVisible();
  await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();

  await userEvent.click(canvas.getByRole("button", { name: "Réinitialiser" }));
  await expect(canvas.getByRole("status")).toHaveTextContent("Mode : aucune");
  await waitForStatus("INVALID");
  await expect(canvas.getByText("Invalide : true")).toBeVisible();
  await expect(canvas.getByText("Touché : false")).toBeVisible();
  await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();

  for (let tab = 0; tab < 4; tab++) {
    await userEvent.tab({ shift: true });
  }
  await userEvent.tab();
  await expect(canvas.getByText("Touché : true")).toBeVisible();
  await expect(canvas.getByText("Invalide : true")).toBeVisible();
  await expect(canvas.getByRole("alert")).toHaveTextContent(
    "Choisissez un mode de remise.",
  );
}
