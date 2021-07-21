import { Country } from "./models/southamerica.js";

// // find all documents
// Country.find({}, (err, result) => {
//     if(err){
//         console.log(err);
//     } else{
//         console.log(result);
//     }
//     return
// });

// // count # of docs
// console.log("step 1")
// Country.countDocuments((err, result) =>{
//     console.log("step 2")
//     console.log(result + " db entries");
// });
// console.log("step 3")

// return all records
Country.find({}).lean()
  .then((countries) => {
    console.log(countries);
  })
  .catch(err => next(err));

// // return all records that match a condition
// Country.find({"author": "Smith" }).lean()
//   .then((books) => {
//     console.log(book);
//   })
//   .catch(err => next(err));

// // return a single record
// Country.findOne({"title": "Dune" }).lean()
//   .then((book) => {
//       console.log(book);;
//   })
//   .catch(err => next(err));

// // insert or update a single record
// const newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
// Book.update({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
//   if (err) return next(err);
//   console.log(result);
//   // other code here
// });