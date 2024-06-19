// users.js
export const users = loadUsers();

export function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Users saved');
}


export function loadUsers() {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        return JSON.parse(usersJSON);
    }
    return [
        { id: 1,
         fullName: 'Ahmed Mostafa',
         email:'andf.750@gmail.com',
         password:'123123',
         role: "user",
         cart: [],
         wishList: [],
         notifications: [] 

        },
        
    ];
}
