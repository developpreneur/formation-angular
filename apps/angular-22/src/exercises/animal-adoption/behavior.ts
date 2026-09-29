import { expect, userEvent, within } from "storybook/test";

export async function verifyAnimalAdoptionBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByRole("heading", { name: "Animaux à adopter", level: 1 }),
  ).toBeVisible();
  await expect(canvas.getByText("Chargement des animaux…")).toBeVisible();

  const miloCard = await canvas.findByRole("article", { name: "Milo, Chien" });
  await expect(miloCard).toBeVisible();
  await expect(
    await canvas.findByRole("article", { name: "Nala, Chat" }),
  ).toBeVisible();

  const speciesFilter = canvas.getByRole("combobox", {
    name: "Filtrer par espèce",
  });
  await userEvent.selectOptions(speciesFilter, "chat");
  await expect(
    canvas.getByRole("heading", { name: "Les chats", level: 2 }),
  ).toBeVisible();
  await expect(
    canvas.getByRole("article", { name: "Nala, Chat" }),
  ).toBeVisible();
  await expect(
    canvas.queryByRole("article", { name: "Milo, Chien" }),
  ).not.toBeInTheDocument();
  await userEvent.selectOptions(speciesFilter, "all");

  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Milo à la sélection" }),
  );
  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter Nala à la sélection" }),
  );
  const selectionStatus = canvas.getByRole("status", {
    name: "Animaux dans votre sélection",
  });
  await expect(selectionStatus).toHaveTextContent(
    "2 animaux dans votre sélection",
  );

  await userEvent.click(
    canvas.getByRole("button", { name: "Effacer la sélection" }),
  );
  await expect(selectionStatus).toHaveTextContent(
    "0 animaux dans votre sélection",
  );
  await expect(
    canvas.getByRole("button", { name: "Effacer la sélection" }),
  ).toBeDisabled();

  const adoptionButton = canvas.getByRole("button", {
    name: "Demander l'adoption de Milo",
  });
  await userEvent.click(adoptionButton);
  const confirmation = await canvas.findByRole("status", {
    name: "Confirmation de demande",
  });
  await expect(confirmation).toHaveTextContent(
    "Votre demande a été prise en compte pour Milo.",
  );
  await expect(adoptionButton).toBeEnabled();
  await userEvent.click(
    canvas.getByRole("button", { name: "Fermer la confirmation" }),
  );
  await expect(
    canvas.queryByRole("status", { name: "Confirmation de demande" }),
  ).not.toBeInTheDocument();
}
