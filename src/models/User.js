// ************ Require's ************
const fs = require('fs');
const path = require('path');

const User = {
    fileName: path.join(__dirname,'../database/users.json'),

    getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id +1;
        }
        return 1;
    },

    findAll: function() {
        return this.getData();
    },

    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByFile: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    create: function(UserData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...UserData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null, ' '));
        return true;
    }
}

module.exports = User;
//console.log(User.findByFile({email: 'alejo@gmail.com'}));