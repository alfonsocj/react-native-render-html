import React from 'react';
import Page from '../Page';
import useToolkit from '../useToolkit';

const codeSnippet = `import RenderHtml from 'react-native-render-html';

export default function App() {
  return <RenderHtml source={{ html: "..." }} />
}`;

export default function PageConceptArchitecture() {
  const {
    Header,
    Paragraph,
    Chapter,
    RefLibrary,
    RenderHtmlCard,
    SourceDisplay,
    List,
    ListItem
  } = useToolkit();
  return (
    <Page>
      <Header>
        <Paragraph>
          This article is an introduction to the{' '}
          <RefLibrary
            name="react-native-render-html"
            url="https://github.com/meliorence/react-native-render-html#readme"
          />{' '}
          architecture.
        </Paragraph>
      </Header>
      <Chapter title="Synopsis">
        <Paragraph>
          Consumers of this library need to understand the basic data flow model
          of this library to leverage its capabilities. Features such as props
          will touch on different areas of the data flow. Let's start with a
          simple example:
        </Paragraph>
        <RenderHtmlCard
          caption="This card shows the result of rendering a simple HTML code snippet."
          html="<p style='text-align:center;'>Hello World!</p>"
        />
        <Paragraph>
          The minimal code to produce such output would look like this:
        </Paragraph>
        <SourceDisplay
          title="A minimal code to produce aforementioned output"
          lang="jsx"
          content={codeSnippet}
        />
        <Paragraph>
          This looks pretty simple. But what exactly is happening under the
          hood?
        </Paragraph>
      </Chapter>
      <Chapter title="Data Flow">
        <Paragraph>
          We can roughly split the transformations from an HTML string to a
          React tree in 3 steps:
        </Paragraph>
        <List type="upper-alpha">
          <ListItem>
            HTML parsing. In this step, the HTML code is parsed to form a DOM
            tree. This step is performed by the{' '}
            <RefLibrary
              name="htmlparser2"
              url="https://github.com/fb55/htmlparser2#readme"
            />{' '}
            library.
          </ListItem>
          {/* <ListItem>
            Inline CSS Parsing. This step is performed by{' '}
            <RefLibrary
              name="@native-html/css-parser"
              url="https://github.com/native-html/core/tree/master/packages/css-processor#readme"
            />{' '}
            module.
          </ListItem> */}
          <ListItem>
            Transient Render Tree (TRT) Construction. In this step, the DOM tree
            is transformed in a TRT. Each node of this tree is referred to as a
            Transient Node (TNode) which has React-Native compatible styles.
            This step is performed by{' '}
            <RefLibrary
              name="@native-html/transient-render-engine"
              url="https://github.com/native-html/core/tree/master/packages/transient-render-engine#readme"
            />{' '}
            module.
          </ListItem>
          <ListItem>
            Transient Render Tree Rendering. In this step, the TRT is
            transformed in a React render tree (VDOM). TNodes are passed to
            internal and custom renderers.
          </ListItem>
        </List>
        <Paragraph>
          One might wonder why the need for a step B: why not just render a DOM
          tree? There are a few answers:
        </Paragraph>
        <List>
          <ListItem>
            To mitigate the discrepancies between Web standards and React Native
            layout engine. The DOM and Transient Render trees will not have the
            exact same structure to account for React Native limitations.
          </ListItem>
          <ListItem>
            For the sake of separation of concerns. By decoupling the rendering
            and parsing logics, we end up with a more robust product where areas
            of the code with distinct reponsibilities can be tested in
            isolation.
          </ListItem>
        </List>
      </Chapter>
    </Page>
  );
}
