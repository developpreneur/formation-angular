import { expect, userEvent, within } from "storybook/test";
import { MATCHES_ERROR_MESSAGE } from "./shared";

export async function verifyScoreboardBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const homeScore = canvas.getByLabelText("Score de Lyon Métropole");
  const awayScore = canvas.getByLabelText("Score de Paris Nord");
  const scoreTab = canvas.getByRole("tab", { name: "Modifier le score" });
  const matchesTab = canvas.getByRole("tab", { name: "Matchs en cours" });

  await expect(scoreTab).toHaveAttribute("aria-selected", "true");
  await expect(homeScore).toHaveTextContent("0");
  await expect(awayScore).toHaveTextContent("0");

  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter 2 points à Lyon Métropole" }),
  );
  await userEvent.click(
    canvas.getByRole("button", { name: "Ajouter 3 points à Paris Nord" }),
  );
  await expect(homeScore).toHaveTextContent("2");
  await expect(awayScore).toHaveTextContent("3");

  await userEvent.click(matchesTab);
  await expect(matchesTab).toHaveAttribute("aria-selected", "true");
  await expect(canvas.getByText("Chargement des matchs…")).toBeVisible();

  const firstMatch = await canvas.findByRole("listitem", {
    name: "Monaco contre Lyon",
  });
  await expect(firstMatch).toHaveTextContent("81 - 77");

  const refreshButton = canvas.getByRole("button", {
    name: "Actualiser les matchs",
  });
  await userEvent.click(refreshButton);
  await expect(canvas.getByText("Chargement des matchs…")).toBeVisible();
  await userEvent.click(refreshButton);
  await expect(await canvas.findByRole("alert")).toHaveTextContent(
    MATCHES_ERROR_MESSAGE,
  );
  await expect(firstMatch).toHaveTextContent("81 - 77");

  await userEvent.click(refreshButton);
  await expect(await canvas.findByText("83 - 77")).toBeVisible();
  await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();

  await userEvent.click(scoreTab);
  await expect(scoreTab).toHaveAttribute("aria-selected", "true");
  await expect(homeScore).toHaveTextContent("2");
  await expect(awayScore).toHaveTextContent("3");
}
