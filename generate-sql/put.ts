const data = {
  sdd_id: 1,
  sdd_guess_message: 'Hey, thanks for the opportunity.',
  sdd_guest_name: 'Cesar Fonseca',
  sdd_guest_email: 'cesar@slogive.com',
};

function generateSql({ data, collection }: { data: any; collection: string }) {
  return `
	UPDATE ${collection}
	SET
  ${Array(Object.keys(data).length)
    .fill('')
    .map((ITEM, INDEX) => `${INDEX !== 0 ? '\n	' : ''}${Object.keys(data)[INDEX]} = '${Object.entries(data)[INDEX][1]}'`)}
	WHERE sdd_id = ${data.sdd_id};
`;
}

const sql = generateSql({ data: data, collection: 'sdd' });

console.log(sql);
