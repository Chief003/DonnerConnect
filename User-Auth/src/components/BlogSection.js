import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';

const BlogSection = () => {
  const [schools, setSchools] = useState([]);

  const fetchSchoolData = async () => {
    const schoolCollectionRef = collection(firestore, 'School'); // Change collection name if necessary
    try {
      const querySnapshot = await getDocs(schoolCollectionRef);
      const schoolDataArray = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          schoolDataArray.push({
            key: doc.id, // Assuming doc.id is unique for each school
            location: data.Location,
            name: data.Name,
            studentPopulation: data['Student Population'], // Adjust field name if necessary
          });
        } else {
          console.log('No such document!');
        }
      });
      setSchools(schoolDataArray);
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  return (
    <div className="blog-section">
      <div className="container">
        <div className="row">
          {schools.map((school) => (
            <div key={school.key} className="col-12 col-sm-6 col-md-4 mb-5">
              <div className="post-entry">
                <Link to={`/school/${school.key}`} className="post-thumbnail">
                  <img src="images/sc2.jpg" alt="Image" className="img-fluid" />
                </Link>
                <div className="post-content-entry">
                  <h3>
                    <Link to={`/school/${school.key}`}>{school.name}</Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
