/**
 * Created by Tharuka Jayalath on 08/26/2018
 */

module.exports = {
    createOrderGridData: (orders, users) => {
        console.log(users);
        return orders.map(order => {

            const user = users.get(order.email);

            if (user) {// TODO can be removed if data layer consists
                console.log('user matcing for order', user);
                console.log(user.name);
                console.log(user.contactNumber);
                console.log(user.address);
                order.customerName = user.name;
                order.address = user.address;
                order.contactNumber = user.contactNumber;
            }


            return order;
        });


    },
    createUsersMap: (users) => {
        //todo validate array
        const result = new Map();
        console.log('users createUserMap', users);
        users.forEach((user) => {
            result.set(user._id, user);
        });

        console.log(result);

        return result;

    },

    createExcelExportGrid: (orderGridData)=>{
        const result = [];

        console.log('orderGridData', orderGridData);

            orderGridData.forEach((order)=>{
                console.log('order', order);

                order.items.forEach((item)=>{
                    result.push({_id: order._id,
                    email: order.email,
                        orderName: order.name,
                        customerName: order.customerName,
                        address: order.address,
                        contactNumber: order.contactNumber,
                        requiredDate: order.requiredDate,
                        createdDate: order.createdDate,
                        itemName: item.name,
                        quantity: item.quantity,
                        description: item.description
                    });
                });

            });

        return result;
    }



};
