import linkedin_image from "../../../public/assets/images/linkedin.png";
import Image from "next/image";
import twitter_image from "../../../public/assets/images/twitter.png";
import Link from "next/link";
import github_image from "../../../public/assets/images/fb.png";
import whatsapp_image from "../../../public/assets/images/whatsapp.png";
import profile_pic from "../../../public/assets/images/pic1.jpg";
import { FaThumbsUp } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import React, { useState, useRef } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CandidatePortfolio: React.FC = () => {
  const linkedinUrl = "https://www.linkedin.com/in/creative-programmer";
  const githubUrl = "https://www.github.com/ahmedmujtaba1";
  const twitterUrl = "https://twitter.com/Ahmed_Mujtaba69";
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=923312269636&text&type=phone_number&app_absent=0";

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handlePostComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const lineChartData1 = {
    labels: ["1999", "2005", "2010", "2015", "2019","2024"],
    datasets: [
      {
        label: "Vote Distribution through out the years(Presidential)",
        data: [65, 59, 80, 81, 56, 55, 40, 85, 92, 78, 110, 130],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const lineChartData2 = {
    labels: ["2000", "2001", "2004", "2010", "2015", "2020","2024"],
    datasets: [
      {
        label: "Vote Distribution through out the years(Parliament)",
        data: [150, 120, 100, 170, 130, 110, 140, 160, 180, 190, 210, 230],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div id="about" style={{ padding: "20px", backgroundColor: "#ffffff" }}>
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-4 text-black">Hello, I’m Namal Perera </h1>
          <h2 className="text-xl font-bold mb-4 text-black">NPP- National People Party </h2>
          <p className="text-xl text-black">
            <span className="font-bold custom-class text-3xl">❝</span>
            As a dedicated public servant, I am committed to fostering transparency,
             advocating for community-driven policies, 
             and ensuring that every voice in our district is heard and represented.
            <span className="font-bold custom-class text-3xl">❞</span>
          </p>
          <div className="flex items-center justify-between mt-6">
            <button
              className="px-5 py-2 bg-blue-500 text-white rounded-full"
              onClick={handleOpen}
            >
              Review Me
            </button>
            <div
              className={`cursor-pointer text-2xl ${liked ? "text-blue-500" : "text-gray-500"}`}
              onClick={handleLikeClick}
            >
              <FaThumbsUp />
            </div>
          </div>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <div className="w-14 h-14 mb-4 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center justify-center">
                <div className="flex h-10 w-10 place-content-center">
                  <Image src={linkedin_image} alt="LinkedIn Logo" />
                </div>
              </div>
            </Link>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <div className="w-14 h-14 mb-4 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center justify-center">
                <div className="flex h-10 w-10 place-content-center">
                  <Image src={github_image} alt="Github Logo" />
                </div>
              </div>
            </Link>
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <div className="w-14 h-14 mb-4 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center justify-center">
                <div className="flex h-10 w-10 place-content-center">
                  <Image src={twitter_image} alt="Twitter Logo" />
                </div>
              </div>
            </Link>
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <div className="w-14 h-14 mb-4 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center justify-center">
                <div className="flex h-10 w-10 place-content-center">
                  <Image src={whatsapp_image} alt="Whatsapp Logo" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
          <Image src={profile_pic} alt={"Profile Picture"} width={1300} />
        </div>
      </div>
      <section className="max-w-[1240px] m-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">My Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-xl shadow-xl hover:scale-105 ease-in duration-300">
            <div className="p-4 bg-white rounded-b-xl">
              <h3 className="text-xl font-bold text-black">Bio Data</h3>
              <ul className="text-gray-600 mt-2 space-y-2">
                <li><strong>Date of Birth:</strong> January 1, 1990</li>
                <li><strong>Nationality:</strong> Sri Lankan</li>
                <li><strong>Religion:</strong> Katholic</li>
                <li><strong>Marital Status:</strong> Married</li>
                <li><strong>Estimated Networth:</strong> 300000$</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl shadow-xl hover:scale-105 ease-in duration-300">
            <div className="p-4 bg-white rounded-b-xl">
              <h3 className="text-xl font-bold text-black">Education Qualifications</h3>
              <ul className="text-gray-600 mt-2 space-y-2">
                <li><strong>Bachelor's Degree:</strong> B.Sc. in Computer Science, XYZ University, 2012</li>
                <li><strong>Master's Degree:</strong> M.Sc. in Data Science, ABC University, 2015</li>
                <li><strong>Certifications:</strong> AWS Certified Solutions Architect, 2018</li>
                <li><strong>High School:</strong> High School Diploma, ABC High School, 2008</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl shadow-xl hover:scale-105 ease-in duration-300">
            <div className="p-4 bg-white rounded-b-xl">
              <h3 className="text-xl font-bold text-black">Professional Experience</h3>
              <ul className="text-gray-600 mt-2 space-y-2">
                <li><strong>Software Developer:</strong> XYZ Tech Solutions, 2015–2018</li>
                <li><strong>Data Analyst:</strong> ABC Data Labs, 2018–2020</li>
                <li><strong>Senior Data Scientist:</strong> DEF Analytics, 2020–Present</li>
                <li><strong>Freelance Projects:</strong> Multiple AI and web development projects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-[1240px] m-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Voting History</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl shadow-xl p-4" style={{ backgroundColor: "#ffffff" }}>
            <h3 className="text-xl font-semibold text-center text-black mb-4">Presidential</h3>
            <Line data={lineChartData1} />
          </div>
          <div className="rounded-xl shadow-xl p-4" style={{ backgroundColor: "#ffffff" }}>
            <h3 className="text-xl font-semibold text-center text-black mb-4">Parliament</h3>
            <Line data={lineChartData2} />
          </div>
        </div>
      </section>
      <div ref={commentSectionRef} className="max-w-[1240px] m-auto py-16 mt-10 rounded-xl shadow-xl p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-black">Reviews </h2>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            className="flex-grow border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
            onClick={handlePostComment}
          >
            Post
          </button>
        </div>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
              <img src="/assets/images/profile.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
              <p className="text-gray-700">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidatePortfolio;