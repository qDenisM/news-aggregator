import {db} from './db'

async function main() {
    await db.orm.public.Sources
        .where((source) => source.id.isNotNull())
        .deleteAll()
    await db.orm.public.Categories
        .where((category) => category.id.isNotNull())
        .deleteAll()
    await db.orm.public.Tags
        .where((tag) => tag.id.isNotNull())
        .deleteAll()
    await db.orm.public.Articles
        .where((article) => article.id.isNotNull())
        .deleteAll()
    await db.orm.public.ArticleTags
        .where((articleTag) => articleTag.articleId.isNotNull())
        .deleteAll()

    const sources = await db.orm.public.Sources.createAll([
        {
            name: "SportPulse",
            feedUrl: "https://sportpulse.example.com/rss/football.xml",
            siteUrl: "https://sportpulse.example.com",
            language: "ru",
            isActive: true,
            lastFetchedAt: "2026-11-23T16:30:00Z"
        },
        {
            name: "CineRadar",
            feedUrl: "https://cineradar.example.com/feeds/movies.xml",
            siteUrl: "https://cineradar.example.com",
            language: "ru",
            isActive: true,
            lastFetchedAt: "2026-11-23T16:25:00Z",
        },
        {
            name: "TechOrbit",
            feedUrl: "https://techorbit.example.com/rss/all.xml",
            siteUrl: "https://techorbit.example.com",
            language: "ru",
            isActive: true,
            lastFetchedAt: "2026-11-23T16:28:00Z"
        },
    ])
    
    const categories = await db.orm.public.Categories.createAll([
        {
            name: "Футбол"
        },
        {
            name: "Фильмы"
        },
        {
            name: "Трейлеры"
        },
        {
            name: "Технологии"
        },
    ])
    const tags = await db.orm.public.Tags.createAll([
        {
            name: "Слух"
        },
        {
            name: "Трансферы"
        },
        {
            name: "Премьера"
        },
        {
            name: "Популярное"
        },
    ])
    

    const articles = await db.orm.public.Articles.createAll([
        {
            sourceId: sources[0].id,
            categoryId: categories[0].id,
            title: "Клуб из топ-5 лиг готовит зимнее предложение по полузащитнику",
            url: "https://sportpulse.example.com/football/winter-bid-midfielder",
            description: "По данным инсайдеров, переговоры между представителями игрока и клубом находятся на ранней стадии.",
            content: "Полный текст заметки о возможных зимних трансферах, сумме отступных и позиции текущего клуба футболиста.",
            imageUrl: "https://cdn.example.com/images/football-transfer.jpg",
            author: "Алексей Соколов",
            status: "PUBLISHED",
            publishedAt: "2026-11-23T15:40:00Z"
        },
        {
            sourceId: sources[1].id,
            categoryId: categories[2].id,
            title: "Вышел первый тизер-трейлер фантастического триллера «Орбита нуля»",
            url: "https://cineradar.example.com/trailers/orbita-nulya-teaser",
            description: "Студия показала двухминутный ролик с кадрами со съёмок и назвала примерное окно выхода в прокат.",
            content: "Подробный разбор сцен из тизера, актёрского состава и творческой команды проекта.",
            imageUrl: "https://cdn.example.com/images/orbita-teaser.jpg",
            author: "Мария Волкова",
            status: "PUBLISHED",
            publishedAt: "2026-11-23T14:15:00Z"
        },
        {
            sourceId: sources[2].id,
            categoryId: categories[3].id,
            title: "Новый релиз локальных моделей ускорил суммаризацию длинных текстов",
            url: "https://techorbit.example.com/tech/local-models-summarization",
            description: "Разработчики представили обновлённые веса и снизили задержку генерации на пользовательском железе.",
            content: "Разбор бенчмарков, потребления памяти и сценариев применения для новостных агрегаторов и поиска.",
            imageUrl: "https://cdn.example.com/images/local-llm.jpg",
            author: "Илья Громов",
            status: "PUBLISHED",
            publishedAt: "2026-11-23T12:00:00Z"
        },
        {
            sourceId: sources[1].id,
            categoryId: categories[2].id,
            title: "Критики оценили дебютную драму режиссёра после закрытого показа",
            url: "https://cineradar.example.com/movies/debut-drama-first-reviews",
            description: "Первые рецензии отмечают операторскую работу, камерный темп и сценарий.",
            content: "Обзор первых откликов зрителей и кинокритиков перед широким стартом в кинотеатрах.",
            imageUrl: "https://cdn.example.com/images/drama-premiere.jpg",
            author: "Елена Орлова",
            status: "DRAFT",
            publishedAt: "2026-11-22T19:30:00Z"
        }
    ])

    const articleTags = await db.orm.public.ArticleTags.createAll([
        {
            articleId: articles[0].id,
            tagId: tags[0].id,
        },
        {
            articleId: articles[0].id,
            tagId: tags[1].id,
        },
        {
            articleId: articles[1].id,
            tagId: tags[2].id,
        },
        {
            articleId: articles[2].id,
            tagId: tags[3].id,
        },
        {
            articleId: articles[3].id,
            tagId: tags[2].id,
        }
    ])
    console.log("Data uploaded")
    await db.close()
}
main()