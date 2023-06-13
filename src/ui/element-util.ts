export function createDivElement(classes: string) : HTMLDivElement {
  let elm = document.createElement("div");
  elm.setAttribute("class", classes);
  return elm;
}
