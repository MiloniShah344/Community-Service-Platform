import React, { useState } from 'react';
import './MainDashboard.css';
import Dialog from './Dialog'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousal'
import Footer from './Footer';
import Navbar from './Navbar';
import Reviews from './Reviews';
import WhyChooseUs from './WhyChooseUs';

import 'bootstrap/dist/css/bootstrap.min.css';


const MainDashboard = () => {
  let navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleDialogClose = (confirm) => {
    setIsDialogOpen(false);
    if (confirm) {
      console.log("Logout confirmed");
      navigate('/')
    }
  };
  return (
    <div class='mainBody'>
      <div className="dashboard-container">

        <Navbar toggleSidebar={toggleSidebar} />

        <div class='mainWindow'>

          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-item" onClick={toggleSidebar} style={{fontWeight: 700}}>
              <a href="/profile">Current Projects</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/post-project">Registered NGOs</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#about">About Us</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#impact">Out Impact</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#vision">Out Vision</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#feedback">Feedback</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#mission">Out Mission</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="#whyChooseUs">Why Choose Us</a>
            </div>
          </div>

          <div className="main-content">
            {/* <div className="statistics">
        </div> */}
            <Carousel />
          </div>
        </div>
      </div>
      <div class='aboutUs'>
        <h1 id='about'>ABOUT US</h1>
        <div class="abtPara">
          <p>Established with the vision of fostering a culture of service and collective impact, Connecting Goodness is a dynamic platform dedicated to connecting NGOs, volunteers, and donors to drive positive change in communities. Inspired by the resilience of a tree—where deep roots symbolize strong foundations and growing branches represent expanding outreach—Connecting Goodness serves as a bridge between those in need and those willing to contribute their time, skills, and resources.</p>

          <p>With a commitment to social welfare and community engagement, Connecting Goodness facilitates seamless collaboration among stakeholders, ensuring transparent, efficient, and impactful participation in various causes. From education and healthcare to environmental sustainability and disaster relief, the platform supports NGOs in managing projects, mobilizing volunteers, and tracking donations, while empowering individuals to engage in meaningful service.</p>

          <p>Operating across multiple regions, Connecting Goodness enhances the effectiveness of grassroots initiatives by complementing governmental and non-governmental efforts toward Sustainable Development Goals (SDGs). By leveraging technology and collective action, we strive to increase accessibility, improve efficiency, and create long-term behavioral change in communities. Through strategic partnerships with like-minded organizations and individuals, Connecting Goodness aims to cultivate a global movement where acts of kindness and service branch out to create a lasting impact.</p>

          <p>Join Connecting Goodness, where every effort nurtures growth, transforms lives, and builds a better future for all. </p>
        </div>
      </div>

      <div class='impact'>
        <h1 id='impact'>OUR IMPACT</h1>
        <table>
          <tr class='row1'>
            <th>15+</th>
            <th>2000+</th>
            <th>400+</th>
            <th>25+</th>
          </tr>
          <tr class='row2'>
            <td>LAC</td>
            <td>VILLAGES</td>
            <td>PROJECTS</td>
            <td>STATES</td>
          </tr>
          <tr class='row3'>
            <td>children and their families are impacted every year</td>
            <td>and slums are reached out to across the country</td>
            <td>focused on education, healthcare, and women empowerment</td>
            <td>are reached including the remotest areas</td>
          </tr>
        </table>
      </div>

      <div class='aboutUs'>
        <h1 id='vision'>OUR VISION</h1>
        <div class="abtPara">
          <p>
            At Connecting Goodness, we envision a world where kindness, collaboration, and collective action drive meaningful and sustainable change. Just as a strong network of people can uplift communities, our platform serves as a bridge between those who wish to help and those in need, fostering an environment where compassion leads to real impact.
            Our vision is to create a seamlessly connected ecosystem where NGOs, volunteers, and donors unite to tackle pressing social challenges such as education, healthcare, environmental sustainability, and community empowerment. By leveraging technology and human goodwill, Connecting Goodness aims to break down barriers, simplify giving, and ensure that every contribution—big or small—creates a lasting difference.
          </p>

          <p>We believe that sustainable impact begins at the grassroots level, which is why we focus on transparency, accessibility, and long-term engagement. Through innovative solutions and data-driven insights, we empower individuals and organizations to work efficiently, track their impact, and inspire others to join the movement. With a strong commitment to partnerships, accountability, and purpose-driven action, Connecting Goodness aspires to be the go-to platform for social change, motivating people across the globe to come together and create a brighter future.</p>

          <p>Join us in Connecting Goodness, where every small effort sparks change, strengthens communities, and nurtures a world filled with hope and opportunity. 🌍🤝</p>
        </div>
      </div>

<div class='aboutUs'>
        <h1 id='feedback'>FEEDBACK</h1>
      <Reviews />
      </div>

      <div class='aboutUs'>
        <h1 id='mission'>OUR MISSION</h1>
        <div class="abtPara">
          <p>
            At Connecting Goodness, our mission is to bridge the gap between those who want to give and those who need support, creating a seamless and impactful network of NGOs, volunteers, and donors. We strive to make community service, philanthropy, and social engagement more accessible, efficient, and transparent, ensuring that every act of kindness contributes to meaningful change. Our platform is built to empower NGOs by providing the tools they need to manage projects, mobilize resources, and connect with passionate individuals. We enable volunteers to discover and participate in causes that align with their skills and interests, while offering donors a transparent way to track the impact of their contributions.
          </p>

          <p>By harnessing the power of technology and collaboration, we aim to enhance the effectiveness of social initiatives, complementing governmental and non-governmental efforts toward achieving Sustainable Development Goals (SDGs). Our mission is not just to facilitate giving but to cultivate a culture of long-term engagement, trust, and responsibility within communities. Through strategic partnerships, innovation, and an unwavering commitment to social impact, Connecting Goodness seeks to become the leading hub for volunteerism and philanthropy, inspiring individuals and organizations worldwide to take action.</p>

          <p>Together, let’s turn goodwill into action and build a world where every contribution, no matter how small, creates ripples of positive change.  🌍🤝</p>
        </div>
      </div>

      <div class='aboutUs'>
        <h1 id='whyChooseUs'>WHY CHOOSE US</h1>
        <div>
          <WhyChooseUs />
        </div>
      </div>

      <br/><br/>

      <Dialog open={isDialogOpen} onClose={handleDialogClose} />
      <Footer />

    </div>
  );
};

export default MainDashboard;