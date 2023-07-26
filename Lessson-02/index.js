import express from "express";
import crypto from 'crypto';


const app = express();
// app.use(express.json());



// params : truyen vao id, truyen param vao cuoi cung cua link

const todoList = [
    {
        id: crypto.randomUUID(),
        todoName: 'lam viec nha',
        date: new Date(),
        status: "pending"
    },
    {
        id: crypto.randomUUID(),
        todoName: 'lam viec nha',
        date: new Date(),
        status: "pending"
    }
];

// get ALL todoLIst --------------------------------------------------------
// app.get('/api/v1/todo-list', (req, res) => {

//     // console.log('asds')

//     res.send({
//         data: todoList,
//         message: 'Thanh Cong',
//         success: true
//     })
// });

app.get('/api/v1/todo-list', (req, res) => {
    try {


        const querryParams = req.query;
        console.log(querryParams)
        console.log(Object.keys(querryParams))
        const getTodoByFields = todoList.map((item) => {
            if (Object.keys(querryParams).length !== 0) {
                let mappingTodo = {};
                for (const key in item) {
                    // querryParams[key] 
                    if (Number(querryParams[key])) {
                        mappingTodo[key] = item[key]
                        // console.log(item[key])
                        // console.log(mappingTodo[key])


                    } else if (Number(querryParams[key]) === 0) {
                        const getNewItem = {
                            ...item
                        };
                        delete getNewItem[key];
                        mappingTodo = {
                            ...getNewItem
                        }
                    }
                }
                return mappingTodo
            } else {
                return item
            }
        })
        res.send({
            data: getTodoByFields,
            message: 'thanh cong',
            success: true
        })



    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            success: false
        });


    }
});


// CACH 1----------------------------------------------------------------------
// app.get('/api/v1/todo-list/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(id);

//     const findRecordTodo = todoList.find((item) => {
//         return item.id === id
//     })
//     // null, undefine, NaN, string rrỗng "", '' , 0, {}
//     if (!findRecordTodo) {
//         res.send({
//             data: null,
//             message: ' thai bai',
//             success: false
//         });
//     } else { 
//         res.send({
//             data: findRecordTodo,
//             message: 'thanh cong',
//             success: true
//         })
//     }
// })

//CACH 2--------------------------------------------------------------------

app.get('/api/v1/todo-list/:id', (req, res) => {
    try {
        const { id } = req.params;

        const findRecordTodo = todoList.find((item) => {
            return item.id === id
        })
        // null, undefine, NaN, string rrỗng "", '' , 0, {}
        if (!findRecordTodo) throw new Error('khong tim thay')
        res.send({
            data: findRecordTodo,
            message: 'thanh cong',
            success: true
        })



    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            success: false
        });


    }

});








app.listen(3001, () => {
    console.log('server!!!')
})