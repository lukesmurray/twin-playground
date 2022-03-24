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
      {MD`# Twin.Macro Playground

      The ✨first✨ online playground for [Twin.macro](https://github.com/ben-rogerson/twin.macro/). Check out the FAQ below for details.

      Created by [Luke Murray](https://twitter.com/lukesmurray).
      `}

      {MD`## Inline Playground

      `}

      <Live
        code={dedent`<button
        tw="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Purple to Pink
        </button>`}
      />

      {MD`## Multi-Line Playground

      `}

      <Live
        noInline={true}
        code={dedent`
        const buttonBaseStyles = tw\`py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700\`;

        const Button = styled.button\`
          ${"${buttonBaseStyles}"};
          ${'${({ variant }) => variant === "left" && tw`rounded-l-lg border`}'}
          ${'${({ variant }) => variant === "right" && tw`rounded-r-lg border`}'}
          ${'${({ variant }) => variant === "center" && tw`border-t border-b`}'}
        \`

        const ButtonGroup = tw.div\`inline-flex rounded-md shadow-sm\`;

        // note the render function. you must call this to render a component
        render(
          <ButtonGroup>
            <Button variant="left">Profile</Button>
            <Button variant="center">Settings</Button>
            <Button variant="right">Download</Button>
          </ButtonGroup>
        )
      `}
      />

      {MD`
      ## FAQ

      ### What does Inline and Multi-Line mean?

      **Inline**

      Inline mode renders simple code that can be wrapped in a return statement.

      ~~~tsx
      <input tw="border hover:border-black" />
      ~~~

      **Multi-line**

      Multi-line line mode renders more complex code with multiple statements.
      *But you need to call "render" at the end of the code to render your
      component*.

      ~~~tsx
      const Input = tw.input\`border hover:border-black\`
      const PurpleInput = tw(Input)\`border-purple-500\`
      // note the render function!
      render(<PurpleInput />)

      // you need to call render! this would not work :(
      // <PurpleInput />
      ~~~

      ### What can I import?

      The playground gives you access to the following imports.

      ~~~tsx
      import tw, { css, styled, screen, theme  } from "twin.macro";
      import React from "react";
      ~~~

      ### Can I use typescript?

      No, not yet.

      ### Can I use hooks?

      Yes! checkout the [component and hooks example](./react-component-example).

      ### I want to see more examples!

      To see more examples check a page with [all the examples from the twin.macro readme](./readme-examples).

      ### Can I use this on my own site?

      Not yet!
      However, all of the code for this site can be found on
      [github](https://github.com/lukesmurray/twin-playground).
      Feel free to open an issue or submit a pull request.

      ### How does it work?

      Most of the changes necessary to make this work can be found in [this
      commit](https://github.com/lukesmurray/twin-playground/commit/f200a98696d2c2bc40624acded44852f61290d6b).
      If there is interest I may put together a write up explaining it.
      Let me know!

      ---

      Credit to [flowbite](https://flowbite.com/) for the components used in the default examples.
      `}
    </Fragment>
  );
}

export default Home;
