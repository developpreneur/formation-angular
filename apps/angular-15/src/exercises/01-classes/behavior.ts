import { expect, userEvent, waitFor, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const c = within(canvasElement);
  await expect(c.getByRole("status")).toHaveTextContent(/^Ouverte$/);
  await userEvent.click(c.getByRole("button", { name: "Archiver" }));
  await expect(c.getByText("Actions émises : 1")).toBeVisible();
  await userEvent.selectOptions(c.getByLabelText("Statut"), "archived");
  await expect(c.getByRole("status")).toHaveTextContent(/^Archivée$/);
  const button = c.getByRole("button", { name: "Archiver" });
  await expect(button).toBeDisabled();
  await userEvent.click(button);
  await expect(c.getByText("Actions émises : 1")).toBeVisible();
  await userEvent.selectOptions(c.getByLabelText("Statut"), "unknown");
  await expect(c.getByRole("status")).toHaveTextContent(/^Statut inconnu$/);
  await expect(button).toBeEnabled();
  await userEvent.selectOptions(c.getByLabelText("Statut"), "closed");
  await expect(c.getByRole("status")).toHaveTextContent(/^Clôturée$/);
}
