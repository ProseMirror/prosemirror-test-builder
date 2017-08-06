import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {Schema} from "prosemirror-model"

import builders from "./build"

const testSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

const out = builders(testSchema, {
  p: {nodeType: "paragraph"},
  pre: {nodeType: "code_block"},
  h1: {nodeType: "heading", level: 1},
  h2: {nodeType: "heading", level: 2},
  h3: {nodeType: "heading", level: 3},
  li: {nodeType: "list_item"},
  ul: {nodeType: "bullet_list"},
  ol: {nodeType: "ordered_list"},
  br: {nodeType: "hard_break"},
  img: {nodeType: "image", src: "img.png"},
  hr: {nodeType: "horizontal_rule"},
  a: {markType: "link", href: "foo"},
})

out.eq = function eq(a, b) { return a.eq(b) }
out.builders = builders

export default out
