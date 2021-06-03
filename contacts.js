const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

const generateId = (arrayOfNumbers) => {
  const idList = arrayOfNumbers.map(({ id }) => id);
  const maxId = arrayOfNumbers.length === 0 ? 0 : Math.max.apply(null, idList);
  const id = maxId + 1;
  return id;
};

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);
    return parsedContactsList;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const contactsList = await listContacts();
    const contactById = contactsList.find(({ id }) => Number(contactId) === id);
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  // ...твой код
  try {
    const contactsList = await listContacts();
    const newContactList = contactsList.filter(
      ({ id }) => Number(contactId) !== id
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf8");
    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  const contactsList = await listContacts();
  const contactId = generateId(contactsList);
  const newContact = {
    id: contactId,
    name,
    email,
    phone,
  };
  const newContactList = [...contactsList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf8");
  //   console.log(maxId);
  return newContactList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
