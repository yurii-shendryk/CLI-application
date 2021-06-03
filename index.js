const { Command } = require("commander");
const contacts = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then(console.table);
      break;

    case "get":
      contacts.getContactById(id).then(console.table);
      break;

    case "add":
      // ... name email phone
      contacts.addContact(name, email, phone).then(console.table);
      break;

    case "remove":
      // ... id
      contacts.removeContact(id).then(console.table);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
