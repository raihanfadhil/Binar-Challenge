import Storage from '../Utils/Storage';


async function getAccount() {
  return await Storage.get('account');
}



async function setAccount(data) {
  return await Storage.set('account', data);
}

async function setEmail(data) {
  return await Storage.set('email', data);
}

async function setId(data) {
  return await Storage.set('id', data);
}



async function logout() {
  return await Storage.set('account', null);
}


export default {
  logout,
  getAccount,
  setAccount,
  setEmail,
  setId
};