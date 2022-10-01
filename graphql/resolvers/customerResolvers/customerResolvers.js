const { CustomerList } = require("../../../FakeData");
const _ = require("lodash");
module.exports = {
  Query: {
    getCustomers: () => {
      return CustomerList;
    },
    getCustomer: (parent, args) => {
      const id = args.id;
      const findCustomer = _.find(CustomerList, { id: Number(id) });
      return findCustomer;
    },
  },
  Mutation: {
    addCustomer: (parent, args) => {
      const customer = args.input;
      const lastid = CustomerList[CustomerList.length - 1].id;
      customer.id = lastid + 1;
      CustomerList.push(customer);
      console.log(customer)
      return customer;
    },
    updateCustomer: (parent,args) =>{
      const newCustomer = args.input
      const id = args.id
      CustomerList.forEach(customer => {
        if (customer.id ===Number(id)) {
          customer = newCustomer
        }
        else
        {
          console.log("Can't find customer")
        }
        
      });
      return newCustomer
    },
    deleteCustomer: (parent,args) => {
      const id = args.id
      _.remove(CustomerList, (customer) => customer.id === Number(id));
      return null
    }
  },
};
