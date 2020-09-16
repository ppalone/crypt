# Crypt
A secret anonymous 🕵🏻 place where you can only view your blogs 📝.

### How to run on your local machine?
Make sure you have node installed on your machine.
Clone the repository and install the dependenies
```
npm install
```
Rename ```.env.example``` to ```.env```
Add your environmental variables in ```.env``` file
```
MONGO_URI - obtained from Mongodb atlas or put uri of your local mongo server
SENDGRID_API - obtained from sendgrid
SENDGRID_FROM - registered email at sendgrid
DOMAIN_URL - your localhost port eg. http://localhost:8000
```
Run the project
```
npm run start
```

### Contributing 💜
If you find any bug or security flaws, feel free to raise an issue or make a pull request.
