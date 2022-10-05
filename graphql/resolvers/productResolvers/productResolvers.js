const db = require("../../../db");
const collection = "products";

module.exports = {
  Query: {
    getProducts: async () => {
      const productsRef = db.collection(collection);
      const snapshot = await productsRef.get();
      let productList = [];
      snapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      return productList;
    },
    getProduct: async (parent, args) => {
      const productcode = args.id;

      const snapshot = db.collection(collection).doc(productcode);

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
    getProductByCustomer: async (parent, args) => {
      const customerid = args.customerID;
      const productsRef = db.collection(collection);
      const snapshot = await productsRef.get();
      let productList = [];
      let products = [];
      snapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      // console.log(productList.filter((customerID) => customerID === customerid))
      productList.forEach((product) => {
        if (product.customerID === customerid) {
          products.push({ id: product.id, ...product });
        }
      });

      return products;
    },
  },
  Mutation: {
    addProduct: async (parent, args) => {
      try {
        let product = args.input;
        const res = await db.collection(collection).add(product);
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
    updateProduct: async (parent, args, context) => {
      try {
        const productcode = args.id;
        const product = args.input;
        const snapshot = db.collection(collection).doc(productcode);

        const res = await snapshot.update(product);
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
    deleteProduct: async (parent, args, context) => {
      try {
        const productcode = args.id;
        const snapshot = db.collection(collection).doc(productcode);
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
