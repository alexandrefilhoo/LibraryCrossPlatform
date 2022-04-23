class Book {
    constructor(id, ownerId, category, isbn, title, imageUrl, description, pages, author, year, edition, publisher, price) {
        this.id = id;
        this.ownerId = ownerId;
        this.category = category;
        this.isbn = isbn
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.pages = pages
        this.author = author;
        this.year = year;
        this.edition = edition;
        this.publisher = publisher
        this.price = price
    }
}

export default Book;