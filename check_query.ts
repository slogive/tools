function CheckQuery({ query, value, values }: { query: {}; value?: string; values?: [] }) {
  if (values?.length > 1) {
    if (values?.includes('source')) {
      throw new Error("Source can't be passed into values, please pass it as a value key instead");
    }

    return Object(Object.keys(query))[0] && Object(Object.keys(query))[1] ? true : false;
  }

  if (value) {
    return Object(Object.keys(query))[Object.keys(query).indexOf(value)] ? true : false;
  }

  return false;
}

CheckQuery({
  query: { source: '', closer: 'carl', setter: 'og' },
  value: 'source',
  // values: ['source', 'setter'],
});
