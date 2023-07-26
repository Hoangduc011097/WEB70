import express from "express";
import crypto from 'crypto';


const app = express();
app.use(express.json());



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


// app.get('/api/v1/todo-list', (req, res) => {

//     // console.log('asds')

//     res.send({
//         date: todoList,
//         message: 'Thanh Cong',
//         success: true
//     })
// });

// app.get('/api/v1/todo-list/:id', (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id)

//         const findRecordTodo = todoList.find((item) => {
//             return item.id === id
//         })

//         // null, undefined, NaN, string rỗng '',"",0,{}
//         if (!findRecordTodo) throw new Error('khong tim thay');
//         res.send({
//             date: findRecordTodo,
//             message: 'Thangh cong',
//             success: true
//         })

//     } catch (error) {
//         res.send({
//             date: null,
//             message: 'That bai',
//             success: false
//         })
//     }

// });



// app.get('/api/v1/todo-list', (req, res) => {

//     // console.log('asds')

//     res.send({
//         date: todoList,
//         message: 'Thanh Cong',
//         success: true
//     })
// });

app.get('/api/v1/todo-list', (req, res) => {
    try {
        const queryParams = req.query;
        const getTodoByFiels = todoList.map((item) => {
            let mapingTodo = {};
            for (const key in item) {
                if (queryParams[key]) {
                    mapingTodo[key] = item[key];

                } else if (Number(queryParams[key]) === 0) {
                    const getNewItem = {
                        ...item
                    };
                    delete getNewItem[key];
                    mapingTodo = {
                        ...getNewItem
                    }
                } else {
                    mapingTodo = {
                        ...item
                    }
                }
            }
            return mapingTodo;

        });
        res.send({
            date: getTodoByFiels,
            message: 'thanh cong',
            success: false
        })

    } catch (error) {
        res.send({
            date: null,
            message: error.message,
            success: false
        })
    }

});

app.post('/api/v1/todo-list', (req, res) => {
    const dataBody = req.body;
    todoList.push({
        ...dataBody,
        id: crypto.randomUUID(),

    });
    res.send({
        data: todoList
    })

})

app.listen(3000, () => {
    console.log('server!!!')
})