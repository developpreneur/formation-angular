import { expect, userEvent, waitFor, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const c = within(canvasElement);
  await userEvent.click(c.getByRole("button", { name: "Ajouter une ligne" }));
  await expect(c.getByLabelText("Libellé 1")).toBeVisible();
  await userEvent.click(c.getByRole("button", { name: "Ajouter une ligne" }));
  await userEvent.type(c.getByLabelText("Libellé 1"), "VPN");
  await userEvent.type(c.getByLabelText("Libellé 2"), "Écran");
  await expect(c.getByLabelText("Identifiant 2")).toBeDisabled();
  await userEvent.click(
    c.getByRole("button", { name: "Supprimer la ligne 1" }),
  );
  await userEvent.click(c.getByRole("button", { name: "Envoyer les lignes" }));
  await expect(
    JSON.parse(c.getByLabelText("Données envoyées").textContent ?? ""),
  ).toEqual({ lines: [{ id: 101, title: "Écran" }] });
  await userEvent.click(c.getByRole("button", { name: "Ajouter une ligne" }));
  await userEvent.type(c.getByLabelText("Libellé 2"), "Clavier");
  await userEvent.click(c.getByRole("button", { name: "Envoyer les lignes" }));
  await expect(
    JSON.parse(c.getByLabelText("Données envoyées").textContent ?? ""),
  ).toEqual({
    lines: [
      { id: 101, title: "Écran" },
      { id: 102, title: "Clavier" },
    ],
  });
}
