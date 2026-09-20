import { expect, userEvent, waitFor, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("textbox", { name: "Prénom" });
  const message = canvas.getByRole("status");
  await expect(message).toHaveTextContent(/^Bonjour !$/);
  await userEvent.type(input, "Ada");
  await waitFor(() => expect(message).toHaveTextContent(/^Bonjour Ada !$/));
  await userEvent.clear(input);
  await userEvent.type(input, "Linus");
  await waitFor(() => expect(message).toHaveTextContent(/^Bonjour Linus !$/));
  await userEvent.clear(input);
  await userEvent.type(input, "   ");
  await waitFor(() => expect(message).toHaveTextContent(/^Bonjour !$/));
  await userEvent.clear(input);
}
