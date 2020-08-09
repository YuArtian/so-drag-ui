import React, { Suspense } from 'react';
import './App.css';
import components from './components.config';
console.log('components', components)
const obj = {}
components.map(component => {
  console.log('components!!!!!!!', component)
  const name = component.name
  if (obj[name]) return
  obj[name] = React.lazy(() => import(`./components/${name}`));
})


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {
          !components.length && <div className="blank">还没有任何组件哦</div>
        }
        {
          components.map(one => {
            const OneComponent = obj[one.name]
            return <OneComponent key={one.id} dataSource={one.data} />
          })
        }
      </Suspense>
    </div>
  );
}

export default App;
