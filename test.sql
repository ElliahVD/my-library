DROP DATABASE IF EXISTS my_library;

CREATE DATABASE my_library;

USE my_library;

create table `country` (
`id`int(11) primary key auto_increment,
`name` varchar(100) not null
);

create TABLE `author` (
`id`int(11) primary key auto_increment,
`firstname` varchar(128) not null,
`lastname` varchar(128) not null,
`id_country` int(11) ,
foreign key (id_country) references author(id)
);

 create table `app_user` (
`id`int(11) primary key auto_increment,
`pseudo` varchar(128) not null,
`email` varchar(60) not null,
`password`varchar(256) not null,
`id_country` int(11) ,
`created_at` timestamp default current_timestamp,
foreign key (id_country) references country(id) );

create table `gender` (
`id`int(11) primary key auto_increment,
`name`varchar(25) not null
);

create table `book` (
`id`int(11) primary key auto_increment,
`title` varchar(256) not null,
`id_author` int(11) ,
`resume` text,
`publication` date not null,
`id_gender` int(11),
foreign key (id_author) references author(id),
 foreign key (id_gender) references gender(id)
);

create table `books_genders` (
`id_gender`int(11),
`id_book`int(11),
primary key(id_gender, id_book),
 foreign key (id_gender) references gender(id),
 foreign key (id_book) references book(id)
);

CREATE TABLE `likes` (
`id_app_user`int(11) ,
`id_book`int(11) ,
primary key(id_app_user, id_book),
foreign key (id_app_user) references app_user(id),
foreign key (id_book) references book(id)
);

_______________________________________________________________________


INSERT INTO country (name) VALUES ('France'), ('USA'), ('Espagne'), ('Allemagne');

insert into `app_user` (pseudo, password, id_country) values ('Patrick', '123456789',2),('Lola', 'pouicpouic', 3),('LoveBooks','darkBG',1);


