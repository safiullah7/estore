create schema estore

Create table estore.categories (
	id int not null,
    category varchar(45) default null,
    parent_category_id int default null,
    primary key (id)
);

insert into estore.categories (id, category, parent_category_id)
values 
(1, 'Men', null),
(2, 'Women', null),
(3, 'Kids', null),
(4, 'Casual wear', 1),
(5, 'Sports wear', 1),
(6, 'Party wear', 2),
(7, 'Foot wear', 2),
(8, 'Accessories', 3),
(9, 'Extras', 3);

create table estore.products (
	id int not null,
    product_name varchar(45) default null,
    product_description varchar(100) default null,
    price decimal(10,0) default null,
    ratings int default null,
    category_id int default null,
    product_img varchar(500),
    primary key (id),
    Key FK_Products_Categories_id(category_id),
    constraint FK_Products_Categories
    foreign key (category_id) references estore.categories (id)
    on update cascade on delete cascade
);
insert into estore.products
(id, product_name, product_description, price, ratings, category_id, product_img)
values
(1, 'Jacket', 'jacket desc', 100, 5, 1, 'https://media.istockphoto.com/id/621860412/photo/fashion-clothes-on-two-female-mannequins.jpg?s=1024x1024&w=is&k=20&c=GmgaY4GTPIw5SUbBDxF8ovp2xkI1F5agHV1n9J4PkJ8='),
(2, 'Female tops', 'Female tops desc', 100, 5, 2, 'https://media.istockphoto.com/id/1143977236/photo/two-full-length-male-mannequins.jpg?s=1024x1024&w=is&k=20&c=oydEUDvwjmlAO8BXQ48D00WTM0fXAFNcJDLjT08c2mE='),
(3, 'Women upper', 'Women upper desc', 100, 4.5, 3, 'https://media.istockphoto.com/id/639803880/photo/four-female-mannequins.jpg?s=1024x1024&w=is&k=20&c=LenA8PPsbkLw44f0HwNTDdm_Qm5kSs1laQTQ3j6mpF8='),
(4, 'Women sweater', 'Women sweater desc', 100, 3, 4, 'https://media.istockphoto.com/id/902167860/photo/full-length-female-mannequin.jpg?s=1024x1024&w=is&k=20&c=eFL8ecTw-z-rtW3ENw5FX8zKqUBh4ynKEDro2I1ZHwc='),
(5, 'ladies Top', 'ladies topv desc', 100, 5, 5, 'https://media.istockphoto.com/id/651512962/photo/two-female-mannequins.jpg?s=1024x1024&w=is&k=20&c=X0W_NKNWyYwkmBnqz5AW2_rpeiPG-wTsrw7WR1vd-6I='),
(6, 'Mens casual', 'Mens casual desc', 100, 1, 6, 'https://media.istockphoto.com/id/902167860/photo/full-length-female-mannequin.jpg?s=1024x1024&w=is&k=20&c=eFL8ecTw-z-rtW3ENw5FX8zKqUBh4ynKEDro2I1ZHwc='),
(7, 'Mens beach outfit', 'Mens beach outfit desc', 100, 2.5, 7, 'https://media.istockphoto.com/id/960566954/photo/full-length-man-mannequin.jpg?s=1024x1024&w=is&k=20&c=bDsPpy5j4N53-0wGo5tA-aJTvqviId4l6V3xyuQ1U4g='),
(8, 'Kids party wear', 'Kids party wear desc', 100, 5, 8, 'https://www.shutterstock.com/image-photo/poland-bydgoszcz-january-14-2022-260nw-2149795577.jpg'),
(9, 'Kids home wear', 'Kids home wear desc', 100, 5, 2, 'https://www.shutterstock.com/image-photo/poland-bydgoszcz-july-19-2023-260nw-2550280605.jpg'),
(10, 'Kids casual fit', 'Kids casual fit desc', 100, 5, 1, 'https://www.shutterstock.com/image-photo/poland-bydgoszcz-august-11-2022-260nw-2196373229.jpg');

alter table estore.products 
add column keywords varchar(200) null;

update estore.products set keywords = 'jacket,woolen,black' where id = 1;
update estore.products set keywords = 'bag,purse,leather,black' where id = 2;
update estore.products set keywords = 'dress,party,frock' where id = 3;
update estore.products set keywords = 'denim,jeans,casual,pant' where id = 4;
update estore.products set keywords = 'boots,laced,yellow' where id = 5;
update estore.products set keywords = 'leather,black,bag' where id = 6;
update estore.products set keywords = 'ear,rings,blue,golden' where id = 7;
update estore.products set keywords = 'scarf,chocolate,party' where id = 8;
update estore.products set keywords = 'leather,black,boots' where id = 9;

create table estore.users (
	id int not null auto_increment,
    email varchar(45) not null,
    firstName varchar(45) default null,
    lastName varchar(45) default null,
    address varchar(200) default null,
    city varchar(45) default null,
    state varchar(45) default null,
    pin varchar(10) default null,
    password varchar(200) default null,
    primary key(id)
);

create table estore.orders (
	orderId int not null auto_increment,
    orderDate datetime default current_timestamp,
    userName varchar(100) default null,
    address varchar(200) default null,
    city varchar(45) default null,
    state varchar(45) default null,
    pin varchar(45) default null,
    email varchar(45) default null,
    total decimal(10,0) default null,
    userId int default null,
    primary key (orderId),
    key FK_User_idx (userId),
    constraint FK_User foreign key (userId) references users (id)
);
create table estore.orderdetails (
	orderId int not null,
    productId int default null,
    qty int default null,
    price decimal(10,0) default null,
    amount decimal(10,0) default null,
    key FK_OrderId_idx (orderId),
    key FK_ProductId_idx (productId),
    constraint FK_OrderId_idx foreign key (orderId) references orders (orderId),
    constraint FK_ProductId_idx foreign key (productId) references products (id)
);





