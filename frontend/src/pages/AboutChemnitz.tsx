import oldPhoto1 from "../assets/karl-marx.avif";
import oldPhoto2 from '../assets/town-halls.jpg'
import oldPhoto3 from '../assets/market-square.jpg'
import oldPhoto4 from '../assets/red-towejpg.jpg'
import oldPhoto5 from '../assets/stadhalle.jpg'
import oldPhoto6 from '../assets/schlossberg.webp'
import oldPhoto7 from '../assets/theaterplatz.webp'
import oldPhoto8 from '../assets/museum-gunzenhauser.jpg'
const highlights = [
  {
    title: "Karl Marx Monument",
    description:
      "This large bronze statue, called 'Nischel' by locals, was built in 1971. It stands as a strong symbol of Chemnitz’s industrial history and honors the hardworking people of the city.",
    image: oldPhoto1,
  },
  {
    title: "Old and New Town Halls",
    description:
      "The Old Town Hall, carefully rebuilt, shows the city’s long history, while the New Town Hall is known for its beautiful carillon music. Together, they represent Chemnitz’s past and present.",
    image: oldPhoto2,
  },
  {
    title: "Market Square (Marktplatz)",
    description:
      "Since the 12th century, Market Square has been the center of life in Chemnitz. Surrounded by historic buildings like the Church of St. Jakobi, it is a place where people gather and share stories.",
    image: oldPhoto3,
  },
  {
    title: "Red Tower (Roter Turm)",
    description:
      "The Red Tower is one of the oldest buildings in Chemnitz. It was once part of the city’s walls and reminds us of the city’s long history of protection and strength.",
    image: oldPhoto4,
  },
  {
    title: "Stadthalle Chemnitz",
    description:
      "Built between 1969 and 1974, Stadthalle is a well-known cultural center. Its unique stone facade makes it special, and it hosts many concerts and events for the city.",
    image: oldPhoto5,
  },
  {
    title: "Schloßberg Museum",
    description:
      "Located on Schloßberg Hill, this museum is set in old abbey and castle buildings. It shows medieval art and tells the story of Chemnitz’s history.",
    image: oldPhoto6,
  },
  {
    title: "Theaterplatz",
    description:
      "Theaterplatz is an important square in Chemnitz. It is home to the Opera House, art collections, and the Petrikirche church — a place full of culture and history.",
    image: oldPhoto7,
  },
  {
    title: "Gunzenhauser Museum",
    description:
      "This museum is known for its collection of modern art, including works by Otto Dix. It is housed in a historic building and connects the past with today’s art.",
    image: oldPhoto8,
  },
];

export default function ReadMoreMagazine() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif font-bold mb-12 text-center">
        Discover Chemnitz: A Journey Through Time
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        {highlights.map((spot, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-[1.01] transition duration-300"
          >
            <img
              src={spot.image}
              alt={spot.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
                {spot.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {spot.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}