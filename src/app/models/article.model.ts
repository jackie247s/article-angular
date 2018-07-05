class Article {
    _id: string;
    image: File;
    title: string;
    description: string;
    date: Date;

    constructor() {
        this.title = ""
        this.description = ""
        this.date = new Date()
    }
}

export default Article;