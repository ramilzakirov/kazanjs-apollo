import db from '../../../db';

const users = (obj, {id}, context) => {
  return id
    ? db.users.find(x => x.id = id)
    : db.users;
};

export default users;
