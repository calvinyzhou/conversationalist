import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
    <footer className="bg-black text-white mt-16 py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">          
            <Image 
              src="/logo.png" 
              alt="The Conversationalist" 
              width={200}
              height={40}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <p className="text-gray-400 mt-4 text-sm">
            Breaking echo chambers, one conversation at a time.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-tc-yellow transition-colors">Map</Link>
            <Link href="/events" className="text-gray-400 hover:text-tc-yellow transition-colors">Events</Link>
            <Link href="/people" className="text-gray-400 hover:text-tc-yellow transition-colors">Find People</Link>
            <Link href="/profile" className="text-gray-400 hover:text-tc-yellow transition-colors">Profile</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Our Mission</h3>
          <p className="text-gray-400 text-sm">
            Empowering 1,000,000 Gen Z&apos;ers to have echo-chamber-breaking conversations.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2025 The Conversationalist. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
}