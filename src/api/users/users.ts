import fixtures from './fixtures.json';

type User = {
  id: number;
  name: string;
  role: string | null;
};

type Row = Partial<User>;

type Select = (keyof User)[] | '*';

export async function getUsers(select: Select): Promise<Row[]> {
  return fixtures.map((user) => selectFields(user, select));
}

export async function getUserById(
  id: number,
  select: Select
): Promise<Row | null> {
  const user = fixtures.find((user) => user.id === id);
  return user ? selectFields(user, select) : null;
}

function selectFields(user: User, select: Select): Row {
  if (select === '*') {
    return user;
  }

  return select.reduce<Row>((row, field) => {
    if (select.includes(field)) {
      return { ...row, [field]: user[field] };
    }
    return row;
  }, {});
}
