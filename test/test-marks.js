const {builders, eq} = require("..")
const {Schema} = require("prosemirror-model")
const ist = require("ist")

// This schema has an "a" mark which doesn't exclude itself
const nodes = {
  doc: {
    content: "block+"
  },
  p: {
    content: "inline*",
    group: "block",
  },
  text: {
    group: "inline"
  },
}
const marks = {
  a: {
    attrs: {
      href: {},
    },
    excludes: ""
  }
}
const schema = new Schema({nodes, marks})

const { doc, p, a } = builders(schema)

describe("Multiple marks", () => {
  it("deduplicates identical marks", () => {
    const actual = doc(p(a({ href: "/foo" }, a({ href: "/foo" }, "click <p>here"))))
    const expected = doc(p(a({ href: "/foo" }, "click here")))

    ist(actual, expected, eq)
    ist(actual.nodeAt(actual.tag.p).marks.length, 1)
  })

  it("marks of same type but different attributes are distinct", () => {
    const actual = doc(p(a({ href: "/foo" }, a({ href: "/bar" }, "click <p>here"))))

    ist(actual.nodeAt(actual.tag.p).marks.length, 2)
  })
})
