 Objective
A front-end-only React application, the Ship Maintenance Dashboard replicates an entire ship maintenance system. Role-based access (Admin, Inspector, Engineer) and user authentication are included, and users can oversee ships, their parts, and maintenance tasks. In-app notifications are triggered by actions, and jobs are shown in a calendar view. Key statistics are displayed on a KPI dashboard, and all data is kept in localStorage. The application works flawlessly on all devices. 

Core Features:
Here are the core features of the Ship Maintenance Dashboard
used localStorage-based session handling to simulate authentication.
Organize ships by adding, editing, and deleting them.
Assign and monitor the parts associated with every ship.
Create maintenance tasks and keep track of them with status updates.
Use the calendar view to see the planned maintenance.
alerts for impending and past-due tasks.
KPI dashboard displaying important data, such as job completion rates.
localStorage in the browser for persistent data storage.

Tech Stack Tool Objective

 React Router Page routing/navigation
 Custom CSS localStorage 
 React UI Framework



Installation:
Setting up
1.1. Download the Repository

📁 2. Navigate into the Project Directory

    cd ship-maintenance-dashboard
🛠️ 3. Run Terminal as Administrator(optional)
    Right-click on Command Prompt or PowerShell

    Click “Run as Administrator” (important if script policies block npm)

📦 4. Install Required Packages
    npm install --force
    npm install
    --force is used to bypass certain warnings or dependency conflicts. It is optional and should be used with care.

🔍 5. Fix Vulnerabilities (Optional)
    npm audit fix
▶️ 6. Start the Development Server

    npm start
    The app will launch at http://localhost:3000
    Npm begins


Usage for this project:
You must log in using specific credentials for three different roles on the homepage.
For the admin:
     email address: admin@entnt.com;
     password: admin123
For the Engineer 
     email address : engineer@entnt.com, 
     password : engine123.
For the inspector
     Email:inspector@entnt.com, 
     password is inspect123.
 Depending on their roles, everyone has restricted access.
 For example, an administrator can create jobs, update jobs, remove jobs, and create ships, as well as perform all operations on the site; 
 an inspector can view only available ships and their status aslso IMO number,name,flag no,status and he can view ,edit and delete the ships based on data
 an engineer can view jobs; and an administrator can perform all operations. 
 Meanwhile, everyone can access the dashboard, which shows the total number of ships, overdue components, jobs in progress, and jobs completed.

This React project delivers a simulated Ship Maintenance Dashboard with key features for managing ships, components, and jobs, all while persisting data locally and offering role-based access.
