# Music Theory App  

## Overview  
This is a simple music theory web application built using Node.js, Express, EJS, and MySQL. The app provides educational content with features such as:  
- A **Topics page** with questions related to music theory.  
- A **Search functionality** to look up specific questions or answers.  
- A **Form** to input and validate user answers.  

The app is already deployed on a virtual server, but instructions are provided below for setting it up locally and verifying deployment.  

---

## Deployed Application  
The app is deployed and accessible on the Goldsmiths virtual server:  
**[Access the app here](http://www.doc.gold.ac.uk/usr/228/)**  

---

## Local Setup Instructions  

### Prerequisites  
Ensure you have the following installed:  

1. **[Node.js](https://nodejs.org/en/.)**  
   - Install the latest LTS version (16 or later).  
   - Node.js includes `npm`, which is required to install dependencies.  

2. **[MySQL](https://dev.mysql.com/downloads/mysql/)**  
   - Install MySQL Community Server.  
   - During installation, note your MySQL username and password (default username is usually `root`).  

3. **[Git](https://git-scm.com/downloads)**  
   - Install Git to clone the repository.  
   - On Windows, this includes **Git Bash**, which you can use as a terminal.  

4. **[VS Code](https://code.visualstudio.com)** (optional but recommended)  
   - A code editor to work with the project files.  

---

### Steps to Set Up  

1. **Clone the Repository**  
   Open a terminal (e.g. Git Bash, VS Code terminal, or your OS terminal) and run:  
  
   git clone https://github.com/Sanshriya/music-theory-app  
   cd music-theory-app  

2. **Install Dependencies**
    Install the required Node.js packages using this command:

    npm install  

3. **Log in to your MySQL server using MySQL Workbench**  
   Open MySQL Workbench and connect to your MySQL server using your credentials.  

4. **Create the Database and Tables**  
   In MySQL Workbench, open a new query window and run the following SQL commands to create the database and tables:  
  
    ```sql
    SOURCE /path/to/your/create_db.sql;  
    SOURCE /path/to/your/insert_test_data.sql; 

   Replace /path/to/your/ with the actual path to where the files are located on your machine.

   If the .sql files are in the same directory as your MySQL Workbench session, you can just use the file names:

   ```sql
   SOURCE create_db.sql;  
   SOURCE insert_test_data.sql; 

5. **Update the Database Connection in `index.js`**

   In the `index.js` file of your project, ensure the MySQL credentials match your local setup. Look for this section of the code and update the `user`, `password`, and any other details as needed:

   ```javascript
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'your_mysql_user',  // Replace with your MySQL username
       password: 'your_mysql_password',  // Replace with your MySQL password
       database: 'music_theory_app'
   });

6. **Start the app by running the following command in the terminal:

    node index.js

    You can then access the app via the following URL: http://localhost:8000


---

## Virtual Server Deployment

### Steps to deploy

1. Access the virtual server using the following URL: http://www.doc.gold.ac.uk/ssh/ID

   Replace 'ID' with your 3-digit server ID.

2. Log in using the server administrator username and password you used to set up the virtual server.

Whilst typing the password, the characters do not appear on the screen, but your keystrokes are still being properly recorded.

3. Create a minimal stack by installing nvm, node and npm. NVM is the node version manager, which can be used to install node and NPM. Node is the runtime environment for server-side Javascript. NPM is the node package manager, which can be used to set up the modules needed for the applications.

Run the following commands:

    sudo apt-get update
    sudo apt install curl
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
    exit
    nvm install 16

4. Install git.

    sudo apt install git

5. Pull the app code to the virtual machine. This will create a file called 'music-theory-app'.

    git clone https://github.com/Sanshriya/music-theory-app

6. Change into the music-theory-app folder using the Linux cd command:

    cd music-theory-app

7. Run the application!

    node index.js

    You can then access the app via the following URL: http://www.doc.gold.ac.uk/usr/ID/

    (Replace ID with your 3-digit server ID)


---

## Troubleshooting  

### Database Connection Issues  
Ensure the database credentials in `index.js` match your local or virtual server setup.

### Missing Dependencies  
Run `npm install` again to ensure all required packages are installed.

### Virtual Server Errors  
If changes are not reflected, try logging out of the virtual server and back in .
