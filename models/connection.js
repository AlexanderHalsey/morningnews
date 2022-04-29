var mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const uri = `mongodb+srv://ah363:${process.env.MONGODB_PW}@cluster0.nkfjh.mongodb.net/morningnews?retryWrites=true&w=majority`;
  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  await mongoose.connect(uri, options);
};