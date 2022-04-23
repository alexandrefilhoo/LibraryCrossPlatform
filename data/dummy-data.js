import Book from '../models/book'
import Category from '../models/category';


export const CATEGORIES = [

    new Category('c1', 'Computing', '#f5428d'),
    new Category('c2', 'Architecture', '#f54242'),
    new Category('c3', 'Engineering', '#f5a442'),
    new Category('c4', 'Creative Industries', '#f5d142'),
    new Category('c5', 'Education', '#368dff'),
    new Category('c6', 'Bioscience', '#41d95d'),
    new Category('c7', 'Business', '#9eecff'),
    new Category('c8', 'Law ', '#b9ffb0'),
    new Category('c9', 'Pyscology', '#ffc7ff'),
    new Category('c10', 'Arts', '#47fced')
]
const BOOKS = [
    new Book(
        'b1',
        'u1',
        'Computing',
        '1292263423',
        'Computer Science: An Overview',
        'https://images-na.ssl-images-amazon.com/images/I/512NNTG0W6L._SX258_BO1,204,203,200_.jpg',
        'Computer Science: An Overview is written for students of computer science as well as students from other disciplines. Its broad coverage and clear exposition are accessible to students from all backgrounds, encouraging a practical and realistic understanding of the subject.',
        ' 736',
        'J.Glenn Brookshear ',
        '2019',
        '13th edition',
        'Pearson',
        3.50
    ),
    new Book(
        'b2',
        'u1',
        'Mathematics',
        '1260091996',
        'Discrete Mathematics and Its Applications.',
        'https://images-na.ssl-images-amazon.com/images/I/81ohWsXuZ3L.jpg',
        "Rosen's Discrete Mathematics and its Applications presents a precise, relevant, comprehensive approach to mathematical concepts. This world-renowned best-selling text was written to accommodate the needs across a variety of majors and departments, including mathematics, computer science, and engineering.",
        '2240',
        'Kenneth H. Rosen',
        '2018',
        '8rd edition',
        'Mc Graw Hill Education',
        2.50
    ),
    new Book(
        'b3',
        'u2',
        'Biology',
        '9781454910688',
        'The Biology Book',
        'https://images-na.ssl-images-amazon.com/images/I/71JPAI-gbgL.jpg',
        "From the emergence of life, to Leewenhoek's microscopic world, to GMO crops, The Biology Book presents 250 landmarks in the most widely studied scientific field. Brief, engaging, and colourfully illustrated synopses introduce readers to every major subdiscipline, including cell theory, genetics, evolution, physiology, thermodynamics, molecular biology and ecology. With information on such varied topics as paleontology, pheromones, nature vs. nurture, DNA fingerprinting, bioenergetics, and so much more, this lively collection will engage everyone who studies and appreciates the life sciences.",
        '528',
        'Michael C. Gerald',
        '2015',
        '1st edition',
        'Sterling',
        2.20
    )
]

export default BOOKS;