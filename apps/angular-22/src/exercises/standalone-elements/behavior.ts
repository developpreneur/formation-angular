import { expect, within } from "storybook/test";

export async function verifyStandaloneMigration({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByRole("heading", { name: "Liste des formations", level: 1 }),
  ).toBeVisible();
  await expect(
    canvas.getByRole("heading", { name: "Formation Angular avancé", level: 2 }),
  ).toBeVisible();
  await expect(canvas.getByRole("article")).toBeVisible();
  await expect(canvas.getByRole("status", { name: "Legacy" })).toBeVisible();
  await expect(canvas.getByText("Durée de l'atelier : 45 min")).toBeVisible();
  await expect(canvas.getByText("Durée : 1 h")).toBeVisible();
  await expect(
    canvas.getByText("Durée du programme : 1 h 30 min"),
  ).toBeVisible();

  const inPersonSeats = canvas.getByRole("status", {
    name: "Places restantes en présentiel : 2",
  });
  const onlineSeats = canvas.getByRole("status", {
    name: "Places restantes en ligne : 8",
  });

  await expect(inPersonSeats).toHaveTextContent(
    "2 places restantes en présentiel",
  );
  await expect(inPersonSeats).toHaveClass("limited-seats");
  await expect(onlineSeats).toHaveTextContent("8 places restantes en ligne");
  await expect(onlineSeats).not.toHaveClass("limited-seats");
}
