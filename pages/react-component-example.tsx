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
      {MD`## Example of a React Component and Hooks

      [Take me back to the playground](./).
      `}

      <Live
        noInline={true}
        code={dedent`
          // define some constant styles
          const buttonBaseStyles = tw\`py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700\`;

          const selectedButtonBaseStyles = tw\`z-10 ring-2 ring-gray-500 bg-gray-900 text-white dark:bg-gray-700\`;

          // define some styled components
          const Button = styled.button\`
            ${"${buttonBaseStyles};"}
            ${"${({ variant }) => variant === 'left' && tw`rounded-l-lg border`}"}
            ${"${({ variant }) => variant === 'right' && tw`rounded-r-lg border`}"}
            ${"${({ variant }) => variant === 'center' && tw`border-t border-b`}"}
              ${"${({ variant, selected }) =>"}
              ${"variant === selected && selectedButtonBaseStyles}"}
          \`;
          const ButtonGroup = tw.div\`inline-flex rounded-md shadow-sm\`;

          // even define full fledged react components
          const Component = () => {
            // define a hook
            const [selectedButton, setSelectedButton] = React.useState("left");

            return (
              <ButtonGroup>
                <Button
                  variant="left"
                  selected={selectedButton}
                  onClick={() => setSelectedButton("left")}>
                  Profile
                </Button>
                <Button
                  variant="center"
                  selected={selectedButton}
                  onClick={() => setSelectedButton("center")}>
                  Settings
                </Button>
                <Button
                  variant="right"
                  selected={selectedButton}
                  onClick={() => setSelectedButton("right")}>
                  Download
                </Button>
              </ButtonGroup>
            );
          };

          render(<Component/>)
        `}
      />
    </Fragment>
  );
}

export default Home;
