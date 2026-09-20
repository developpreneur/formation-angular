import { expect, userEvent, waitFor, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
  args,
}: {
  canvasElement: HTMLElement;
  args: Record<string, unknown>;
}): Promise<void> {
  const c = within(canvasElement);
  await expect(c.queryAllByRole("alert")).toHaveLength(0);
  await userEvent.click(c.getByRole("button", { name: "Envoyer" }));
  await expect(c.getByText("Adresse électronique invalide")).toBeVisible();
  await expect(args["submitted"]).not.toHaveBeenCalled();
  await userEvent.type(c.getByLabelText("Adresse électronique"), "invalide");
  await userEvent.type(c.getByLabelText("Date de début"), "2026-05-20");
  await userEvent.type(c.getByLabelText("Date de fin"), "2026-05-10");
  await userEvent.click(c.getByRole("button", { name: "Envoyer" }));
  await expect(c.getByText("La fin doit suivre le début")).toBeVisible();
  await expect(args["submitted"]).not.toHaveBeenCalled();
  await userEvent.clear(c.getByLabelText("Adresse électronique"));
  await userEvent.type(
    c.getByLabelText("Adresse électronique"),
    "ada@example.test",
  );
  await userEvent.clear(c.getByLabelText("Date de fin"));
  await userEvent.type(c.getByLabelText("Date de fin"), "2026-05-25");
  await userEvent.click(c.getByRole("button", { name: "Envoyer" }));
  await expect(args["submitted"]).toHaveBeenCalledTimes(1);
  await expect(args["submitted"]).toHaveBeenCalledWith({
    email: "ada@example.test",
    start: "2026-05-20",
    end: "2026-05-25",
  });
  await expect(c.queryAllByRole("alert")).toHaveLength(0);
}
