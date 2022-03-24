import { Global } from "@emotion/react";
import dedent from "dedent";
import { Fragment } from "react";
import tw, { css } from "twin.macro";

import { Live } from "../components/Live";
import { MD } from "../components/Markdown";

export const metadata = {
  title: "Twin Playground",
  date: "2022-03-23T15:17:24.333Z",
};

const styles = {
  global: css`
    html,
    body,
    #__next {
      height: 100%;
    }

    #__next {
      ${tw`p-5`}
    }
  `,
  page: [
    tw`flex flex-col gap-10 p-5 min-h-full bg-gray-100 rounded shadow mx-auto`,
    css`
      max-width: 90ch;
    `,
  ],
};

const SandboxFramerMotion = () => {
  return (
    <div css={styles.page}>
      <Global styles={styles.global} />
      <SectionTwin />
    </div>
  );
};

function SectionTwin() {
  return (
    <Fragment>
      {MD`## Examples from the twin.macro readme`}

      <Live
        code={`<input tw="border hover:border-black" />`}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`const hasHover = true;
        render(<input css={[tw\`border\`, hasHover && tw\`hover:border-black\`]} />)`}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`const hasHover = true;
        const hoverStyles = css\`
          &:hover {
            border-color: black;
            ${"${tw`text-black`}"}
          }
        \`
        const Input = ({ hasHover }) => (
          <input css={[tw\`border\`, hasHover && hoverStyles]} />
        )
        render(
          <React.Fragment>
            <Input hasHover={true} placeholder={"hover true"} />
            <Input hasHover={false} placeholder={"hover false"} />
          </React.Fragment>
        )
        `}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`const Input = tw.input\`border hover:border-black\`
        render(<Input />)
        `}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`const Input = tw.input\`border hover:border-black\`
        const PurpleInput = tw(Input)\`border-purple-500\`
        render(<PurpleInput />)
        `}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`
        const StyledInput = styled.input(({ hasBorder }) => [
          \`color: black;\`,
          hasBorder && tw\`border border-purple-500\`,
        ])
        const Input = (props) => <StyledInput {...props} />
        render(
          <React.Fragment>
            <Input hasBorder={true} placeholder={"border true"} />
            <Input hasBorder={false} placeholder={"border false"} />
          </React.Fragment>
        )
        `}
        scope={{ require }}
      />

      <Live
        noInline={true}
        code={dedent`
        const StyledInput = styled.input\`
          color: black;
          ${"${({ hasBorder }) => hasBorder && tw`border border-purple-500`}"}
        \`
        const Input = (props) => <StyledInput {...props} />
        render(
          <React.Fragment>
            <Input hasBorder={true} placeholder={"border true"} />
            <Input hasBorder={false} placeholder={"border false"} />
          </React.Fragment>
        )
        `}
        scope={{ require }}
      />
    </Fragment>
  );
}

export default SandboxFramerMotion;
