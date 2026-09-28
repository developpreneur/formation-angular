import { expect, userEvent, waitFor, within } from "storybook/test";

export async function verifyEditProfile({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const eagerName = canvas.getByTestId("eager-name");
  const onPushName = canvas.getByTestId("onpush-name");

  await expect(eagerName).toHaveTextContent("Eager : Ada");
  await expect(onPushName).toHaveTextContent("OnPush : Ada");

  await userEvent.click(
    canvas.getByRole("button", { name: "Changer le profil" }),
  );
  await expect(eagerName).toHaveTextContent("Eager : Katherine");
  await expect(onPushName).toHaveTextContent("OnPush : Katherine");
}

export async function verifyUpdatedMessage({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByRole("button", { name: "Charger le résultat" }),
  );
  await waitFor(() =>
    expect(canvas.getByRole("status")).toHaveTextContent("Résultat reçu"),
  );
}

export async function verifyAsyncPipe({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(canvas.getByRole("status")).toHaveTextContent("Réponse reçue"),
  );
}
