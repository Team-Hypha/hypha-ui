import 'rsuite/dist/rsuite.min.css'
import './App.css'
import { Sidenav, Nav } from 'rsuite'
import { Dashboard } from '@rsuite/icons'
import { useState } from 'react'

function App() {
  const [activeKey, setActiveKey] = useState('home')
  const handleChangeKey = eventKey => {
    setActiveKey(eventKey)
  }

  return (
    <div>
      <div className="nav-wrapper">
        <Sidenav activeKey={activeKey}>
          <Sidenav.Body>
            <Nav>
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
      <main className='main'>
        <h1>{activeKey}</h1>
        <iframe src="http://localhost:80"></iframe>
      </main>
    </div>
  )
}

export default App
