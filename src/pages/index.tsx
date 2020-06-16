import React from 'react';

const Example = {
  name: 'next',
};

const Home = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>
        <p>{Example.name}</p>
      </h1>
    </div>
  );
};

export default Home;
