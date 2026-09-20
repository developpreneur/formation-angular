import { expect, userEvent, waitFor, within } from "@storybook/test";

export async function verifyBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const displayedProfile = canvas.getByTestId("dynamicProfileName");

  await waitFor(() =>
    expect(displayedProfile).toHaveTextContent(
      "Profile interne (label projeté) : Ada",
    ),
  );

  await userEvent.click(
    canvas.getByRole("button", { name: "Renommer en Grace" }),
  );

  await expect(canvas.getByText("Profil projeté : Grace")).toBeInTheDocument();
  await waitFor(() =>
    expect(displayedProfile).toHaveTextContent(
      "Profile interne (label projeté) : Grace",
    ),
  );
}
