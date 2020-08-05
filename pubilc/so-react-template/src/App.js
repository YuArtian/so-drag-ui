import React, { Suspense } from 'react';
import './App.css';
import components from './components.config';

const obj = {}
components.map(component => {
  const name = component.name
  if (obj[name]) return
  obj[name] = React.lazy(() => import(`./components/${name}`));
})


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {
          components.map(one => {
            const OneComponent = obj[one.name]
            return <OneComponent key={one.id} />
          })
        }
      </Suspense>
    </div>
  );
}

export default App;
