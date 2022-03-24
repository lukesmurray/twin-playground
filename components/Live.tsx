/* eslint-disable unused-imports/no-unused-imports */
import * as Babel from "@babel/standalone";
import babelPluginEmotion from "@emotion/babel-plugin";
import babelPluginMacros from "babel-plugin-macros";
import theme from "prism-react-renderer/themes/vsDark";
import { useContext } from "react";
import {
  LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live";
import invariant from "tiny-invariant";
import tw, { css } from "twin.macro";

import { ProseWrapper } from "./defaultMDXComponents";

// we can include macros at runtime without them being stripped
// away by babel-plugin-macros during compilation as long as they are
// imported dynamically.
// in order to get dynamic imports working we have to use a top level await
// which we have to enable in next.config and tsconfig.json
const twinImport = await import("twin.macro");

// if you use `twin.macro`s `css` import then the plugin will add
// import { css as _css } from "@emotion/react";
// to your code.
// we don't want imports so we strip it out and add the import here
// and pass the `_css` value to the plugin as scope
// however when I add the css import to the top of this file
// import { css } from "@emotion/react";
// then the `css` prop becomes undefined in this file
// dynamically importing the package avoid the issue
const emotionImport = await import("@emotion/react");
const emotionRuntimeImport = await import("@emotion/react/jsx-runtime");
const emotionStyledImport = await import("@emotion/styled/base");

export function Live({
  code,
  scope,
  centerExample,
  noInline = false,
}: {
  code: string;
  scope?: { [key: string]: any };
  centerExample?: boolean;
  noInline?: boolean;
}) {
  return (
    <LiveProvider
      code={code}
      // live provider defaults to inline=True but our transpiled code is never inline
      // inline methods are basically anything that can be wrapped in a return statement.
      //    e.g. return (<div>Hello World</div>)
      // however regardless of what the user provides, we always add tailwind imports
      // to the top of the user's code.
      // the resulting transpiled code is never inline so we set noInline to true
      noInline={true}
      theme={theme}
      // this is the scope that is passed to the transpiled code
      // to get the correct names of the variables I just transpiled all the
      // examples from the twin.macro readme and looked at the output
      scope={{
        ...scope,
        //@ts-expect-error jsx is not defined in the emotion types
        _jsx: emotionRuntimeImport.jsx,
        //@ts-expect-error jsxs is not defined in the emotion types
        _jsxs: emotionRuntimeImport.jsxs,
        _css: emotionImport.css,
        _styled2: emotionStyledImport.default,
        process,
      }}
      transformCode={async (code) => {
        const DEBUG = false;

        // see comment above on the noInline prop.
        // if noInline is false (meaining inline=True) then we need to surround
        // the user's code with a render call
        // see https://github.com/FormidableLabs/react-live/blob/98925cc473f3b3146dd11e3281a644e1ea8a18f5/src/utils/transpile/index.js#L14-L35https://github.com/FormidableLabs/react-live/blob/98925cc473f3b3146dd11e3281a644e1ea8a18f5/src/utils/transpile/index.js#L14-L35
        // to understand why
        if (!noInline) {
          code = `render(${code})`;
        }

        // we manually add twin.macro imports to the top of the user's code
        // so that they are transpiled and removed by the twin macro
        code = `import tw, { css, styled, screen, theme  } from "twin.macro";\n${code}`;

        // helpful for seeing code passed to babel
        if (DEBUG) {
          console.log("******************* pre transform *******************");
          console.log(code);
        }

        // now we transpile the code
        code =
          Babel.transform(code, {
            // see emotion css prop documentation https://emotion.sh/docs/css-prop
            // the react preset settings and emotion babel-plugin settings are
            // copied from there based on the new-jsx runtime configuration
            presets: [
              [
                "react",
                { runtime: "automatic", importSource: "@emotion/react" },
              ],
            ],
            plugins: [
              babelPluginEmotion,
              [
                // add babel plugin macros
                babelPluginMacros,
                {
                  /**
                   * Internally babelPluginMacros tries to resolve macros from
                   * the filesystem. That would throw errors in the browser so we
                   * provide our own resolve function that just returns the
                   * name of the macro
                   * @param source the id of the module to resolve (e.g. "twin.macro")
                   * @param basedir the directory to resolve the module from (e.g. "./src")
                   * @returns the path to the resolved module
                   */
                  resolvePath: (source: string) => {
                    invariant("twin.macro" === source, "Unexpected macro");
                    return source;
                  },
                  /**
                   * babelPluginMacros tries to require macros from the filesystem.
                   * Instead we provide our own require function that just returns
                   * the asynchronously imported macro at runtime
                   * @param path
                   * @returns
                   */
                  require: (path: string) => {
                    invariant("twin.macro" === path, "Unexpected macro");
                    return twinImport;
                  },
                },
              ],
            ],
          }).code ?? "";

        // the transpiled code is run inside a function
        // https://github.com/FormidableLabs/react-live/blob/98925cc473f3b3146dd11e3281a644e1ea8a18f5/src/utils/transpile/evalCode.js
        // and I didn't find any obvious way to enable import statements inside the function.
        // Normally if we need to import something we would add it to the scope
        // but in this case the imports are generated by the babel plugins (emotion and twin.macro)
        // to avoid runtime errors I just strip out all the imports and manually add them to scope
        // to determine what these imports look like I just ran all the examples from the twin.macro readme
        code = code.replace(
          `import { jsx as _jsx } from "@emotion/react/jsx-runtime";`,
          ""
        );
        code = code.replace(
          `import { css as _css } from "@emotion/react";`,
          ""
        );
        code = code.replace(
          `import { jsxs as _jsxs } from "@emotion/react/jsx-runtime";`,
          ""
        );
        code = code.replace(`import _styled2 from "@emotion/styled/base";`, "");

        if (DEBUG) {
          console.log("------------------- post transform -------------------");
          console.log(code);
        }

        // log the code object if you are struggling to debug react live errors
        // console.log(code);
        return code;
      }}>
      <LiveInner centerExample={centerExample} />
    </LiveProvider>
  );
}

function LiveInner({ centerExample = false }: { centerExample?: boolean }) {
  const { error } = useContext(LiveContext);
  return (
    <div
      css={[
        tw`grid grid-flow-col rounded-md shadow-lg border overflow-hidden`,
        css`
          min-height: 9em;
          grid-template-columns: minmax(5ch, min(50%, 45ch)) 1fr;
        `,
      ]}>
      <ProseWrapper>
        <LiveEditor
          spellCheck="false"
          css={[
            css`
              & {
                ${tw`h-full`}
              }

              &,
              & > pre {
                ${tw`min-h-full`}
                border-radius: 0;
              }
            `,
          ]}
        />
      </ProseWrapper>
      {error && <LiveError css={tw`bg-red-400`} />}
      {!error && (
        <LivePreview
          css={[
            tw`bg-white`,
            centerExample && tw`grid place-items-center`,
            css`
              padding: 10px;
            `,
          ]}
        />
      )}
    </div>
  );
}
