class Article {
    _id: string;
    image: string;
    title: string;
    description: string;
    date: Date;

    constructor() {
        this.image = ""
        this.title = ""
        this.description = ""
        this.date = new Date()
    }
}

export default Article;