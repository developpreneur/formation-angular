import { expect, userEvent, waitFor, within } from "storybook/test";
import { SEARCH_API_DELAY_MS, SEARCH_DEBOUNCE_MS } from "./shared";

const wait = (duration: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

export async function verifyReactiveSearchBehavior({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const canvas = within(canvasElement);
  const searchbox = () =>
    canvas.getByRole("searchbox", {
      name: "Rechercher une formation",
    }) as HTMLInputElement;
  const waitForStatus = async (text: string): Promise<void> => {
    await waitFor(
      () => expect(canvas.getByRole("status")).toHaveTextContent(text),
      {
        timeout: SEARCH_DEBOUNCE_MS + SEARCH_API_DELAY_MS + 1000,
      },
    );
  };
  const enterQuery = async (query: string): Promise<void> => {
    await userEvent.click(searchbox());
    await userEvent.paste(query);
  };

  await expect(
    canvas.getByRole("heading", { name: "Explorer les formations" }),
  ).toBeVisible();
  await expect(canvas.getByRole("status")).toHaveTextContent(
    "Saisissez un thème",
  );

  await enterQuery("angular");
  await expect(canvas.getByRole("status")).toHaveTextContent(
    "Saisissez un thème",
  );
  await waitForStatus("Recherche en cours pour « angular »");
  await waitForStatus("2 résultats trouvés pour « angular ».");
  await expect(
    canvas.getByRole("heading", { name: "Angular avancé" }),
  ).toBeVisible();
  await expect(
    canvas.queryByRole("heading", { name: "RxJS avancé" }),
  ).not.toBeInTheDocument();

  const element = searchbox();
  await userEvent.click(element);
  element.setSelectionRange(0, element.value.length);
  await userEvent.paste(" ANGULAR ");
  await expect(element).toHaveValue(" ANGULAR ");
  await wait(SEARCH_DEBOUNCE_MS + 100);
  await expect(canvas.getByRole("status")).toHaveTextContent(
    "2 résultats trouvés pour « angular ».",
  );

  await userEvent.clear(searchbox());
  await enterQuery("inconnu");
  await waitForStatus("Recherche en cours pour « inconnu »");
  await waitForStatus("Aucun résultat pour « inconnu ».");

  await userEvent.clear(searchbox());
  await enterQuery("typescript");
  await waitForStatus("Recherche en cours pour « typescript »");
  await enterQuery("typescript");
  await waitForStatus("Recherche en cours pour « typescript »");
  await userEvent.clear(searchbox());
  await expect(canvas.getByRole("status")).toHaveTextContent(
    "Saisissez un thème",
  );
  await expect(
    canvas.queryByRole("heading", { name: "TypeScript pour le web" }),
  ).not.toBeInTheDocument();

  await enterQuery("erreur");
  await waitForStatus("Recherche en cours pour « erreur »");
  await waitFor(() =>
    expect(canvas.getByRole("alert")).toHaveTextContent(
      "La recherche a échoué",
    ),
  );

  await userEvent.clear(searchbox());
  await waitForStatus("Saisissez un thème");
  await enterQuery("rxjs");
  await expect(searchbox()).toHaveValue("rxjs");
  await waitForStatus("Recherche en cours pour « rxjs »");
  await waitForStatus("1 résultat trouvé pour « rxjs ».");
  await userEvent.clear(searchbox());
}
