const { isObject } = require('@base-cms/utils');

const getFields = (schema, type, selectionSet, fragments, fields = []) => {
  if (!isObject(selectionSet)) return fields;
  const { selections = [] } = selectionSet;
  selections.forEach((s) => {
    const { kind, name, typeCondition } = s;
    switch (kind) {
      case 'Field':
        fields.push({ type, value: name.value });
        break;
      case 'InlineFragment':
        getFields(
          schema,
          schema.getType(typeCondition.name.value),
          s.selectionSet,
          fragments,
          fields,
        );
        break;
      case 'FragmentSpread':
        getFields(
          schema,
          schema.getType(fragments[name.value].typeCondition.name.value),
          fragments[name.value].selectionSet,
          fragments,
          fields,
        );
        break;
      default:
        break;
    }
  });
  return fields;
};

module.exports = (schema, returnType, selectionSet, fragments) => {
  const type = returnType.ofType || returnType;
  // An array of { type, value } objects.
  const selected = getFields(schema, type, selectionSet, fragments);

  // @todo Handle requiresProject at some point...
  // const { requiresProject } = type;
  // const fields = isArray(requiresProject)
  //   ? selected.concat(requiresProject.map((value) => ({ type, value })))
  //   : selected;

  const props = selected.reduce((set, field) => {
    const map = field.type.getFields();
    if (!map[field.value]) return set;
    const { properties } = map[field.value];
    if (!properties || !properties.length) return set;
    properties.forEach((prop) => set.add(prop));
    return set;
  }, new Set());
  return [...props];
};