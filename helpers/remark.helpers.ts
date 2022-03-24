import rehypePrism from "@mapbox/rehype-prism";
import remarkGfm from "remark-gfm";
import { PluggableList } from "unified";

/**
 * remark plugins to use for parsing markdown
 */
export const defaultRemarkPlugins: PluggableList = [
  // add github flavored markdown support (i.e. tables, footnotes, etc.)
  remarkGfm,
];

/**
 * rehype plugins to use for rendering markdown as html
 */
export const defaultRehypePlugins: PluggableList = [
  // add syntax highlighting. Theme included in styles folder as standalone css
  // file.
  rehypePrism,
];
