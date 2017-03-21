const {Node} = require("prosemirror-model")

const noTag = Node.prototype.tag = Object.create(null)

function flatten(schema, children, f) {
  let result = [], pos = 0, tag = noTag

  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    if (child.tag && child.tag != Node.prototype.tag) {
      if (tag == noTag) tag = Object.create(null)
      for (let id in child.tag)
        tag[id] = child.tag[id] + (child.flat || child.isText ? 0 : 1) + pos
    }

    if (typeof child == "string") {
      let re = /<(\w+)>/g, m, at = 0, out = ""
      while (m = re.exec(child)) {
        out += child.slice(at, m.index)
        pos += m.index - at
        at = m.index + m[0].length
        if (tag == noTag) tag = Object.create(null)
        tag[m[1]] = pos
      }
      out += child.slice(at)
      pos += child.length - at
      if (out) result.push(f(schema.text(out)))
    } else if (child.flat) {
      for (let j = 0; j < child.flat.length; j++) {
        let node = f(child.flat[j])
        pos += node.nodeSize
        result.push(node)
      }
    } else {
      let node = f(child)
      pos += node.nodeSize
      result.push(node)
    }
  }
  return {nodes: result, tag}
}

function id(x) { return x }

function takeAttrs(attrs, args) {
  let a0 = args[0]
  if (!args.length || (a0 && (typeof a0 == "string" || a0 instanceof Node || a0.flat)))
    return attrs

  args.shift()
  if (!attrs) return a0
  if (!a0) return attrs
  let result = {}
  for (let prop in attrs) result[prop] = attrs[prop]
  for (let prop in a0) result[prop] = a0[prop]
  return result
}

// : (string, ?Object) → (...content: [union<string, Node>]) → Node
// Create a builder function for nodes with content.
function block(type, attrs) {
  let result = function(...args) {
    let myAttrs = takeAttrs(attrs, args)
    let {nodes, tag} = flatten(type.schema, args, id)
    let node = type.create(myAttrs, nodes)
    if (tag != noTag) node.tag = tag
    return node
  }
  if (type.isLeaf) try { result.flat = [type.create(attrs)] } catch(_) {}
  return result
}

// Create a builder function for marks.
function mark(type, attrs) {
  return function(...args) {
    let mark = type.create(takeAttrs(attrs, args))
    let {nodes, tag} = flatten(type.schema, args, n => mark.type.isInSet(n.marks) ? n : n.mark(mark.addToSet(n.marks)))
    return {flat: nodes, tag}
  }
}

module.exports = function(schema, names) {
  let result = {schema}
  for (let name in schema.nodes) result[name] = block(schema.nodes[name], {})
  for (let name in schema.marks) result[name] = mark(schema.marks[name], {})

  if (names) for (let name in names) {
    let value = names[name], typeName = value.nodeType || value.markType || name, type
    if (type = schema.nodes[typeName]) result[name] = block(type, value)
    else if (type = schema.marks[typeName]) result[name] = mark(type, value)
  }
  return result
}
