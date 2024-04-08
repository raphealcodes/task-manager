# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

# How to run 

# clone the project first
git clone 'Project Link'

# install the packages
npm install 

# run the app
ng serve



Library Used:

Tailwind,
Angular Material



I used modular design pattern to allow lazy loading of the features,

I created a shared module to handle all my reusable components which consists of:

1: components folder: this handles all reuseable component 
2: data folder: this handles all my constant data e.g status and priority
3: models folder: this handles all the interface of data
4: services folder: this handles all my validation of the form and also where i send and  get data to the local storage
5: third party folder: this is where i called my angular material lib


I created a view tasks container that carry the main view task components and use to handle my input() and the data is gotten from the local storage, why for my add task and edit task, i used mat dialog, where the create and edit happen (create task component), i check if data exists to determine if you are create or just updating the data
