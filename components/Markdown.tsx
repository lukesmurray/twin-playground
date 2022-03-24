import dedent from "dedent";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";

import { defaultMDXComponents } from "../components/defaultMDXComponents";
import {
  defaultRehypePlugins,
  defaultRemarkPlugins,
} from "../helpers/remark.helpers";

/**
 * Render markdown content
 *
 * You can pass the markdown as a prop
 *
 *      <Markdown children={`# Markdown String`}/>
 *
 * Or as a string
 *
 *      <Markdown>${`# Markdown String`}</Markdown>
 *
 * However notice how the string is wrapped in backticks.
 * Without backticks the string would be reformatted, potentially losing
 * markdown semantics.
 */
export function Markdown({ children }: { children: string }) {
  const Wrapper = defaultMDXComponents.wrapper || Fragment;
  return (
    <Wrapper>
      <ReactMarkdown
        remarkPlugins={defaultRemarkPlugins}
        rehypePlugins={defaultRehypePlugins}
        components={{ ...(defaultMDXComponents as any) }}>
        {children}
      </ReactMarkdown>
    </Wrapper>
  );
}

/**
 * Helper function to render markdown content
 *
 * You can pass the markdown as a string.
 *
 *      {MD`
 *      # Markdown String
 *
 *      More markdown content
 *      `}
 *
 * Extra indentation in the string is removed.
 */
export function MD(strings: TemplateStringsArray, ...values: any[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += `${string}${values[i] ?? ""}`;
  });
  return <Markdown>{dedent(str)}</Markdown>;
}
