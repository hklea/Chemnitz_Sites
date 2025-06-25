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
      "A towering 7.1-meter bronze sculpture unveiled in 1971, symbolizing Chemnitz's industrial legacy. Nicknamed 'Nischel', it's a cultural icon.",
    image:oldPhoto1,
  },
  {
    title: "Old and New Town Halls",
    description:
      "Experience the juxtaposition of the reconstructed Old Town Hall and the preserved New Town Hall, known for their carillons and charm.",
    image: oldPhoto2,
  },
  {
    title: "Market Square (Marktplatz)",
    description:
      "Dating back to the 12th century, this square is surrounded by historic buildings like the Church of St. Jakobi and Gewandhaus.",
    image: oldPhoto3,
  },
  {
    title: "Red Tower (Roter Turm)",
    description:
      "Among the oldest structures in Chemnitz, once part of the medieval city fortifications.",
    image: oldPhoto4,
  },
  {
    title: "Stadthalle Chemnitz",
    description:
      "Cultural venue built between 1969–1974, known for its Rochlitz porphyry facade and unique design.",
    image: oldPhoto5,
  },
  {
    title: "Schloßberg Museum",
    description:
      "Located on the historic hill, this museum features the former abbey and castle structures with medieval art.",
    image: oldPhoto6,
  },
  {
    title: "Theaterplatz",
    description:
      "One of Chemnitz’s most elegant squares, featuring the Opera House, Kunstsammlungen, and Petrikirche.",
    image:oldPhoto7,
  },
  {
    title: "Gunzenhauser Museum",
    description:
      "A modern art museum in a historic building, showcasing works by Otto Dix and other 20th-century artists.",
    image: oldPhoto8,
  },
  // {
  //   title: "Botanical Garden Chemnitz",
  //   description:
  //     "Spanning 12 hectares, this garden features diverse flora from across the world in serene surroundings.",
  //   image: "/images/botanical-garden.jpg",
  // },
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