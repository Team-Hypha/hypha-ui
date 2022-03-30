import { useEffect, useState } from 'react'

import { Sidenav, Nav } from 'rsuite'
import { Icon, Dashboard } from '@rsuite/icons'

import 'rsuite/dist/rsuite.min.css'
import './App.css'

import HyphaSVG from './assets/hypha-logo-color.svg'
import LokiSVG from './assets/loki-logo.svg'
import JaegerSVG from './assets/jaeger-logo.svg'
import GrafanaSVG from './assets/grafana-logo.svg'
import ExternalLinkThinSVG from './assets/external-link-thin.svg'

function LokiIcon() {
  return <Icon as={LokiSVG} />
}

function JaegerIcon() {
  return <Icon as={JaegerSVG} />
}

function GrafanaIcon() {
  return <Icon as={GrafanaSVG} />
}

function getParent(el, tagName) {
  if (el.tagName === tagName) {
    return el
  }

  while ((el = el.parentNode)) {
    if (el.tagName === 'TABLE') return null
    if (el.tagName === tagName) return el
  }

  return null
}

function App() {
  const [activeKey, setActiveKey] = useState('home')
  const handleChangeKey = eventKey => setActiveKey(eventKey)

  useEffect(() => {
    const iframes = document.querySelectorAll('iframe')
    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        const navbar = iframe.contentDocument.querySelector('#reactRoot .css-1k5or0q')
        navbar.style.display = 'none'
      })
    })

    const iframe = iframes[0]
    const intervalID = setInterval(() => {
      try {
        const logsTable = iframe.contentDocument.querySelector('[aria-label="Log Search panel"] table')
        logsTable.addEventListener('click', e => {
          e.preventDefault()
          const jaegerLink = getParent(e.target, 'A')
          if (jaegerLink) {
            const href = jaegerLink.getAttribute('href')
            iframes[2].src = href
            handleChangeKey('traces')
          }
        })
        clearInterval(intervalID)
      } catch (error) {
        // uncomment to debug
        // console.log('failed to find logs table')
        // console.error(error)
      }
    }, 5000)
  }, [])

  const openGrafana = () => {
    window.open('/', '_blank')
  }

  return (
    <div>
      <div className="nav-wrapper">
        <Sidenav>
          <HyphaSVG className="logo" />
          <Sidenav.Body>
            <Nav activeKey={activeKey}>
              <Nav.Item eventKey="home" icon={<Dashboard />} onSelect={handleChangeKey}>
                Home
              </Nav.Item>
              <Nav.Item eventKey="logs" icon={<LokiIcon />} onSelect={handleChangeKey}>
                Logs
              </Nav.Item>
              <Nav.Item eventKey="traces" icon={<JaegerIcon />} onSelect={handleChangeKey}>
                Traces
              </Nav.Item>
              <Nav.Item icon={<GrafanaIcon />} onSelect={openGrafana}>
                Open Grafana
                <ExternalLinkThinSVG className="external-link-icon"/>
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      <main className="main">
        <h1>{activeKey}</h1>
        <hr className='heading-seperator'/>
        {/* prettier-ignore */}
        <iframe
          className={activeKey === 'home' ? '' : 'u-hide'}
          title="home"
          src="/"
          allow="fullscreen"
        />
        <iframe
          className={activeKey === 'logs' ? '' : 'u-hide'}
          title="logs"
          src="/d/nl-C4rE7k/logs-dashboard?orgId=1"
          allow="fullscreen"
        />
        <iframe
          className={activeKey === 'traces' ? '' : 'u-hide'}
          title="traces"
          src="/explore?orgId=1&left=%7B%22datasource%22:%22Jaeger%22,%22queries%22:%5B%7B%22refId%22:%22A%22%7D%5D,%22range%22:%7B%22from%22:%22now-1h%22,%22to%22:%22now%22%7D%7D"
          allow="fullscreen"
        />
      </main>
    </div>
  )
}

export default App
