import dedent from "dedent";
import { Fragment } from "react";

import { Live } from "../components/Live";
import { MD } from "../components/Markdown";

export const metadata = {
  title: "Twin Playground",
  date: "2022-03-23T15:17:24.333Z",
};

function Home() {
  return (
    <Fragment>
      {MD`## Twin.Macro Readme Examples

      These are all of the examples from the
      [twin.macro](https://github.com/ben-rogerson/twin.macro) readme, slightly
      modified to work with
      [react-live](https://github.com/FormidableLabs/react-live).

      [Take me back to the playground](./).
      `}

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

export default Home;
