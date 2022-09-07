const yargs = require("yargs");
// save data
const { DetailContact, ListContact, SaveData } = require("./Function");

// ---------------------------------------------------------

// input using yargs command
yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      decribe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      decribe: "contact email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      decribe: "contact mobile phone number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    SaveData(argv.name, argv.mobile, argv.email);
  },
});

yargs.command({
  command: "list",
  describe: "see contact list",
  handler() {
    ListContact();
  },
});

yargs.command({
  command: "detail",
  describe: "see detail contact",
  builder: {
    name: {
      decribe: "Contact Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    DetailContact(argv.name);
  },
});

yargs.parse();
