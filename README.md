# Crypt
A secret anonymous 🕵🏻 place where you can only view your blogs 📝.

### How to run on your local machine?
1. Make sure have node installed on your machine.
2. Clone the repository and install the dependenies
```
npm install
```
3. Rename ```.env.example``` to ```.env```
4. Add your environmental variables in ```.env``` file
```
MONGO_URI - obtained from Mongodb atlas or put uri of your local mongo server
SENDGRID_API - obtained from sendgrid
SENDGRID_FROM - registered email at sendgrid
DOMAIN_URL - your localhost port eg. http://localhost:8000
```
5. Run the project
```
npm run start
```

### Contributing
If you find any bug or security flaws, feel free to raise an issue or make a pull request.
