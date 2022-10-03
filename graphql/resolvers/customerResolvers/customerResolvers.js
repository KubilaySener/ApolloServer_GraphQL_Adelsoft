const db = require("../../../db");
const collection = "customers";

module.exports = {
  Query: {
    // Get All instances from pre-defined collection
    getCustomers: async () => {
      const customersRef = db.collection(collection);
      const snapshot = await customersRef.get();
      let customerList = [];
      snapshot.forEach((doc) => {
        customerList.push({ id: doc.id, ...doc.data() });
      });
      return customerList;
    },
    // Get instances from pre-defined collection by id.
    getCustomer: async (parent, args) => {
      const customercode = args.id;

      const snapshot = db.collection(collection).doc(customercode);

      const sendResult = await snapshot.get().then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          return {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
        } else {
          return "Instance Not Found";
        }
      });
      return sendResult;
    },
  },
  Mutation: {
    // Add Instance to pre-defined collection.
    addCustomer: async (parent, args, context) => {
      try {
        let customer = args.input;
        const res = await db.collection(collection).add(customer);
        console.log("Added document with ID: ", res.id);
        return {
          success: true,
          message: "Instance Added",
        };
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      }
    },
    // Update collection instances by id
    updateCustomer: async (parent, args, context) => {
      try {
        const customercode = args.id;
        const customer = args.input;
        const snapshot = db.collection(collection).doc(customercode);
        
        const res = await snapshot.update(customer);
        return {
          success: true,
          message: "Instance Updated",
        };
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      }
    },
    // Delete instance by id
    deleteCustomer: async (parent, args, context) => {
      try {
        const customercode = args.id;
        const snapshot = db.collection(collection).doc(customercode);
        await snapshot.delete();
        return {
          success: true,
          message: "Instance Deleted",
        };
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      }
    },
  },
};
