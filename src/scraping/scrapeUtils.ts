import axios, { AxiosError } from "axios";
import Optional from "../util/Optional";
import { JSDOM } from "jsdom";

export function fetchSite(
  url: string,
  headers: { [k: string]: string }
): Promise<Optional<string>> {
  const html: Promise<Optional<string>> = axios
    .request({
      url: url,
      method: "get",
      headers: { ...headers /*"User-Agent": "YuGiOh-Referee"*/ },
    })
    .then((res) => Optional.ofNullable(res.data))
    .catch((err: AxiosError) => {
      console.error(`There was an error with:`, err.config?.url);
      console.error(err.toJSON());
      return Optional.empty<string>();
    });

  return html;
}

/**
 * Returns an document of a site for a given url.
 *
 * If the url can't be reached or returns nothing. An empty document is returned!
 *
 * @param url The url from which the document should get retrived
 * @param headers The headers to send whilest requesting the site
 */
export async function getDocumentFromUrl(
  url: string,
  headers: { [k: string]: string }
): Promise<Optional<Document>> {
  const htmlData: Optional<string> = await fetchSite(url, headers);
  if (htmlData.isEmpty) return Optional.empty();
  let dom = new JSDOM(htmlData.value);
  return Optional.of(dom.window.document);
}

export function nodeListToArray<T extends Node>(
  nodeList: NodeListOf<T>
): Array<T> {
  const array = new Array<T>();
  for (let entry of nodeList) {
    array.push(entry);
  }

  return array;
}
