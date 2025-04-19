const contacts = require("./contacts-step3.js");

async function stepThreeTestContacts() {
  console.log(
    "\n********** !!! ********** All contacts ********** !!! **********\n"
  );

  const newContact = await contacts.addContact(
    "Dorel",
    "dorel@email.com",
    "123-456-7890"
  );

  const newContact2 = await contacts.addContact(
    "Gigel",
    "gigel2@email.com",
    "1223-456-7890"
  );

  const contactById = await contacts.getContactById(newContact.id);
  console.log(
    "\n********** Contact by ID: " +
      contactById.id +
      " , " +
      contactById.name +
      " , " +
      contactById.email +
      " , " +
      contactById.phone
    );
  console.table(contactById);
  
  const contactById2 = await contacts.getContactById(newContact2.id);
  console.log(
      "\n********** Contact by ID:  " +
      contactById2.id +
      " , " +
      contactById2.name +
      " , " +
      contactById2.email +
      " , " +
      contactById2.phone
 );
  console.table(contactById2);

  const removedContact2 = await contacts.removeContact(newContact2.id);
  console.log(
    `********** Updated contact list after ${newContact2.name}'s removal:`
  );
  console.table(removedContact2);
}

stepThreeTestContacts().catch((error) => console.error("Error: ", error));
