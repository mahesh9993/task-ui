import _ from "lodash";

export function paginate(items, pageNumbr, pageSize) {
  const startIndex = (pageNumbr - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
