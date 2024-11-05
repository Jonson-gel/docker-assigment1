## Docker Assignment - Agile Software Practice.

__Name:__ Pengcheng Zheng

__Demo:__ https://youtu.be/NNOvYEJ1OsQ

This repository contains the containerization of the multi-container application illustrated below.

![](./images/arch.png)

### Database Seeding.

In seed.js, I write connect function to link to mongo and seedDatabase function to pull the content of seeding.json to database. I create the movie object to map the data and deploy them by mongoose. In docker-compose.yml, the seeder configuration is deployed with the help of dockerfile-seeder to construct a container for data seeding.

### M.ulti-Stack.

In docker-compose.override and docker-compase.prod, I deploy some further configuration for development environment and production environment. These two file will execute different operations in two conditons.