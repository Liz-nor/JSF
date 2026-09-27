import { Link } from '@tanstack/react-router';
import { ShoppingBag, Target, ThumbsUp } from 'lucide-react';

const sections = [
  {
    icon: ShoppingBag,
    title: 'What We Do',
    text: "We offer a variety of products across different categories, with a focus on quality, value, and a smooth shopping experience. Whether you're looking for something practical, something new, or the perfect gift, we hope you'll find it here.",
  },
  {
    icon: Target,
    title: 'Our Mission',
    text: "Our mission is to make online shopping easy and accessible. From browsing our products to completing your order, we've designed our store with simplicity and usability in mind.",
  },
  {
    icon: ThumbsUp,
    title: 'Why Shop With Us?',
    text: 'We aim to provide a straightforward shopping experience with clear product information, competitive prices, and an easy-to-use website.',
  },
];

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-12">
      <section className="flex flex-col items-center text-center">
        <h1>Welcome to our store!</h1>
        <p className="max-w-2xl text-lg">
          We believe shopping online should be simple, enjoyable, and
          convenient. Our goal is to bring together a carefully selected range
          of products so you can easily find something that suits your needs
          and style.
        </p>
      </section>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex flex-col items-center text-center gap-3 border border-(--border) rounded-lg p-6 bg-(--social-bg) shadow-sm"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-(--accent-bg) text-(--accent)">
              <Icon className="w-6 h-6" />
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
          </li>
        ))}
      </ul>

      <section className="flex flex-col items-center gap-6 border-t border-(--border) pt-10">
        <h2>Thanks for stopping by. We hope you enjoy exploring our store!</h2>
        <Link
          to="/"
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold transition hover:bg-gray-800"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}

export default AboutPage;
