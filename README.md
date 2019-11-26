# prosemirror-test-builder

[ [**WEBSITE**](https://prosemirror.net) | [**ISSUES**](https://github.com/prosemirror/prosemirror-test-builder/issues) | [**FORUM**](https://discuss.prosemirror.net) | [**GITTER**](https://gitter.im/ProseMirror/prosemirror) ]

This is a module used to write tests for [ProseMirror](https://prosemirror.net).
ProseMirror is a well-behaved rich semantic content editor based on
contentEditable, with support for collaborative editing and custom
document schemas.

This module provides helpers for building ProseMirror documents for
tests. It's main file exports a basic schema with list support, and a
number of functions, whose name mostly follows the corresponding HTML
tag, to create nodes and marks in this schema. The
`prosemirror-test-builder/dist/build` module exports a function that
you can use to create such helpers for your own schema.

Node builder functions optionally take an attribute object as their
first argument, followed by zero or more child nodes, and return a
node with those attributes and children. Children should be either
strings (for text nodes), existing nodes, or the result of calling a
mark builder. For leaf nodes, you may also pass the builder function
itself, without calling it. Mark builder functions work similarly, but
return an object representing a set of nodes rather than a single
node.

These builders help specifying and retrieving positions in the
documents that you created (to avoid needing to count tokens when
writing tests). Inside of strings passed as child nodes,
angle-brackets `<name>` syntax can be used to place a tag called
`name` at that position. The angle-bracketed part will not appear in
the result node, but is stored in the node's `tag` property, which is
an object mapping tag names to position integers. A string which is
_only_ a tag or set of tags may appear everywhere, even in places
where text nodes aren't allowed.

So if you've imported `doc` and `p` from this module, the expression
`doc(p("foo<a>"))` will return a document containing a single
paragraph, and its `.tag.a` will hold the number 4 (the position at
the end of the paragraph).

In addition to defining a function for each mark and node name in the
test schema, the module exports the following helpers:

**`schema`**: The test schema itself.

**`p`**: A builder for paragraph nodes.

**`pre`**: A builder for code block nodes.

**`h1`**: A builder for heading block nodes with the `level` attribute defaulting to 1.

**`h2`**: A builder for heading block nodes with the `level` attribute defaulting to 2.

**`h3`**: A builder for heading block nodes with the `level` attribute defaulting to 3.

**`li`**: A builder for list item nodes.

**`ol`**: A builder for ordered list nodes.

**`ul`**: A builder for bullet list nodes.

**`br`**: A builder for hard break nodes.

**`img`**: A builder for image nodes, with the `src` attribute defaulting to `"img.png"`.

**`hr`**: A builder for horizontal rule nodes.

**`a`**: A builder for link marks.

The `dist/build` submodule exports a single function which can be
called with a schema and an optional object of renamed/configured
builders to create a object of builders for a custom schema. It will
return an object with a `schema` property and one builder for each
node and mark in the schema. The second argument can be used to add
custom builders—if given, it should be an object mapping names to
attribute objects, which may contain a `nodeType` or `markType`
property to specify which node or mark the builder by this name should
create.

## License

This module is open source and distributed under an MIT license.

We aim to be an inclusive, welcoming community. To make that explicit,
we have a [code of
conduct](http://contributor-covenant.org/version/1/1/0/) that applies
to communication around the project.
