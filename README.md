# As usual:

### `npm start`
To start the app at [http://localhost:3000](http://localhost:3000)

### `npm run build`
To minfy and ready the app for production

# A little expanation:

This is a hands-on test application for Scandiweb. It is built as per given design. Backend had also been provided. App is made with React.

### App includes:

+ Filter for items - each category filter itemn by their category namge, I also added 'all' category, that displays all items regardless of the category. (Shop logo also sets filter to 'all')
+ Change of currency - all that are in the API are included and changed dinamically. Currency can be changed at any page at any time.
+ Mini shopping cart - displays all items added to shoping cart, it is also possible to change attributes in the mini shopping cart. Also has a link to full shopping cart and checkout.
+ Product listing - section with all the items. It devides all items into 6 item arrays and shows 6 items per page.
+ Product page - here each item can be viewed in detail. Includes scrollable images, brand name, product name, changable attributes,  price, description and 'add to cart' button.
+ 'Add to cart' shortcut - In product listing page if a product is hovered on an icon appears to quickly add the product to cart with default attributes. If this item is already in cart, the icon does not show up.
+ Shopping bag page - a list of all products that were added to cart, all attributes can be changed, product amount can be changed, also can scroll through images of the product.
+ Remove item button - any item can be removed by pressing 'X' in the corner, either in mini-cart or in shopping bag page.
+ Total price - dinamically calculates total of all prices of items added to shopping cart.

### Some core decisions:

+ I decided to make only one API call in the beginning (even though it's cleary designed to have multiple calls to get specific data) and then do all the data manipulations on the front-end. This made the front-end heavier but also puts less pressure on back-end.
+ I wanted to make it a single page application, thats why I did not use a router. So that the page is loaded only once and then the page itself does all the data manipulations.  All sections are changable components on one main App component.
+ I made a pagination system in Product Listing Page, though it was not expected. PLP shows 6 items per page in a 3x2 grid. Since every product has an image, I thought it would be better to not load them all at the same time.


