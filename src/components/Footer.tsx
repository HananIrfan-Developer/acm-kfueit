import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/50 pt-16 pb-8 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="https://vui.unsplash.com/resize?height=256&quality=60&type=auto&url=https%3A%2F%2Fsearched-images.s3.us-west-2.amazonaws.com%2F3ec28cc8-6486-4a1f-9f4f-7d3d09d4d592%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAQ4GRIA4QTG2PSHUB%252F20260404%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20260404T091013Z%26X-Amz-Expires%3D86400%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3Da6e14384e355f8346be50ba8a97b3baa120eb28b3cc87fe6aef2863905ef2165&sign=WjU_fZ2nNFX1oUXEY8Pqd3FMDOLpvJ2at0PmgvT1Ps8" alt="ACM KFUEIT Logo" className="h-12 w-auto object-contain rounded-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                ACM <span className="text-blue-600">KFUEIT</span>
              </span>
            </Link>
            <p className="text-slate-600 max-w-md leading-relaxed">
              ACM is an International society's chapter working in KFUEIT for the development of Candidates.
              <br /><br />
              <strong className="text-blue-600">Learn. Build. Innovate. Connect.</strong>
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-slate-600 hover:text-blue-600 transition-colors">Events</Link></li>
              <li><Link to="/members" className="text-slate-600 hover:text-blue-600 transition-colors">Members</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="text-slate-600 hover:text-blue-600 transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-6 text-lg">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-blue-600" />
                <a href="mailto:acmkfueitt@gmail.com" className="hover:text-blue-600 transition-colors">acmkfueitt@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-blue-600" />
                <span>KFUEIT, Abu Dhabi Rd, Rahim Yar Khan, Punjab, Pakistan</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              <a href="https://www.instagram.com/acm.kfueitt/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/ACMKfueitStudentChapter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/posts/acm-kfueit-student-chapter_acm-acmkfueit-kfueit-activity-7400566654943969280-rM7s" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200/50 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ACM KFUEIT Student Chapter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
