var fs = require("fs").promises;
var path = require('node:path');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    return [];
  } finally {
    console.log("Reading contacts.json file completed.");
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  console.log(`\n New contact *** ${newContact.name} *** added to contacts:`);
  console.table(newContact);

  return newContact;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);

  return console.table(contactById);
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  try {
    const contactEqualsId = contacts.find((contact) => contact.id === contactId);
    console.log(
      `\n--------- Contact * Name: ${contactEqualsId.name} / Email: ${contactEqualsId.email} / Phone: ${contactEqualsId.phone} * removed: `
    );
    console.table(contactEqualsId);
  } catch (error) {
    console.log(`\n--------- Contact with ID: ${contactId} not found.`);
    console.error("Error parsing JSON:", error.message);
  }

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return updatedContacts;
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};

