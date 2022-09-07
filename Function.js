// core module
// file system
const fs = require("fs");

// validator
const validator = require("validator");

const dir = "./data"; // directory name
const file = "./data/contacts.json"; // file name, inside dir

// check directory and file before input
// if directory not exist, create directory
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// if file not exist, create file
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]");
}

// ----------------------------------------------------------------

// function load contact
const LoadContact = () => {
  // read file before write
  const file = fs.readFileSync("data/contacts.json", "utf8");

  // change data string to object
  const contacts = JSON.parse(file);

  return contacts;
};

// function save data
const SaveData = (name, phone, email) => {
  // array object
  const contact = { name, phone, email };

  // load contact
  const contacts = LoadContact();

  // check duplicate name
  const duplicate = contacts.find((contact) => contact.name === name);

  if (duplicate) {
    // if name already exist return false
    console.log("Contact Name already recorded. Please use another name");
    return false;
  }
  // if name available but email or mobile not valid then return false
  if (contact.email) {
    if (!validator.isEmail(contact.email)) {
      console.log("Please input correct email");
      return false;
    }
  }

  if (!validator.isMobilePhone(contact.phone)) {
    console.log("Please input correct phone number");
    return false;
  }

  // if name available, email, and mobile correct then save data
  // add items to variable contact
  contacts.push(contact);

  // change data object to sting and write items to file
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  // send respond when input success
  console.log(
    `Thank you for input your data! \nYour name is ${name}, your mobile phone is ${phone}, and your email is ${email}`
  );
};

// function list contact
const ListContact = () => {
  // load contact
  const contacts = LoadContact();

  // show all contact list
  console.log("Contact List: ");
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.phone}`);
  });
};

// function detail contact
const DetailContact = (name) => {
  // load contact
  const contacts = LoadContact();

  // find detail contact by name
  const findName = contacts.find((contact) => contact.name === name);

  // if name not exist return false
  if (!findName) {
    console.log("Contact not found!");
    return false;
  }

  // if name exist show detail
  console.log("Contact Detail: ");
  console.log(
    `Name: ${findName.name} \nEmail: ${findName.email} \nPhone: ${findName.phone}`
  );
};

module.exports = { DetailContact, ListContact, SaveData };
