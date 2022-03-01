const data = {
  sdd_id: 1,
  sdd_guess_message: 'Hey, thanks for the opportunity.',
  sdd_guest_name: 'Cesar Fonseca',
  sdd_guest_email: 'cesar@slogive.com',
};

function putSql({ data, collection, where }: { data: any; collection: string; where: string }) {
  const keys = Object.keys(data);
  const entries = Object.entries(data);

  return `
   UPDATE ${collection}
   SET
   ${Array(keys.length)
     .fill('')
     .map((It, In: number) => {
       return `${In !== 0 ? '\n	' : ''}${keys[In]} = '${entries[In][1] == 'REVOKE' ? '' : entries[In][1]}'`;
     })}
   WHERE ${where} = '${data[where]}';
 `;
}

const sql = putSql({ data: data, collection: 'sdd', where: 'sdd_id' });

console.log(sql);
