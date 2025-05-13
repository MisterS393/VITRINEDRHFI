import React from 'react';
import { Monitor, HelpCircle, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { step } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            <h1 className="text-xl font-bold hidden sm:block">ANARGEMA IT SUPPORT </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-primary-200 transition-colors"></a>
            <a href="#" className="hover:text-primary-200 transition-colors">About</a>
            <a href="#" className="hover:text-primary-200 transition-colors">Contact</a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-primary-800 px-4 py-2 animate-fade-in">
            <a href="#" className="block py-2 text-primary-100 hover:text-white"></a>
            <a href="#" className="block py-2 text-primary-100 hover:text-white"></a>
            <a href="#" className="block py-2 text-primary-100 hover:text-white"></a>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-end items-center mb-4">
            <h2 className="text-2xl font-bold text-neutral-800">"يرجى تقديم تفاصيل حتى نتمكن من العودة إليك بشأن طلبك الخاص." </h2>
            <button className="flex items-center text-primary-600 hover:text-primary-800">
              <HelpCircle className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline"></span>
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-primary-100 text-primary-700' : 'bg-neutral-200 text-neutral-500'}`}>1</div>
                <p className="text-sm">Requester Info</p>
              </div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-primary-100 text-primary-700' : 'bg-neutral-200 text-neutral-500'}`}>2</div>
                <p className="text-sm">Issue Details</p>
              </div>
              <div className={`flex-1 text-center ${step >= 3 ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-primary-100 text-primary-700' : 'bg-neutral-200 text-neutral-500'}`}>3</div>
                <p className="text-sm">Review</p>
              </div>
              <div className={`flex-1 text-center ${step >= 4 ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center mb-1 ${step >= 4 ? 'bg-primary-100 text-primary-700' : 'bg-neutral-200 text-neutral-500'}`}>4</div>
                <p className="text-sm">PDF & Email</p>
              </div>
            </div>
            
            <div className="relative mt-2">
              <div className="h-1 w-full bg-neutral-200 rounded">
                <div 
                  className="h-1 bg-primary-500 rounded transition-all duration-300 ease-in-out" 
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      <footer className="bg-neutral-800 text-neutral-300 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="h-5 w-5 text-primary-400" />
                <span className="font-bold text-white">IT Support Portal</span>
              </div>
              <p className="text-sm text-neutral-400"></p>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} AMS.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;