module.exports = {
    getRegisterForm : (req, res) => res.render('./users/register'),
    registerUser : (req, res) => {
        res.send('Add user to the database');
    }
}