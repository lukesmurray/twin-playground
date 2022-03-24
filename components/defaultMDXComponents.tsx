import { MDXComponents } from "mdx/types";
import tw, { styled } from "twin.macro";

const Wrapper = styled.div`
  ${tw`prose`}
`;

const A = styled.a``;

const Strong = styled.strong``;

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const H4 = styled.h4``;

const P = styled.p``;

const BlockQuote = styled.blockquote``;

const Img = styled.img``;

const Video = styled.video``;

const Figure = styled.figure``;

const Figcaption = styled.figcaption``;

const Code = styled.code``;

const Pre = styled.pre``;

const Ol = styled.ol``;

const Ul = styled.ul``;

const Li = styled.li``;

const Hr = styled.hr``;

export const defaultMDXComponents = {
  wrapper: Wrapper,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  strong: Strong,
  blockquote: BlockQuote,
  img: Img,
  video: Video,
  figure: Figure,
  figcaption: Figcaption,
  code: Code,
  pre: Pre,
  ol: Ol,
  ul: Ul,
  li: Li,
  hr: Hr,
} as MDXComponents;

export { Wrapper as ProseWrapper };
