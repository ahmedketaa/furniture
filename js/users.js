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
         name: 'John Doe',
         cart: [],
         wishList: [],
         notifications: [] 

        },
        // Add more default users here if needed
    ];
}
