/**
 * Class representation of a book
 * Example :
 * {
 *    "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
 *    "title": "Henri Potier à l'école des sorciers",
 *    "price": 35,
 *    "cover": "http://henri-potier.xebia.fr/hp0.jpg",
 *    "synopsis" : [{"Lorem Ipsum...."},{"Lorem Ipsum...."}]
 * }
 *
 * The quantity is used to handle the quantity added to the basket
 *
 */
export class Book {
  isbn: string;
  title: string;
  price: number;
  quantity: number;
  cover: string;
  synopsis: string[];
}
