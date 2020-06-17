import React from 'react';
import MainLayout from 'src/layout/main';

const Example = {
  name: 'next',
};

const Home = (): JSX.Element => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>
          <p>{Example.name}</p>
        </h1>
      </div>
    </MainLayout>
  );
};

export default Home;
