import 'rsuite/dist/rsuite.min.css'
import './App.css'
import { Sidenav, Nav } from 'rsuite'
import { Dashboard } from '@rsuite/icons'
import { useState } from 'react'

function App() {
  const [activeKey, setActiveKey] = useState('home')
  const handleChangeKey = eventKey => setActiveKey(eventKey)

  return (
    <div>
      <div className="nav-wrapper">
        <Sidenav>
          <Sidenav.Body>
            <Nav activeKey={activeKey}>
              <Nav.Item eventKey="home" icon={<Dashboard />} onSelect={handleChangeKey}>
                Home
              </Nav.Item>
              <Nav.Item eventKey="logs" onSelect={handleChangeKey}>
                Logs
              </Nav.Item>
              <Nav.Item eventKey="traces" onSelect={handleChangeKey}>
                Traces
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      <main className="main">
        <h1>{activeKey}</h1>
        <iframe
          className={activeKey === 'home' ? '' : 'u-hide'}
          title="home"
          src="http://localhost:80"
          allow="fullscreen"
        />
        <iframe
          className={activeKey === 'logs' ? '' : 'u-hide'}
          title="logs"
          src="http://localhost:80/d/nl-C4rE7k/logs-dashboard?orgId=1"
          allow="fullscreen"
        />
        <iframe
          className={activeKey === 'traces' ? '' : 'u-hide'}
          title="traces"
          src="http://localhost:80/explore?orgId=1&left=%7B%22datasource%22:%22Jaeger%22,%22queries%22:%5B%7B%22refId%22:%22A%22%7D%5D,%22range%22:%7B%22from%22:%22now-1h%22,%22to%22:%22now%22%7D%7D"
          allow="fullscreen"
        />
      </main>
    </div>
  )
}

export default App
