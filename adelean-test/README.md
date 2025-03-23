# Test Adelean

### Reminder of the exercise

Products overview
- The user can view the list of available products in a table, and more specifically each product’s name, category and price
- The user can filter table rows by keyword, in particular by product name and category (you can use separate column filters; bonus: allow filtering using one single search bar instead of column filtering)
- The table must be paginated and the columns must be sortable
- When clicking on the product name inside each table row, the user can access the product detail page (it must be on a different route)
- Bonus: the user can delete a product by clicking on a dedicated action button on the corresponding row
- Bonus: the user can edit the product price Product detail

- The user can view the product name, image, description, category and price
- The user can go back to the home page


**Resources**
APIs: 
- GET all products: https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts
- GET single product: https://fakestoreapi.com/docs#tag/Products/operation/getProductById
- DELETE product: https://fakestoreapi.com/docs#tag/Products/operation/deleteProduct
- PUT product: https://fakestoreapi.com/docs#tag/Products/operation/updateProduct

**Component Library**
To complete the exercise you need to use React with PrimeReact, a comprehensive component library with pre-styled components that can help you build your app design and functionality. 

You can use a theme of your choice.

Hint: an example of useful components for the task are DataTable (for the table) and IconField (for the search bar).

Focus on building a solid project structure and a coherent design for your app.


### Installation & run locally

```sh
pnpm install
pnpm dev
# OR
npm install
npm run dev
```
