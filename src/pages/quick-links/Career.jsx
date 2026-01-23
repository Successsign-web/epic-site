import React from 'react';
import { Mail, Briefcase } from 'lucide-react';

const Career = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Careers at Epic Wedding</h1>
          <p className="text-lg text-gray-600 mt-2">Join our passionate team and help us create unforgettable weddings!</p>
        </div>

        <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-8">
          <p>
            At Epic Wedding, we're building something special: a platform that simplifies wedding planning and connects couples with the best vendors in the industry. We're a fast-growing company always on the lookout for talented, driven, and creative individuals to join our team. If you're passionate about weddings, technology, and making a real impact, we'd love to hear from you.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 pt-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-red-600" />
            Current Openings
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Wedding Planning Specialist</h3>
              <p className="text-gray-600 mt-1">Full-time | Gurugram, Haryana</p>
              <p className="mt-3">
                We're seeking an experienced Wedding Planning Specialist to guide couples through their wedding journey, offering expert advice and connecting them with suitable vendors. Strong communication and organizational skills are a must.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Frontend Developer (React)</h3>
              <p className="text-gray-600 mt-1">Full-time | Remote</p>
              <p className="mt-3">
                Join our tech team to build and maintain the user-facing features of our platform. We're looking for a React expert with a keen eye for UI/UX and a passion for creating seamless web experiences.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Digital Marketing Executive</h3>
              <p className="text-gray-600 mt-1">Full-time | Gurugram, Haryana</p>
              <p className="mt-3">
                We need a dynamic Digital Marketing Executive to help us expand our reach and engage with more couples. Experience in SEO, social media marketing, and content creation is highly valued.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 pt-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-red-600" />
            How to Apply
          </h2>
          <p>
            If you're interested in any of these roles or believe you can contribute to our mission in another way, please send your resume and a cover letter to our HR team. Be sure to mention the position you are applying for in the subject line.
          </p>
          <div className="text-center mt-6">
            <a href="mailto:info@wedplanners.in" className="btngradiant text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Send Your Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
