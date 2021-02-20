import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About us</h1>
      <p className='my-1'>
        This is a contact keeping application with some primitive CRUD features
        for demo purposes. It was written using React V17 and has a node/express
        based API/BE with a free-tier MongoDB cluster as the persistence layer.
      </p>
      <p className='my-1 pg-dark'>
        <strong>version:</strong> 0.1.0
      </p>
    </div>
  );
};

export default About;
