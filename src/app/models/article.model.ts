class Article {
    _id: string;
    title: string;
    description: string;
    date: Date;
    image: string;

    constructor() {
        this.title = "";
        this.description = "";
        this.date = new Date();
        this.image = "";
    }
}

export default Article;